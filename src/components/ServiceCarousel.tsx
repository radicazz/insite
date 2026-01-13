"use client";

import { useEffect, useState } from "react";
import styles from "./ServiceCarousel.module.css";

type Service = {
  title: string;
  summary: string;
  features: string[];
};

type ServiceCarouselProps = {
  services: Service[];
};

const ROTATE_MS = 5200;

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (services.length <= 1 || isPaused) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [services.length, isPaused]);

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % services.length);
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live="polite"
        >
          {services.map((service) => (
            <article key={service.title} className={styles.slide}>
              <div className={styles.slideHeader}>
                <p className={styles.slideTitle}>{service.title}</p>
                <p className={styles.slideSummary}>{service.summary}</p>
              </div>
              <ul className={styles.featureList}>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.carouselFooter}>
        <div className={styles.progress}>
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              aria-label={`Show ${service.title}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className={styles.controls}>
          <button type="button" className={styles.control} onClick={handlePrev}>
            Prev
          </button>
          <button type="button" className={styles.control} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
