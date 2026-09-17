"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { HOME_HREF, NAV_LINKS } from "@/lib/site-content";

const INTRO_TEXT =
  "Hi, I'm Tim — quant dev by day, engineer and tinkerer always. Type `help` to see what this thing does.";

const TYPE_INTERVAL_MS = 15;

const HELP_TEXT = "Available commands: whoami, help, ls, cd <section>";

const WHOAMI_TEXT =
  "Tim Grob — proof that a mechanical engineer can be talked into building trading systems. PhD, Oxford; day job: pricing risk; night job: convincing an Arduino to blink on command. Occasionally outruns his own code at 800m pace.";

// Sections reachable via `cd`, in the order `ls` lists them. Excludes "home" itself, same as `ls` on a real filesystem not listing the current directory.
const SECTIONS = NAV_LINKS.filter((link) => link.href !== HOME_HREF);

type HistoryEntry = {
  id: number;
  command: string;
  response: string;
};

type CommandResult = {
  response: string;
  navigateTo?: string;
};

/** Runs a terminal command and returns its response, plus an optional route to navigate to. Unknown commands get a "not found" reply rather than throwing. */
function runCommand(rawInput: string): CommandResult {
  const trimmed = rawInput.trim();
  const command = trimmed.toLowerCase();

  if (command === "whoami") {
    return { response: WHOAMI_TEXT };
  }
  if (command === "help") {
    return { response: HELP_TEXT };
  }
  if (command === "ls") {
    return { response: SECTIONS.map((section) => section.label).join(" ") };
  }
  const [word, ...rest] = trimmed.split(/\s+/);
  if (word.toLowerCase() === "cd") {
    const target = (rest.join(" ") || "home").toLowerCase();
    const destination = NAV_LINKS.find((link) => link.label === target);
    if (destination) {
      return { response: `→ ${destination.label}`, navigateTo: destination.href };
    }
    return { response: `cd: no such section: ${target}` };
  }
  return { response: `command not found: ${rawInput}` };
}

export function Terminal() {
  const router = useRouter();
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

    const result = runCommand(command);
    const entry: HistoryEntry = {
      id: nextId.current++,
      command,
      response: result.response,
    };
    setHistory((previous) => [...previous, entry]);
    setInput("");

    if (result.navigateTo) {
      router.push(result.navigateTo);
    }
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
