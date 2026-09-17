import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResearchPage from "./page";
import { RESEARCH_CONTENT } from "@/lib/research-content";

describe("Research page", () => {
  it("renders the PhD research topic description", () => {
    render(<ResearchPage />);
    expect(screen.getByText(RESEARCH_CONTENT.description)).toBeInTheDocument();
    expect(screen.getByText(RESEARCH_CONTENT.approach)).toBeInTheDocument();
    expect(screen.getByText(RESEARCH_CONTENT.outcome)).toBeInTheDocument();
  });

  it("links the thesis to Oxford's Research Archive, appearing before Publications", () => {
    render(<ResearchPage />);
    const thesisLink = screen.getByRole("link", {
      name: RESEARCH_CONTENT.thesis.title,
    });
    expect(thesisLink).toHaveAttribute("href", RESEARCH_CONTENT.thesis.href);

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings.indexOf("Thesis")).toBeLessThan(headings.indexOf("Publications"));
  });

  it("links all three papers by DOI", () => {
    render(<ResearchPage />);
    for (const paper of RESEARCH_CONTENT.papers) {
      const link = screen.getByRole("link", { name: paper.title });
      expect(link).toHaveAttribute("href", paper.doi);
    }
  });

  it("renders each paper's journal and year on their own line, matching the Thesis style", () => {
    render(<ResearchPage />);
    for (const paper of RESEARCH_CONTENT.papers) {
      expect(
        screen.getByText(`${paper.journal}, ${paper.year}`),
      ).toBeInTheDocument();
    }
  });

  it("never renders Tim's home address, phone number, or personal email", () => {
    const { container } = render(<ResearchPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Haldenstrasse/i);
    expect(text).not.toMatch(/8055/);
    expect(text).not.toMatch(/\+41 79 703 6280/);
    expect(text).not.toMatch(/grob\.tim@gmail\.com/i);
  });
});
