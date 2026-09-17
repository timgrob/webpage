import { PROJECTS_CONTENT } from "@/lib/projects-content";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat projects.md</p>

      <p className="mt-4 max-w-xl text-muted">{PROJECTS_CONTENT.description}</p>

      <div className="mt-10 flex flex-col gap-10">
        {PROJECTS_CONTENT.entries.map((entry) => (
          <article key={entry.id}>
            <h2 className="text-lg font-semibold">{entry.name}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{entry.description}</p>
            <a
              href={entry.videoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-accent hover:underline"
            >
              watch on YouTube
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
