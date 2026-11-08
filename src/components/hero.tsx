import * as React from "react";
import { TICKER } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Hero: a big wordmark with a circled mark, a one-line intro, a vertical
 * clock on the left, quick links on the right, and an endless row of tall
 * arched cards from the book underneath.
 */
export function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-[clamp(7rem,16vh,9.5rem)]">
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="text-center">
          <h1 className="hero-rise relative inline-block text-[clamp(5rem,15.5vw,13.25rem)] font-bold leading-[0.82] tracking-[-0.065em]">
            Roxana
            <span className="sr-only"> Fadanelli</span>
            {/* Circled initial, set like a registered mark. */}
            <span aria-hidden className="absolute left-full top-[0.06em] ml-[0.04em] text-[0.2em] leading-none">
              <span className="grid h-[1.45em] w-[1.45em] place-items-center rounded-full border-[0.14em] border-current font-bold tracking-normal">
                <span className="-mt-[0.04em] text-[0.82em]">F</span>
              </span>
            </span>
          </h1>
          <p
            className="hero-rise mt-[clamp(1.5rem,4vh,2.75rem)] text-[clamp(1.2rem,1.65vw,1.5rem)] font-medium tracking-[-0.01em]"
            style={{ animationDelay: "120ms" }}
          >
            Art director &amp; UI–UX designer based in Mexico.
          </p>
        </div>

        <div className="mt-10 flex items-end justify-between md:mt-0">
          <Clock />
          <QuickLinks className="hero-rise" />
        </div>
      </div>

      <Ticker onOpenProject={onOpenProject} />
    </section>
  );
}

export function QuickLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Quick links" className={cn("mono flex gap-4 uppercase", className)}>
      <a href="#work" className="transition hover:opacity-50">Work</a>
      <span aria-hidden>/</span>
      <a href="#about" className="transition hover:opacity-50">About</a>
      <span aria-hidden>/</span>
      <a href="#contact" className="transition hover:opacity-50">Mail</a>
    </nav>
  );
}

/** "( 18:29 MX )" running up the left edge, in Mexico City time. */
function Clock() {
  const fmt = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Mexico_City",
      }),
    [],
  );
  const [now, setNow] = React.useState(() => fmt.format(new Date()));
  React.useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, [fmt]);

  return (
    <div className="relative h-24 w-5 md:-mt-28">
      <p
        className="mono absolute bottom-0 left-full origin-bottom-left -rotate-90 whitespace-pre text-foreground/80"
        aria-label={`Local time in Mexico City: ${now}`}
      >
        {`(  ${now}  MX  )`}
      </p>
    </div>
  );
}

/**
 * Endless row of tall cards. The list is rendered twice and slid left by
 * half its width, so the loop never shows a seam. Neighbouring cards round
 * opposite top corners, which makes the arches between them.
 */
function Ticker({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="hero-rise relative mt-10 md:px-8" style={{ animationDelay: "260ms" }}>
      <div
        className="marquee-pause overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent), linear-gradient(to top,transparent,#000 22%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent), linear-gradient(to top,transparent,#000 22%)",
          WebkitMaskComposite: "source-in",
        }}
      >
        <ul className="marquee flex w-max" style={{ ["--marquee-speed" as string]: "120s" }}>
          {items.map((t, i) => (
            <li key={i} aria-hidden={i >= TICKER.length || undefined} className="pr-2.5">
              <button
                type="button"
                tabIndex={i >= TICKER.length ? -1 : 0}
                onClick={() => onOpenProject(t.project)}
                className={cn(
                  "block aspect-[181/520] h-[clamp(22rem,62vh,34rem)] overflow-hidden bg-muted",
                  i % 2 === 0 ? "rounded-tl-[50%_17.4%]" : "rounded-tr-[50%_17.4%]",
                )}
                aria-label={`${t.alt}. Open project`}
              >
                <img
                  src={t.src}
                  alt=""
                  draggable={false}
                  loading={i < 10 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.06]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
