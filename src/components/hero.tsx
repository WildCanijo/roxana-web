import * as React from "react";
import { HERO_SLIDES, PROJECTS, lg } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Hero: a big wordmark with a circled mark, a one-line intro, a vertical
 * clock on the left, quick links on the right, and a wide image panel
 * underneath.
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

      <Showcase onOpenProject={onOpenProject} />
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

const STRIPS = 7;
const SLIDE_MS = 5200;

/**
 * Wide image panel under the intro. Pages from the book rotate through it:
 * each new image is revealed by vertical blinds that wipe in one after
 * another, settles with a slow zoom, and the whole stack drifts as the page
 * scrolls. Click to open the project on show.
 */
function Showcase({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [cur, setCur] = React.useState(0);
  const [prev, setPrev] = React.useState(-1);
  const [tick, setTick] = React.useState(0);
  const frame = React.useRef<HTMLDivElement>(null);
  const stack = React.useRef<HTMLDivElement>(null);
  const reduced = React.useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const go = React.useCallback((i: number) => {
    setCur((c) => {
      if (i === c) return c;
      setPrev(c);
      return i;
    });
    setTick((t) => t + 1);
  }, []);

  // Advance on a timer; picking a slide by hand restarts the clock.
  React.useEffect(() => {
    if (reduced) return;
    const id = setTimeout(() => go((cur + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [cur, tick, go, reduced]);

  // Parallax: the stack is taller than the frame and slides as it scrolls past.
  React.useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const f = frame.current;
      const st = stack.current;
      if (!f || !st) return;
      const r = f.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      st.style.transform = `translate3d(0, ${((p - 0.5) * 0.22 * r.height).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const slide = HERO_SLIDES[cur];
  const title = PROJECTS.find((p) => p.id === slide.project)?.title ?? "";

  return (
    <div className="hero-rise mt-10 px-4 md:px-8" style={{ animationDelay: "260ms" }}>
      <button
        type="button"
        onClick={() => onOpenProject(slide.project)}
        aria-label={`${slide.alt}. Open ${title}`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-muted text-left md:aspect-[3/1]"
        ref={frame as React.Ref<HTMLButtonElement>}
      >
        <div ref={stack} className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">
          {HERO_SLIDES.map((sl, i) => {
            const isCur = i === cur;
            const isPrev = i === prev;
            const shown = isCur || isPrev || (reduced && i === 0);
            return (
              <div
                key={sl.page}
                aria-hidden={!isCur}
                className={cn("absolute inset-0", isCur ? "z-20" : isPrev ? "z-10" : "z-0", (isCur || isPrev) && !reduced && "hero-zoom")}
              >
                {Array.from({ length: STRIPS }, (_, n) => (
                  <div
                    key={n}
                    className="absolute top-0 h-full overflow-hidden"
                    style={{
                      left: `${(n * 100) / STRIPS}%`,
                      width: `calc(${100 / STRIPS}% + 1px)`,
                      clipPath: shown
                        ? "inset(0 0 0 0)"
                        : n % 2
                          ? "inset(0 0 100% 0)"
                          : "inset(100% 0 0 0)",
                      transition: isCur && !reduced ? "clip-path 1.1s cubic-bezier(0.7,0,0.2,1)" : "none",
                      transitionDelay: isCur && !reduced ? `${n * 70}ms` : "0ms",
                    }}
                  >
                    <img
                      src={lg(sl.page)}
                      alt=""
                      draggable={false}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="absolute top-0 h-full max-w-none object-cover"
                      style={{ width: `${STRIPS * 100}%`, left: `${-n * 100}%`, objectPosition: sl.pos }}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <span className="mono absolute bottom-4 left-4 z-30 rounded-full bg-white/85 px-3 py-1.5 text-[0.75rem] uppercase opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100 md:bottom-5 md:left-5">
          View project
        </span>
      </button>

      <div className="mt-4 flex items-center justify-between gap-4 px-1 md:px-3">
        <span className="mono whitespace-pre">
          {`( ${String(cur + 1).padStart(2, "0")} / ${String(HERO_SLIDES.length).padStart(2, "0")} )`}
        </span>
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose image">
          {HERO_SLIDES.map((sl, i) => (
            <button
              key={sl.page}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === cur}
              onClick={() => go(i)}
              className="group/dot relative h-6 w-8"
            >
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/20" />
              <span
                key={i === cur ? tick : "idle"}
                className={cn("absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 origin-left bg-foreground", i !== cur && "scale-x-0")}
                style={i === cur && !reduced ? { animation: `fill ${SLIDE_MS}ms linear both` } : i === cur ? undefined : undefined}
              />
            </button>
          ))}
        </div>
        <span className="mono truncate uppercase">{title}</span>
      </div>
    </div>
  );
}
