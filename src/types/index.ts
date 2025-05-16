// # Custom types (e.g., HourEntry, UserSettings)
export type HourEntry = {
  id: string;
  user_id: string;
  date: string; // ISO date string (e.g., "2025-05-17")
  hours_worked: number;
  created_at: string; // ISO timestamp (e.g., "2025-05-17T00:29:00.000Z")
};

export type UserSettings = {
  user_id: string;
  hourly_rate: number;
  overtime_rate: number;
  standard_hours: number;
};

export type Badge = {
  id: string;
  user_id: string;
  name: string; // e.g., "Week Streak"
  awarded_at: string; // ISO timestamp
};

export type AuthUser = {
  id: string;
  email: string;
};