import Link from "next/link";
import { cookies } from "next/headers";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./SiteHeader.module.css";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";

type NavItem = {
  label: string;
  href: string;
  variant?: "cta";
};

type SiteHeaderProps = {
  navItems: NavItem[];
};

const isInternalLink = (href: string) =>
  href.startsWith("/") && !href.startsWith("//");

export default async function SiteHeader({ navItems }: SiteHeaderProps) {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <header className={styles.header}>
      <div className={styles.brandRow}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandName}>insites</span>
        </Link>
        <ThemeToggle initialTheme={theme} />
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
