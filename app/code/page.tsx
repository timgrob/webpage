import { CODE_CONTENT } from "@/lib/code-content";

export default function CodePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat code.md</p>

      <p className="mt-4 max-w-xl text-muted">{CODE_CONTENT.description}</p>

      <div className="mt-10 flex flex-col gap-10">
        {CODE_CONTENT.entries.map((entry) => (
          <article key={entry.id}>
            <h2 className="text-lg font-semibold">
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {entry.name}
              </a>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{entry.description}</p>
          </article>
        ))}
      </div>

      <a
        href={CODE_CONTENT.profileHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block text-sm text-accent hover:underline"
      >
        see more on github.com/timgrob
      </a>
    </main>
  );
}
