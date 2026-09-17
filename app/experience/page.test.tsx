import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "./page";
import { EXPERIENCE_CONTENT } from "@/lib/experience-content";

/** Scopes queries to the <article> rendering the entry for the given company. */
function withinEntry(company: string) {
  const article = screen.getByText(company).closest("article");
  expect(article).not.toBeNull();
  return within(article as HTMLElement);
}

describe("Experience page", () => {
  it("renders each career history entry with company, role, dates, and achievements", () => {
    render(<ExperiencePage />);
    for (const entry of EXPERIENCE_CONTENT.entries) {
      const scoped = withinEntry(entry.company);
      expect(scoped.getByText(entry.role)).toBeInTheDocument();
      expect(scoped.getByText(entry.period)).toBeInTheDocument();
      for (const achievement of entry.achievements) {
        expect(scoped.getByText(achievement)).toBeInTheDocument();
      }
    }
  });

  it("renders the professional summary", () => {
    render(<ExperiencePage />);
    expect(screen.getByText(EXPERIENCE_CONTENT.summary)).toBeInTheDocument();
  });

  it("renders a CV download link pointing at the redacted public PDF", () => {
    render(<ExperiencePage />);
    const downloadLink = screen.getByRole("link", { name: /download.*cv/i });
    expect(downloadLink).toHaveAttribute("href", "/tim-grob-cv.pdf");
  });

  it("never renders Tim's home address, phone number, or personal email", () => {
    const { container } = render(<ExperiencePage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Haldenstrasse/i);
    expect(text).not.toMatch(/8055/);
    expect(text).not.toMatch(/\+41 79 703 6280/);
    expect(text).not.toMatch(/grob\.tim@gmail\.com/i);
  });
});
