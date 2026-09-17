import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";
import { SOCIAL_LINKS } from "@/lib/site-content";

describe("Footer", () => {
  it("links to linkedin, github, and youtube", () => {
    render(<Footer />);
    for (const link of SOCIAL_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("does not link to facebook", () => {
    render(<Footer />);
    expect(screen.queryByText(/facebook/i)).not.toBeInTheDocument();
  });
});
