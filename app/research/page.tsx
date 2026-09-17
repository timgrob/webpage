import { RESEARCH_CONTENT } from "@/lib/research-content";

export default function ResearchPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat research.md</p>

      <h1 className="mt-4 text-lg font-semibold">{RESEARCH_CONTENT.title}</h1>
      <p className="text-accent">
        <span>{RESEARCH_CONTENT.institution}</span> &middot; <span>{RESEARCH_CONTENT.period}</span>
      </p>

      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.description}</p>
      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.approach}</p>
      <p className="mt-4 max-w-xl text-muted">{RESEARCH_CONTENT.outcome}</p>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Publications</h2>
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
      </div>
    </main>
  );
}
