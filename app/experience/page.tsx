import { EXPERIENCE_CONTENT } from "@/lib/experience-content";

export default function ExperiencePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat experience.md</p>

      <p className="mt-4 max-w-xl text-muted">{EXPERIENCE_CONTENT.summary}</p>

      <a
        href={EXPERIENCE_CONTENT.cvDownloadHref}
        download
        className="mt-6 inline-block w-fit border border-border px-4 py-2 text-sm text-accent hover:underline"
      >
        download CV (PDF)
      </a>

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

      <div className="mt-12">
        <h2 className="text-lg font-semibold">Skills</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          {EXPERIENCE_CONTENT.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
