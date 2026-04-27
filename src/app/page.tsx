import { cookies } from "next/headers";
import ContactForm from "@/components/ContactForm";
import ServiceCarousel from "@/components/ServiceCarousel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";
import styles from "./page.module.css";

export default async function Home() {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <SiteHeader
          initialTheme={theme}
          navItems={[
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact", variant: "cta" },
          ]}
        />

        <main id="main-content" className={styles.main}>
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
                <a className={styles.ctaSecondary} href="#contact">
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

          <section id="testimonials" className={styles.testimonials}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Results</p>
              <h2 className={styles.sectionTitle}>
                Brands that grew with insites.
              </h2>
              <p className={styles.sectionLead}>
                Real outcomes from teams who trusted us to build, launch, and
                scale their digital presence.
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((t) => (
                <figure key={t.author} className={styles.testimonialCard}>
                  <blockquote className={styles.testimonialQuote}>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className={styles.testimonialMeta}>
                    <span className={styles.testimonialAuthor}>{t.author}</span>
                    <span className={styles.testimonialRole}>
                      {t.role}, {t.company}
                    </span>
                  </figcaption>
                </figure>
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
                <dl className={styles.contactList}>
                  <div>
                    <dt>Response time</dt>
                    <dd>1-2 business days</dd>
                  </div>
                  <div>
                    <dt>Discovery call</dt>
                    <dd>30 minutes, focused on goals + scope</dd>
                  </div>
                  <div>
                    <dt>Start window</dt>
                    <dd>Typically within 2-3 weeks</dd>
                  </div>
                  <div>
                    <dt>Direct email</dt>
                    <dd>
                      <a href="mailto:insitesglobal@gmail.com">
                        insitesglobal@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className={styles.contactNote}>
                  If you have a launch deadline, mention it in your message so
                  we can align on timing and milestones.
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
