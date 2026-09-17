import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";
import { PROJECTS_CONTENT } from "@/lib/projects-content";

/** Scopes queries to the <article> rendering the entry for the given project name. */
function withinEntry(name: string) {
  const article = screen.getByText(name).closest("article");
  expect(article).not.toBeNull();
  return within(article as HTMLElement);
}

describe("Projects page", () => {
  it("renders all four Arduino projects as distinct entries", () => {
    render(<ProjectsPage />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(PROJECTS_CONTENT.entries.length);
    expect(PROJECTS_CONTENT.entries.length).toBe(4);
  });

  it("renders each project's name, description, and a video link", () => {
    render(<ProjectsPage />);
    for (const entry of PROJECTS_CONTENT.entries) {
      const scoped = withinEntry(entry.name);
      expect(scoped.getByText(entry.description)).toBeInTheDocument();
      const videoLink = scoped.getByRole("link", { name: /watch on youtube/i });
      expect(videoLink).toHaveAttribute("href", entry.videoHref);
    }
  });

  it("never renders Tim's home address, phone number, or personal email", () => {
    const { container } = render(<ProjectsPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Haldenstrasse/i);
    expect(text).not.toMatch(/8055/);
    expect(text).not.toMatch(/\+41 79 703 6280/);
    expect(text).not.toMatch(/grob\.tim@gmail\.com/i);
  });
});
