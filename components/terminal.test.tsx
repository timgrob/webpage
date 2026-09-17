import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Terminal } from "./terminal";

async function runCommand(command: string) {
  const user = userEvent.setup();
  render(<Terminal />);

  const input = screen.getByRole("textbox", { name: /terminal command/i });
  await user.type(input, `${command}{enter}`);

  return { user, input };
}

describe("Terminal", () => {
  it("responds to whoami with a fun identity blurb", async () => {
    await runCommand("whoami");
    expect(
      screen.getByText(/quant developer and researcher/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/PhD from Oxford/i)).toBeInTheDocument();
  });

  it("responds to help by listing the available commands", async () => {
    await runCommand("help");
    expect(screen.getByText(/whoami/i)).toBeInTheDocument();
    expect(screen.getByText("Available commands: whoami, help")).toBeInTheDocument();
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
});
