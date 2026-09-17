import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "./nav";
import { NAV_LINKS } from "@/lib/site-content";

describe("Nav", () => {
  it("links to every section", () => {
    render(<Nav />);
    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });
});
