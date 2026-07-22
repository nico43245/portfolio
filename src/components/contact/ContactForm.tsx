"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Formular de contact prin Web3Forms (spec §5.4) — fără backend propriu.
 * Anti-spam: honeypot ascuns; dacă e completat, cererea nu pleacă.
 *
 * Stil „editorial ivoriu": câmpuri doar cu border-bottom (hairline care se
 * face bronz la focus), butonul de submit e singurul element plin din
 * pagină. Erorile în accent-strong (6.39:1 pe bg — AA).
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const configured = SITE.web3formsKey.length > 0;

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = t("errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("errors.email");
    if (message.length < 10) next.message = t("errors.message");
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: completat = bot. Ne prefacem că a mers, fără să trimitem.
    if (String(data.get("company") ?? "").length > 0) {
      setStatus("success");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    data.append("access_key", SITE.web3formsKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!configured) {
    return (
      <p className="rounded-card border border-accent/40 bg-surface p-6 text-sm text-text-muted">
        {t("notConfigured")}{" "}
        <code className="font-mono text-accent">NEXT_PUBLIC_WEB3FORMS_KEY</code>
      </p>
    );
  }

  const fieldClass =
    "w-full border-b border-border bg-transparent px-0 py-3 text-base text-text placeholder:text-text-muted/60 transition-colors duration-300 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Honeypot — ascuns vizual și pentru cititoarele de ecran. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="u-eyebrow">
          {t("fields.name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-xs text-accent-strong">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="u-eyebrow">
          {t("fields.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-xs text-accent-strong">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="u-eyebrow">
          {t("fields.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-y ${fieldClass}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-accent-strong">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center rounded-btn bg-accent px-7 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent-strong active:scale-[0.98] disabled:opacity-50"
      >
        {status === "submitting" ? t("sending") : t("send")}
      </button>

      {/* Stările de rezultat sunt anunțate asistiv, nu doar vizual. */}
      <p role="status" aria-live="polite" className="text-sm">
        {status === "success" && (
          <span className="text-text">{t("success")}</span>
        )}
        {status === "error" && (
          <span className="text-accent-strong">{t("error")}</span>
        )}
      </p>
    </form>
  );
}
