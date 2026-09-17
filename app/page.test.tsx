import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";
import { HOME_CONTENT } from "@/lib/home-content";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Home page", () => {
  it("renders the headline identity", () => {
    render(<Home />);
    expect(screen.getByText(HOME_CONTENT.identity)).toBeInTheDocument();
  });

  it("renders an interests blurb mentioning running, tennis, and climbing", () => {
    render(<Home />);
    expect(screen.getByText(/running/i)).toBeInTheDocument();
    expect(screen.getByText(/tennis/i)).toBeInTheDocument();
    expect(screen.getByText(/climbing/i)).toBeInTheDocument();
  });

  it("does not mention crypto trading (already covered under Experience, not Interests)", () => {
    render(<Home />);
    expect(screen.queryByText(/crypto/i)).not.toBeInTheDocument();
  });

  it("never renders personal contact details", () => {
    render(<Home />);
    expect(
      screen.queryByText(/grob\.tim@gmail\.com/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/\+41/)).not.toBeInTheDocument();
  });

  it("renders the interactive terminal widget", () => {
    render(<Home />);
    expect(
      screen.getByRole("textbox", { name: /terminal command/i }),
    ).toBeInTheDocument();
  });

  it("renders the Skills list (moved here from the Experience page)", () => {
    render(<Home />);
    for (const skill of HOME_CONTENT.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
  });
});
