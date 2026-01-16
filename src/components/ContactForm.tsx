"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const nameErrorId = "contact-name-error";
  const emailErrorId = "contact-email-error";
  const messageErrorId = "contact-message-error";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    const nextErrors: FieldErrors = {};
    if (!payload.name) {
      nextErrors.name = "Please enter your name.";
    }
    if (!payload.email) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(payload.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!payload.message) {
      nextErrors.message = "Please share a few project details.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Please review the highlighted fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Thanks! We will reach out within 1-2 business days.");
      setErrors({});
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to send right now. Please try again shortly.");
    }
  };

  const statusClass =
    status === "success"
      ? styles.statusSuccess
      : status === "error"
        ? styles.statusError
        : "";

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            className={styles.input}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            required
          />
          {errors.name ? (
            <span className={styles.error} id={nameErrorId}>
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            required
          />
          {errors.email ? (
            <span className={styles.error} id={emailErrorId}>
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Company (optional)</span>
        <input
          className={styles.input}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company or brand"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Project details</span>
        <textarea
          className={styles.textarea}
          id="contact-message"
          name="message"
          placeholder="Tell us about your goals, timeline, and scope."
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? messageErrorId : undefined}
          required
        />
        {errors.message ? (
          <span className={styles.error} id={messageErrorId}>
            {errors.message}
          </span>
        ) : null}
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        <span>Website</span>
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className={styles.footer}>
        <p className={styles.helper}>
          We typically respond within 1-2 business days.
        </p>
        <button className={styles.submit} type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
      </div>

      {message ? (
        <p className={`${styles.status} ${statusClass}`} aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
