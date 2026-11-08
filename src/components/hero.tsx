import * as React from "react";
import { TICKER } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Hero: a large centred wordmark and tagline, a vertical clock on the left
 * edge, quick links on the right, and an endless ticker of tall cards from
 * the book running underneath.
 */
export function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-[clamp(6.5rem,15vh,9.5rem)]">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="text-center">
          <h1 className="hero-rise relative inline-block font-serif text-[clamp(4.75rem,16vw,13.5rem)] font-semibold leading-[0.8] tracking-[-0.035em]">
            Roxana
            {/* Sits top-right of the wordmark, like a registered mark. */}
            <span className="absolute left-[calc(100%+0.08em)] top-[0.02em] whitespace-nowrap font-light italic leading-none tracking-normal text-[0.17em] text-primary">
              Fadanelli
            </span>
          </h1>
          <p
            className="hero-rise mt-[clamp(1.25rem,3.5vh,2.25rem)] text-[clamp(1.05rem,1.6vw,1.4rem)] tracking-tight"
            style={{ animationDelay: "120ms" }}
          >
            Art director &amp; UI–UX designer based in Mexico.
          </p>
        </div>

        <Clock />

        <nav
          aria-label="Quick links"
          className="label hero-rise mt-6 flex justify-center gap-3 text-foreground/80 md:absolute md:bottom-1 md:right-8 md:mt-0"
          style={{ animationDelay: "200ms" }}
        >
          <a href="#work" className="transition hover:text-primary">Work</a>
          <span aria-hidden>/</span>
          <a href="#about" className="transition hover:text-primary">About</a>
          <span aria-hidden>/</span>
          <a href="#contact" className="transition hover:text-primary">Mail</a>
        </nav>
      </div>

      <Ticker onOpenProject={onOpenProject} />
    </section>
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
    <p
      className="label absolute bottom-1 left-6 hidden origin-bottom-left -rotate-90 translate-x-[0.8em] whitespace-nowrap text-foreground/70 md:block"
      aria-label={`Local time in Mexico City: ${now}`}
    >
      (&nbsp;&nbsp;{now}&nbsp;&nbsp;MX&nbsp;)
    </p>
  );
}

/**
 * Endless row of tall cards. The list is rendered twice and slid left by
 * half its width, so the loop never shows a seam. Neighbouring cards round
 * opposite corners, which makes the arches between them.
 */
function Ticker({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className="hero-rise relative mt-[clamp(2rem,6.5vh,3.5rem)] px-0 md:px-8"
      style={{ animationDelay: "260ms" }}
    >
      <div
        className="group/ticker overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
        }}
      >
        <ul className="ticker-track flex w-max gap-2.5">
          {items.map((t, i) => (
            <li key={i} aria-hidden={i >= TICKER.length || undefined}>
              <button
                type="button"
                tabIndex={i >= TICKER.length ? -1 : 0}
                onClick={() => onOpenProject(t.project)}
                className={cn(
                  "block h-[clamp(20rem,58vh,32.5rem)] aspect-[181/520] overflow-hidden bg-muted",
                  // Radius is half the card's width (50% across, 50%·181/520 down).
                  i % 2 === 0
                    ? "rounded-tr-[50%_17.4%] rounded-bl-[50%_17.4%]"
                    : "rounded-tl-[50%_17.4%] rounded-br-[50%_17.4%]",
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
