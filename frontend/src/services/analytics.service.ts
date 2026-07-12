import { apiFetch } from '@/lib/api';
import type { DashboardOverview } from '@/types/analytics';

export const analyticsApi = {
  overview: () => apiFetch<DashboardOverview>('/analytics/overview'),
};
