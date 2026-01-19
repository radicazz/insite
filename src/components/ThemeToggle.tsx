"use client";

import { useState } from "react";
import styles from "./ThemeToggle.module.css";
import {
  DEFAULT_THEME,
  THEME_COOKIE,
  THEME_COOKIE_MAX_AGE,
  type Theme,
} from "@/lib/theme";

type ThemeToggleProps = {
  initialTheme?: Theme;
};

export default function ThemeToggle({
  initialTheme = DEFAULT_THEME,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  const handleToggle = () => {
    setTheme((current) => {
      const updated = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = updated;
      document.cookie = `${THEME_COOKIE}=${updated}; max-age=${THEME_COOKIE_MAX_AGE}; path=/; samesite=lax`;
      return updated;
    });
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-pressed={theme === "dark"}
      aria-label={`Activate ${nextTheme} mode`}
    >
      <span className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}
