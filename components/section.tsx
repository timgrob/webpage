import type { ReactNode } from "react";

export function Section({
  title,
  className = "mt-10",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
