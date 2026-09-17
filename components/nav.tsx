import Link from "next/link";
import { NAV_LINKS } from "@/lib/site-content";

export function Nav() {
  return (
    <nav aria-label="primary" className="border-b border-border">
      <ul className="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-2 px-6 py-4 text-sm">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-accent hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
