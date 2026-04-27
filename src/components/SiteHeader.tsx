import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import type { Theme } from "@/lib/theme";
import styles from "./SiteHeader.module.css";

type NavItem = {
  label: string;
  href: string;
  variant?: "cta";
};

type SiteHeaderProps = {
  navItems: NavItem[];
  initialTheme: Theme;
};

const isInternalLink = (href: string) =>
  href.startsWith("/") && !href.startsWith("//");

export default function SiteHeader({ navItems, initialTheme }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brandRow}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandName}>insites</span>
        </Link>
        <ThemeToggle initialTheme={initialTheme} />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const className =
            item.variant === "cta" ? styles.contactCta : styles.navLink;

          if (isInternalLink(item.href)) {
            return (
              <Link key={item.label} className={className} href={item.href}>
                {item.label}
              </Link>
            );
          }

          return (
            <a key={item.label} className={className} href={item.href}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
