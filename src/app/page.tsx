import ContactForm from "@/components/ContactForm";
import ServiceCarousel from "@/components/ServiceCarousel";
import SiteHeader from "@/components/SiteHeader";
import { services } from "@/data/services";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <SiteHeader
          navItems={[
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact", variant: "cta" },
          ]}
        />

        <main className={styles.main}>
          <section className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>Insites Global</p>
              <h1 className={styles.heroTitle}>
                Your success is insight.
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
                  href="mailto:insitesglobal@gmail.com"
                >
                  Book a call
                </a>
              </div>
            </div>

            <ServiceCarousel services={services} />
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
                    insitesglobal@gmail.com
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
