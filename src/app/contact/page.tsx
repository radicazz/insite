import { cookies } from "next/headers";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "insites logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — insites",
    description:
      "Get in touch with insites about websites, social media packages, or AI training. Share your goals and timeline to start a tailored plan.",
    images: ["/opengraph-image"],
  },
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <SiteHeader
          initialTheme={theme}
          navItems={[
            { label: "Home", href: "/" },
            { label: "Email", href: "mailto:insitesglobal@gmail.com" },
          ]}
        />

        <main id="main-content" className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.title}>Let's build your next digital move.</h1>
            <p className={styles.lead}>
              Tell us about your project, timeline, and goals. We'll reply with
              a tailored plan, project scope, and next steps.
            </p>
            <ContactForm />
          </div>
          <aside className={styles.sideCard}>
            <p className={styles.sideTitle}>Details</p>
            <dl className={styles.detailList}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:insitesglobal@gmail.com">
                    insitesglobal@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>Response time</dt>
                <dd>1-2 business days</dd>
              </div>
              <div>
                <dt>Discovery call</dt>
                <dd>30 minutes, strategy-focused</dd>
              </div>
              <div>
                <dt>Project kickoff</dt>
                <dd>Typically within 2-3 weeks</dd>
              </div>
            </dl>
            <div className={styles.note}>
              Share any constraints or launch deadlines so we can map the right
              scope and timeline.
            </div>
          </aside>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
