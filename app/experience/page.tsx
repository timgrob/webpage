import { EXPERIENCE_CONTENT } from "@/lib/experience-content";

export default function ExperiencePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat experience.md</p>

      <p className="mt-4 max-w-xl text-muted">{EXPERIENCE_CONTENT.summary}</p>

      <div className="mt-10 flex flex-col gap-10">
        {EXPERIENCE_CONTENT.entries.map((entry) => (
          <article key={entry.id}>
            <h2 className="text-lg font-semibold">{entry.role}</h2>
            <p className="text-accent">
              <span>{entry.company}</span> &middot; <span>{entry.location}</span>
            </p>
            <p className="text-sm text-muted">{entry.period}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {entry.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
