export function StubPage({ file }: { file: string }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col px-6 py-16">
      <p className="text-accent">$ cat {file}</p>
      <p className="mt-4 text-muted">Coming soon.</p>
    </main>
  );
}
