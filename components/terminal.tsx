"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const INTRO_TEXT =
  "Hi, I'm Tim — quant dev by day, PhD physicist and Arduino tinkerer always. Type `help` to see what this thing does.";

const TYPE_INTERVAL_MS = 15;

const HELP_TEXT = "Available commands: whoami, help";

const WHOAMI_TEXT =
  "Tim Grob — quant developer and researcher with a PhD from Oxford. By day: pricing risk and building trading systems. By night: wiring up Arduinos until something blinks the way it's supposed to.";

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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Keep the scrollable output pinned to the latest line, like a real terminal.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, typedIntro]);

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
    <div className="w-full max-w-xl overflow-hidden rounded-lg border border-border shadow-lg">
      {/* Window chrome: purely decorative, hidden from screen readers. */}
      <div
        aria-hidden="true"
        className="flex items-center gap-2 border-b border-border bg-terminal-chrome px-4 py-2"
      >
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-muted">tim@timgrob:~</span>
      </div>

      <div className="flex flex-col bg-terminal-bg p-4 text-sm">
        {/* Fixed-height, scrollable output — the widget never grows with more commands. */}
        <div ref={scrollRef} className="h-56 overflow-y-auto">
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-3 flex shrink-0 items-center gap-2 border-t border-border pt-3"
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
    </div>
  );
}
