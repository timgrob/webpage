import { RESEARCH_CONTENT } from "@/lib/research-content";
import { Section } from "@/components/section";

export default function ResearchPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat research.md</p>

      <h1 className="mt-4 text-lg font-semibold">{RESEARCH_CONTENT.title}</h1>
      <p className="text-accent">
        <span>{RESEARCH_CONTENT.institution}</span> &middot; <span>{RESEARCH_CONTENT.period}</span>
      </p>

      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.description}</p>
      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.approach}</p>
      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.outcome}</p>

      <Section title="Thesis">
        <p className="mt-3 text-sm">
          <a
            href={RESEARCH_CONTENT.thesis.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {RESEARCH_CONTENT.thesis.title}
          </a>
        </p>
        <p className="mt-1 text-sm text-muted">
          {RESEARCH_CONTENT.thesis.institution}, {RESEARCH_CONTENT.thesis.year}
          {" — "}download via Oxford&apos;s Research Archive
        </p>
      </Section>

      <Section title="Publications">
        <ul className="mt-3 flex flex-col gap-3 text-sm">
          {RESEARCH_CONTENT.papers.map((paper) => (
            <li key={paper.doi}>
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {paper.title}
              </a>
              <span className="text-muted"> ({paper.year})</span>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
