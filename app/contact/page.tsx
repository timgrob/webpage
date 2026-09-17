"use client";

import { useState, type FormEvent } from "react";
import {
  ContactRelayNotConfiguredError,
  submitContactForm,
  type ContactPayload,
} from "@/lib/contact-relay";

type Status = "idle" | "submitting" | "invalid" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates an already-trimmed payload. */
function validate({ name, email, message }: ContactPayload): string | null {
  if (!name || !email || !message) {
    return "Name, email, and message are all required.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  return null;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ContactPayload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    const validationError = validate(payload);
    if (validationError) {
      setStatus("invalid");
      setFeedback(validationError);
      return;
    }

    setStatus("submitting");
    setFeedback(null);

    try {
      await submitContactForm(payload);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof ContactRelayNotConfiguredError
          ? "The contact form isn't wired up yet — please check back soon."
          : "Something went wrong sending your message. Please try again later.",
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat contact.md</p>

      <p className="mt-4 max-w-xl text-muted">
        Have a question or an opportunity to discuss? Send a message below —
        it&apos;s relayed privately, and no email address is published on this
        site.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 flex max-w-md flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-muted">
            name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-muted">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-muted">
            message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start rounded border border-accent px-4 py-2 text-sm text-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "sending..." : "send message"}
        </button>

        {(status === "invalid" || status === "error") && (
          <p role="alert" className="text-sm text-error">
            {feedback}
          </p>
        )}
        {status === "success" && (
          <p role="status" className="text-sm text-accent">
            Message sent — thanks, I&apos;ll get back to you soon.
          </p>
        )}
      </form>
    </main>
  );
}
