import { SOCIAL_LINKS } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <ul className="mx-auto flex max-w-3xl gap-x-6 px-6 py-6 text-sm">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
