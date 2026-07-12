import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarClock,
  AlertTriangle,
  Repeat,
  LineChart,
  UserCog,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  badge?: string;
}

/**
 * Modules 2-6 route to real pages once built in later milestones. Until then
 * they're visible (so the product story is clear) but disabled with a "Soon"
 * badge rather than linking to a route that doesn't exist yet.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Shift Logbook', href: '/shift-logbook', icon: ClipboardList },
  { label: 'Events', href: '/events', icon: CalendarClock, disabled: true, badge: 'Soon' },
  { label: 'Incidents', href: '/incidents', icon: AlertTriangle, disabled: true, badge: 'Soon' },
  { label: 'Handover', href: '/handover', icon: Repeat, disabled: true, badge: 'Soon' },
  { label: 'Analytics', href: '/analytics', icon: LineChart, disabled: true, badge: 'Soon' },
];

export const ADMIN_NAV_ITEM: NavItem = {
  label: 'Admin',
  href: '/admin',
  icon: UserCog,
  disabled: true,
  badge: 'Soon',
};
