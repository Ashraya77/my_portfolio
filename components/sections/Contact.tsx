"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PillLabel } from "@/components/PillLabel";
import { SocialIconButtons, type SocialLinks } from "@/components/SocialIconButtons";

export type ContactProps = {
  description?: string;
  email?: string;
  headline?: string;
  name?: string;
  socialLinks?: SocialLinks;
};

type SubmissionState = "idle" | "submitting" | "success";

function getErrorMessage(payload: unknown) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return "Something went wrong. Please try again or email me directly.";
}

const labelClass =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-fg-muted transition-transform duration-300 group-focus-within:-translate-y-0.5";
const fieldClass =
  "w-full border border-border bg-transparent px-4 py-3 text-base text-fg outline-none transition-colors duration-300 placeholder:text-fg-muted focus:border-fg";

export function Contact({
  description = "Have a project in mind or just want to say hi? My inbox is always open.",
  email = "aashray851@gmail.com",
  headline = "Let's build something together.",
  name = "Ashraya",
  socialLinks,
}: ContactProps) {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(getErrorMessage(result));
      }

      setStatus("success");
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again or email me directly.",
      );
    }
  }

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-bg px-6 pt-28 pb-8 text-fg sm:px-10 sm:pt-36 lg:px-12 lg:pt-44"
      id="contact"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Left: headline + contact info */}
        <div className="text-center">
          <PillLabel>Contact Me</PillLabel>
          <h2 className="font-display mt-8 max-w-[10ch] text-[clamp(3.25rem,7vw,7rem)] font-black italic leading-[0.84] tracking-[-0.05em] text-fg">
            {headline}
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">
            {description}
          </p>

          <div className="mt-10 flex flex-col items-center gap-6">
            <a
              className="text-sm font-medium text-fg transition-colors hover:text-fg-muted"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <SocialIconButtons links={socialLinks} />
          </div>
        </div>

        {/* Right: bordered form card */}
        <Reveal className="border border-border p-6 sm:p-10" delay={0.1}>
          {status === "success" ? (
            <div className="py-12 text-center sm:py-16" role="status">
              <p className="font-display text-4xl font-black italic leading-none tracking-[-0.05em] sm:text-5xl">
                Thanks for reaching out.
              </p>
              <p className="mt-5 text-sm text-fg-muted">
                I&apos;ll get back to you as soon as I can.
              </p>
            </div>
          ) : (
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
              </div>

              <div className="group grid gap-2">
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  autoComplete="name"
                  className={fieldClass}
                  id="name"
                  maxLength={120}
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
                />
              </div>

              <div className="group grid gap-2">
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="email"
                  className={fieldClass}
                  id="email"
                  maxLength={254}
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>

              <div className="group grid gap-2">
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  className={`${fieldClass} min-h-36 resize-y`}
                  data-lenis-prevent
                  id="message"
                  maxLength={2000}
                  name="message"
                  placeholder="Tell me a little about your project."
                  required
                  rows={5}
                />
              </div>

              {error ? (
                <p className="text-sm leading-relaxed text-fg-muted" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                className="w-full bg-fg px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-bg transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
                disabled={status === "submitting"}
                type="submit"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-20 max-w-6xl border-t border-border pt-6 text-center text-xs text-fg-muted sm:mt-28">
        {"\u00A9"} 2026 {name}. All rights reserved.
      </Reveal>
    </section>
  );
}