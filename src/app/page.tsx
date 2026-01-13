import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

const services = [
  {
    title: "Websites",
    summary:
      "Design-forward, conversion-ready sites built to perform fast and scale with your business.",
    features: ["Brand strategy + UX", "Custom design systems", "SEO + analytics ready"],
  },
  {
    title: "Social Media Packages",
    summary:
      "Content, cadence, and campaign support built to keep your audience engaged and growing.",
    features: ["Campaign planning", "Creative direction", "Performance reporting"],
  },
  {
    title: "AI Training",
    summary:
      "Practical enablement that helps teams use AI with confidence, efficiency, and clarity.",
    features: ["Team workshops", "Workflow playbooks", "Toolchain setup"],
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span className={styles.brandName}>insites</span>
          </div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className={styles.headerCta} href="#services">
            Start a project
          </a>
        </header>

        <main className={styles.main}>
          <section className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>Insites Studio</p>
              <h1 className={styles.heroTitle}>
                Modern websites and growth systems for ambitious brands.
              </h1>
              <p className={styles.lead}>
                We craft high-performance digital experiences, social campaigns,
                and AI training programs that turn momentum into measurable
                growth.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.ctaPrimary} href="#services">
                  Explore services
                </a>
                <a
                  className={styles.ctaSecondary}
                  href="mailto:hello@insites.studio"
                >
                  Book a discovery call
                </a>
              </div>
              <div className={styles.heroMeta}>
                <span>Strategy + design</span>
                <span>Engineering-led delivery</span>
                <span>Launch-ready in weeks</span>
              </div>
            </div>

            <div className={styles.heroCard}>
              <p className={styles.cardTitle}>What you get</p>
              <ul className={styles.cardList}>
                <li>Elegant, conversion-focused UI/UX</li>
                <li>Performance-first builds with SEO baked in</li>
                <li>Content systems built for iteration</li>
                <li>Clear reporting and ongoing optimization</li>
              </ul>
              <div className={styles.cardNote}>
                From discovery to launch, insites keeps your team aligned with
                weekly checkpoints and transparent delivery.
              </div>
            </div>
          </section>

          <section id="services" className={styles.services}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Services</p>
              <h2 className={styles.sectionTitle}>
                Everything you need to launch and grow with confidence.
              </h2>
              <p className={styles.sectionLead}>
                Choose a focused engagement or pair multiple services for a
                fully integrated growth system. We tailor every engagement to
                your market, audience, and momentum.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <article key={service.title} className={styles.serviceCard}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceSummary}>{service.summary}</p>
                  <ul className={styles.serviceList}>
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className={styles.contact}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Contact</p>
              <h2 className={styles.sectionTitle}>
                Tell us about the next chapter for your brand.
              </h2>
              <p className={styles.sectionLead}>
                Share your goals and timeline. We will reply with a tailored
                plan and recommended next steps.
              </p>
            </div>

            <div className={styles.contactGrid}>
              <ContactForm />
              <div className={styles.contactCard}>
                <p className={styles.contactCardTitle}>What happens next</p>
                <div className={styles.contactList}>
                  <div>
                    <span>Response time</span>
                    1-2 business days
                  </div>
                  <div>
                    <span>Discovery call</span>
                    30 minutes, focused on goals + scope
                  </div>
                  <div>
                    <span>Start window</span>
                    Typically within 2-3 weeks
                  </div>
                  <div>
                    <span>Direct email</span>
                    hello@insites.studio
                  </div>
                </div>
                <div className={styles.contactNote}>
                  If you have a launch deadline, mention it in your message so
                  we can align on timing and milestones.
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
