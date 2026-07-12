import { prisma } from '../../config/prisma';

export interface DashboardKpis {
  activeMachines: number;
  totalMachines: number;
  avgMachineHealth: number;
  openIncidents: number;
  totalIncidents: number;
  shiftLogsToday: number;
  capaCompletionRate: number;
}

export interface IncidentTrendPoint {
  date: string;
  count: number;
}

function getRecentShiftLogs() {
  return prisma.shiftLog.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      code: true,
      shiftType: true,
      shiftDate: true,
      status: true,
      createdAt: true,
      author: { select: { firstName: true, lastName: true } },
      plant: { select: { name: true } },
    },
  });
}

function getRecentIncidents() {
  return prisma.incident.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      code: true,
      title: true,
      severity: true,
      status: true,
      createdAt: true,
      reporter: { select: { firstName: true, lastName: true } },
    },
  });
}

export interface DashboardOverview {
  kpis: DashboardKpis;
  incidentTrend: IncidentTrendPoint[];
  recentShiftLogs: Awaited<ReturnType<typeof getRecentShiftLogs>>;
  recentIncidents: Awaited<ReturnType<typeof getRecentIncidents>>;
}

export const analyticsService = {
  /**
   * Aggregate everything the executive dashboard needs in one round trip.
   * Every query is written to return a sane zero value on an empty database
   * rather than throwing, so a freshly-seeded plant renders a real (if quiet)
   * dashboard instead of an error.
   */
  async getOverview(): Promise<DashboardOverview> {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const [
      activeMachines,
      totalMachines,
      machineHealth,
      openIncidents,
      totalIncidents,
      shiftLogsToday,
      capaTotal,
      capaDone,
      recentShiftLogs,
      recentIncidents,
      incidentsLast7,
    ] = await Promise.all([
      prisma.machine.count({ where: { status: 'RUNNING' } }),
      prisma.machine.count(),
      prisma.machine.aggregate({ _avg: { healthScore: true } }),
      prisma.incident.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED'] } } }),
      prisma.incident.count(),
      prisma.shiftLog.count({ where: { shiftDate: { gte: startOfToday } } }),
      prisma.capa.count(),
      prisma.capa.count({ where: { status: { in: ['COMPLETED', 'VERIFIED'] } } }),
      getRecentShiftLogs(),
      getRecentIncidents(),
      prisma.incident.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true },
      }),
    ]);

    const incidentTrend: IncidentTrendPoint[] = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(startOfToday);
      day.setDate(day.getDate() - i);
      const dayKey = day.toISOString().slice(0, 10);
      const count = incidentsLast7.filter(
        (inc) => inc.createdAt.toISOString().slice(0, 10) === dayKey
      ).length;
      incidentTrend.push({ date: dayKey, count });
    }

    return {
      kpis: {
        activeMachines,
        totalMachines,
        avgMachineHealth: Math.round(machineHealth._avg.healthScore ?? 0),
        openIncidents,
        totalIncidents,
        shiftLogsToday,
        capaCompletionRate: capaTotal === 0 ? 0 : Math.round((capaDone / capaTotal) * 100),
      },
      incidentTrend,
      recentShiftLogs,
      recentIncidents,
    };
  },
};
