import { HOME_CONTENT } from "@/lib/home-content";
import { Terminal } from "@/components/terminal";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <Terminal />
      <h1 className="mt-8 text-2xl font-semibold sm:text-3xl">
        {HOME_CONTENT.name}
      </h1>
      <p className="mt-4 text-lg">{HOME_CONTENT.identity}</p>
      <p className="mt-4 max-w-xl text-muted">{HOME_CONTENT.tagline}</p>
      <p className="mt-8 max-w-xl text-sm text-muted">
        {HOME_CONTENT.interests}
      </p>
    </main>
  );
}
