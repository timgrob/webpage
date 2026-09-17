import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CodePage from "./page";
import { CODE_CONTENT } from "@/lib/code-content";

/** Scopes queries to the <article> rendering the entry for the given repo name. */
function withinEntry(name: string) {
  const article = screen.getByText(name).closest("article");
  expect(article).not.toBeNull();
  return within(article as HTMLElement);
}

describe("Code page", () => {
  it("renders all four GitHub side-projects as distinct entries", () => {
    render(<CodePage />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(CODE_CONTENT.entries.length);
    expect(CODE_CONTENT.entries.length).toBe(4);
  });

  it("renders each entry's name, description, and a link to its GitHub repo", () => {
    render(<CodePage />);
    for (const entry of CODE_CONTENT.entries) {
      const scoped = withinEntry(entry.name);
      expect(scoped.getByText(entry.description)).toBeInTheDocument();
      const repoLink = scoped.getByRole("link", { name: entry.name });
      expect(repoLink).toHaveAttribute("href", entry.href);
    }
  });

  it("links out to Tim's GitHub profile", () => {
    render(<CodePage />);
    const profileLink = screen.getByRole("link", { name: /github\.com\/timgrob/i });
    expect(profileLink).toHaveAttribute("href", CODE_CONTENT.profileHref);
  });

  it("never renders Tim's home address, phone number, or personal email", () => {
    const { container } = render(<CodePage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Haldenstrasse/i);
    expect(text).not.toMatch(/8055/);
    expect(text).not.toMatch(/\+41 79 703 6280/);
    expect(text).not.toMatch(/grob\.tim@gmail\.com/i);
  });
});
