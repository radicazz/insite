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
  const hasServices = services.length > 0;
  const canNavigate = services.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = dragStartX !== null;
  const isPaused = isUserPaused || isHoverPaused || isDragging;

  useEffect(() => {
    if (!canNavigate || isPaused) {
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
  }, [canNavigate, isPaused, services.length]);

  const handlePrev = () => {
    if (!canNavigate) {
      return;
    }
    setActiveIndex((current) => (current - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    if (!canNavigate) {
      return;
    }
    setActiveIndex((current) => (current + 1) % services.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canNavigate) {
      return;
    }
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    setDragStartX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) {
      return;
    }
    setDragOffset(event.clientX - dragStartX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) {
      return;
    }
    const delta = event.clientX - dragStartX;
    const threshold = 70;

    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }

    setDragOffset(0);
    setDragStartX(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  if (!hasServices) {
    return (
      <div className={styles.carousel} role="status" aria-live="polite">
        <p className={styles.emptyState}>Services are being refreshed. Check back soon.</p>
      </div>
    );
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
      onFocusCapture={() => setIsHoverPaused(true)}
      onBlurCapture={() => setIsHoverPaused(false)}
    >
      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={`${styles.track} ${dragStartX !== null ? styles.trackDragging : ""}`}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
          aria-live={isPaused ? "polite" : "off"}
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
              disabled={!canNavigate}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className={styles.controls}>
          <button type="button" className={styles.control} onClick={handlePrev} disabled={!canNavigate}>
            Prev
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => setIsUserPaused((current) => !current)}
            aria-pressed={isUserPaused}
            disabled={!canNavigate}
          >
            {isUserPaused ? "Play" : "Pause"}
          </button>
          <button type="button" className={styles.control} onClick={handleNext} disabled={!canNavigate}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
