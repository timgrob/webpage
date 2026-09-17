import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

async function fillAndSubmit({
  name = "Ada Lovelace",
  email = "ada@example.com",
  message = "Let's talk about opportunities.",
}: { name?: string; email?: string; message?: string } = {}) {
  const user = userEvent.setup();
  render(<ContactPage />);

  if (name) await user.type(screen.getByLabelText(/name/i), name);
  if (email) await user.type(screen.getByLabelText(/email/i), email);
  if (message) await user.type(screen.getByLabelText(/message/i), message);

  await user.click(screen.getByRole("button", { name: /send/i }));
}

describe("Contact page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true } as Response),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("renders a form with name, email, and message fields", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("sends the correct payload to the relay endpoint on valid submission", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "test-form-id");

    await fillAndSubmit({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Let's talk about opportunities.",
    });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "https://formspree.io/f/test-form-id",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          message: "Let's talk about opportunities.",
        }),
      }),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(/sent/i);
  });

  it("rejects an empty submission without making a network call", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "test-form-id");

    await fillAndSubmit({ name: "", email: "", message: "" });

    expect(fetch).not.toHaveBeenCalled();
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("rejects a submission with an invalid email without making a network call", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "test-form-id");

    await fillAndSubmit({
      name: "Ada Lovelace",
      email: "not-an-email",
      message: "Let's talk about opportunities.",
    });

    expect(fetch).not.toHaveBeenCalled();
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("fails gracefully without a network call when the relay isn't configured", async () => {
    await fillAndSubmit();

    expect(fetch).not.toHaveBeenCalled();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /isn't wired up/i,
    );
  });

  it("shows an error state without crashing when the relay responds with a failure status", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "test-form-id");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response),
    );

    await fillAndSubmit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /something went wrong/i,
    );
  });

  it("shows an error state without crashing when the network call itself rejects", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "test-form-id");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network down")));

    await fillAndSubmit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /something went wrong/i,
    );
  });

  it("never renders Tim's home address, phone number, or personal email", () => {
    const { container } = render(<ContactPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Haldenstrasse/i);
    expect(text).not.toMatch(/8055/);
    expect(text).not.toMatch(/\+41 79 703 6280/);
    expect(text).not.toMatch(/grob\.tim@gmail\.com/i);
  });
});
