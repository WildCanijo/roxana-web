import * as React from "react";
import { lg, type Project } from "@/data/content";

/** Full-screen case view: project notes on the left, book pages on the right. */
export function ProjectViewer({
  project,
  index,
  total,
  onClose,
  onStep,
}: {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const scroller = React.useRef<HTMLDivElement>(null);
  const closeBtn = React.useRef<HTMLButtonElement>(null);

  // Lock the page behind, and give focus back to where it was on close.
  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // Start each project from the top.
  React.useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
      className="dark fixed inset-0 z-50 bg-background text-foreground"
    >
      <div ref={scroller} className="h-full overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-10">
          <span className="label text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.category}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onStep(-1)}
              className="label rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              className="label rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Next →
            </button>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="label ml-2 rounded-md border border-border px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              Close ✕
            </button>
          </div>
        </div>

        <div className="grid gap-10 px-5 py-10 md:px-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 lg:py-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-primary">{project.subtitle}</p>
            <h2 id="viewer-title" className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight md:text-6xl">
              {project.title}
            </h2>
            {project.year && <p className="label mt-4 text-muted-foreground">{project.year}</p>}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{project.summary}</p>

            {project.goals && (
              <div className="mt-8">
                <p className="label text-foreground">Goals</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {project.goals.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span className="text-primary">—</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {project.roles.map((r) => (
                <span key={r} className="label rounded-full border border-border px-3 py-1.5 text-muted-foreground">
                  {r}
                </span>
              ))}
            </div>

            {project.credits && (
              <ul className="label mt-8 space-y-1.5 text-muted-foreground">
                {project.credits.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}
          </aside>

          <div className="space-y-4 md:space-y-6">
            {project.pages.map((p, i) => (
              <img
                key={p}
                src={lg(p)}
                alt={`${project.title}, image ${i + 1} of ${project.pages.length}`}
                loading={i < 2 ? "eager" : "lazy"}
                className="aspect-video w-full rounded-lg bg-muted object-cover"
              />
            ))}
            <button
              type="button"
              onClick={() => onStep(1)}
              className="group mt-6 flex w-full items-center justify-between border-t border-border pt-8 text-left"
            >
              <span className="label text-muted-foreground">Next project</span>
              <span className="font-serif text-3xl italic transition group-hover:text-primary md:text-4xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
