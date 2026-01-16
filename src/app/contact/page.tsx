import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact — insites",
  description:
    "Get in touch with insites about websites, social media packages, or AI training. Share your goals and timeline to start a tailored plan.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — insites",
    description:
      "Get in touch with insites about websites, social media packages, or AI training. Share your goals and timeline to start a tailored plan.",
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact — insites",
    description:
      "Get in touch with insites about websites, social media packages, or AI training. Share your goals and timeline to start a tailored plan.",
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span className={styles.brandName}>insites</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <a href="mailto:insitesglobal@gmail.com">Email</a>
          </nav>
        </header>

        <main className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.title}>Let’s build your next digital move.</h1>
            <p className={styles.lead}>
              Tell us about your project, timeline, and goals. We’ll reply with
              a tailored plan, project scope, and next steps.
            </p>
            <ContactForm />
          </div>
          <aside className={styles.sideCard}>
            <p className={styles.sideTitle}>Details</p>
            <div className={styles.detailList}>
              <div>
                <span>Email</span>
                insitesglobal@gmail.com
              </div>
              <div>
                <span>Response time</span>
                1-2 business days
              </div>
              <div>
                <span>Discovery call</span>
                30 minutes, strategy-focused
              </div>
              <div>
                <span>Project kickoff</span>
                Typically within 2-3 weeks
              </div>
            </div>
            <div className={styles.note}>
              Share any constraints or launch deadlines so we can map the right
              scope and timeline.
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
