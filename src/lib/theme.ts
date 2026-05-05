export type Theme = "light" | "dark";

export const THEME_COOKIE = "insites-theme";
export const DEFAULT_THEME: Theme = "dark";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const parseTheme = (value?: string | null): Theme =>
  value === "light" ? "light" : "dark";
