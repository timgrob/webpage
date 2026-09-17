/**
 * Contact form relay integration.
 *
 * Provider: Formspree (https://formspree.io). Chosen because it needs no
 * backend code or server runtime of our own — the client POSTs the form
 * directly to Formspree, which relays it to Tim's inbox. That's a reasonable
 * fit for a low-traffic personal site; the destination inbox is configured
 * at Formspree, server-side, so no personal email address ever needs to
 * appear in this repo or the client bundle.
 *
 * ---
 * MANUAL SETUP REQUIRED BEFORE THIS GOES LIVE (Tim, not an agent, must do this):
 *   1. Create a Formspree account at https://formspree.io (or sign in).
 *   2. Create a new form there and set its destination inbox to your real,
 *      private email address — entered directly in the Formspree dashboard,
 *      never in this codebase.
 *   3. Formspree gives you an endpoint shaped like
 *      `https://formspree.io/f/xxxxAAAA` — copy the id segment after `/f/`.
 *   4. Set the environment variable `NEXT_PUBLIC_FORMSPREE_FORM_ID` to that id
 *      wherever this app is built/deployed (Vercel project settings for
 *      production, plus a local `.env.local` — which is gitignored — for
 *      local development). Do not commit a real value anywhere in this repo.
 *
 * Until that env var is set, `isContactRelayConfigured()` reports false and
 * `submitContactForm` throws `ContactRelayNotConfiguredError` instead of
 * silently pretending a working integration exists.
 */

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export class ContactRelayNotConfiguredError extends Error {
  constructor() {
    super(
      "Contact relay is not configured (missing NEXT_PUBLIC_FORMSPREE_FORM_ID).",
    );
    this.name = "ContactRelayNotConfiguredError";
  }
}

function getRelayEndpoint(): string | null {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  return formId ? `https://formspree.io/f/${formId}` : null;
}

export function isContactRelayConfigured(): boolean {
  return getRelayEndpoint() !== null;
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const endpoint = getRelayEndpoint();
  if (!endpoint) {
    throw new ContactRelayNotConfiguredError();
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact relay responded with status ${response.status}`);
  }
}
