import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { Terminal } from "./terminal";
import { push } from "@/test/mocks/next-navigation";

beforeEach(() => {
  push.mockClear();
});

async function runCommand(command: string) {
  const user = userEvent.setup();
  render(<Terminal />);

  const input = screen.getByRole("textbox", { name: /terminal command/i });
  await user.type(input, `${command}{enter}`);

  return { user, input };
}

describe("Terminal", () => {
  it("responds to whoami with a witty identity blurb", async () => {
    await runCommand("whoami");
    expect(screen.getByText(/Tim Grob/)).toBeInTheDocument();
    expect(screen.getByText(/PhD, Oxford/)).toBeInTheDocument();
  });

  it("responds to help by listing the available commands, including navigation", async () => {
    await runCommand("help");
    expect(
      screen.getByText("Available commands: whoami, help, ls, cd <section>"),
    ).toBeInTheDocument();
  });

  it("responds to ls by listing the navigable sections", async () => {
    await runCommand("ls");
    expect(
      screen.getByText("experience research projects code contact"),
    ).toBeInTheDocument();
  });

  it("navigates when cd is given a valid section", async () => {
    await runCommand("cd research");
    expect(push).toHaveBeenCalledWith("/research");
    expect(screen.getByText("→ research")).toBeInTheDocument();
  });

  it("cd with no argument goes home", async () => {
    await runCommand("cd");
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows an error for cd to an unknown section, without navigating", async () => {
    await runCommand("cd nowhere");
    expect(screen.getByText(/no such section: nowhere/i)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("shows a command-not-found message for an unrecognized command, without crashing", async () => {
    const { input } = await runCommand("sudo rm -rf /");
    expect(screen.getByText(/command not found/i)).toBeInTheDocument();
    // The widget is still alive and usable after an unknown command.
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("clears the input field after submitting a command", async () => {
    const { input } = await runCommand("whoami");
    expect(input).toHaveValue("");
  });

  it("keeps a fixed-height, scrollable output area regardless of how many commands are run", async () => {
    const user = userEvent.setup();
    render(<Terminal />);
    const input = screen.getByRole("textbox", { name: /terminal command/i });
    const scrollArea = screen.getByRole("list").parentElement;

    expect(scrollArea?.className).toMatch(/\bh-56\b/);
    expect(scrollArea?.className).toMatch(/overflow-y-auto/);

    for (const command of ["whoami", "help", "whoami", "help", "whoami"]) {
      await user.type(input, `${command}{enter}`);
    }

    // Same element, same fixed-height class — the widget doesn't grow with history.
    expect(screen.getByRole("list").parentElement).toBe(scrollArea);
    expect(scrollArea?.className).toMatch(/\bh-56\b/);
  });
});
