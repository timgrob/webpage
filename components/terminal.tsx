"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const INTRO_TEXT =
  "Hi, I'm Tim — quant dev by day, PhD physicist and Arduino tinkerer always. Type `help` to see what this thing does.";

const TYPE_INTERVAL_MS = 15;

const HELP_TEXT = "Available commands: whoami, help";

const WHOAMI_TEXT =
  "Tim Grob — quant developer and researcher with an Oxford PhD in physics. By day: pricing risk and building trading systems. By night: wiring up Arduinos until something blinks the way it's supposed to.";

type HistoryEntry = {
  id: number;
  command: string;
  response: string;
};

/** Runs a terminal command and returns its response text. Unknown commands get a "not found" reply rather than throwing. */
function runCommand(rawInput: string): string {
  const command = rawInput.trim().toLowerCase();

  if (command === "whoami") {
    return WHOAMI_TEXT;
  }
  if (command === "help") {
    return HELP_TEXT;
  }
  return `command not found: ${rawInput}`;
}

export function Terminal() {
  const [typedIntro, setTypedIntro] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedIntro(INTRO_TEXT.slice(0, index));
      if (index >= INTRO_TEXT.length) {
        window.clearInterval(intervalId);
      }
    }, TYPE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input.trim();
    if (!command) return;

    const entry: HistoryEntry = {
      id: nextId.current++,
      command,
      response: runCommand(command),
    };
    setHistory((previous) => [...previous, entry]);
    setInput("");
  }

  return (
    <div className="max-w-xl rounded border border-border p-4 text-sm">
      {/* The animated reveal is purely decorative; screen readers get the full text immediately below. */}
      <p aria-hidden="true" className="min-h-[1.5em] text-accent">
        {typedIntro}
        <span aria-hidden="true" className="animate-pulse">
          _
        </span>
      </p>
      <p className="sr-only">{INTRO_TEXT}</p>

      <ul
        aria-live="polite"
        className={history.length > 0 ? "mt-4 flex flex-col gap-3" : undefined}
      >
        {history.map((entry) => (
          <li key={entry.id}>
            <p className="text-accent">$ {entry.command}</p>
            <p className="whitespace-pre-wrap text-muted">{entry.response}</p>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center gap-2 border-t border-border pt-4"
      >
        <label htmlFor="terminal-command" className="text-accent">
          $
        </label>
        <input
          id="terminal-command"
          name="terminal-command"
          type="text"
          autoComplete="off"
          spellCheck={false}
          aria-label="terminal command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 border-b border-transparent bg-transparent text-foreground focus:border-accent focus:outline-none"
        />
      </form>
    </div>
  );
}
