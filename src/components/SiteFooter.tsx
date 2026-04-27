import Link from "next/link";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>
          insites
        </Link>
        <p className={styles.copy}>
          &copy; {year} Insites Global. All rights reserved.
        </p>
      </div>

      <nav className={styles.nav} aria-label="Footer navigation">
        <Link href="/#services" className={styles.link}>
          Services
        </Link>
        <Link href="/#testimonials" className={styles.link}>
          Results
        </Link>
        <Link href="/#contact" className={styles.link}>
          Contact
        </Link>
        <a
          href="mailto:insitesglobal@gmail.com"
          className={styles.emailLink}
        >
          insitesglobal@gmail.com
        </a>
      </nav>
    </footer>
  );
}
