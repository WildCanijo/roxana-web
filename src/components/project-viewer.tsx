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
      className="fixed inset-0 z-[60] bg-background text-foreground"
    >
      <div ref={scroller} className="h-full overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-background/80 px-4 py-4 backdrop-blur-xl md:px-8">
          <span className="mono whitespace-pre">
            {`( _${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} )`}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onStep(-1)}
              className="mono rounded-full px-4 py-2 uppercase transition hover:bg-muted"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              className="mono rounded-full px-4 py-2 uppercase transition hover:bg-muted"
            >
              Next →
            </button>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="mono ml-2 rounded-full bg-foreground px-4 py-2 uppercase text-background transition hover:opacity-85"
            >
              Close ✕
            </button>
          </div>
        </div>

        <div className="grid gap-10 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16 lg:py-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mono uppercase">{project.category}</p>
            <h2 id="viewer-title" className="display mt-4">
              {project.title}
            </h2>
            <p className="mt-3 text-[1.1rem] text-muted-foreground">
              {project.subtitle}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <p className="mt-8 text-[1.1rem] leading-[1.5]">{project.summary}</p>

            {project.goals && (
              <div className="mt-8">
                <p className="mono whitespace-pre">{"( GOALS )"}</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {project.goals.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span>—</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {project.roles.map((r) => (
                <span key={r} className="mono rounded-full bg-muted px-3 py-1.5 text-[0.75rem] uppercase">
                  {r}
                </span>
              ))}
            </div>

            {project.credits && (
              <ul className="mono mt-8 space-y-1.5 text-[0.8rem] text-muted-foreground">
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
                className="aspect-video w-full rounded-[1.5rem] bg-muted object-cover"
              />
            ))}
            <button
              type="button"
              onClick={() => onStep(1)}
              className="group mt-6 flex w-full items-center justify-between border-t border-border pt-8 text-left"
            >
              <span className="mono uppercase">Next project</span>
              <span className="display transition group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
