import * as React from "react";
import { Hero, QuickLinks } from "@/components/hero";
import { BlurWords } from "@/components/blur-words";
import { ProjectViewer } from "@/components/project-viewer";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { CLIENTS, EMAIL, EXPERIENCE, FAQ, PROJECTS, SERVICES, lg, sm, type Project } from "@/data/content";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const YEAR = String(new Date().getFullYear()).slice(-2);

export default function App() {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const openIndex = openId ? PROJECTS.findIndex((p) => p.id === openId) : -1;
  const step = React.useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      setOpenId(PROJECTS[(openIndex + dir + PROJECTS.length) % PROJECTS.length].id);
    },
    [openIndex],
  );
  const close = React.useCallback(() => setOpenId(null), []);

  return (
    <>
      <Header />
      <div aria-hidden className="edge-blur edge-blur--bottom" />
      <main>
        <Hero onOpenProject={setOpenId} />
        <Statement />
        <Work onOpen={setOpenId} />
        <Services />
        <About />
        <Experience />
        <Faq />
      </main>
      <Footer />

      {openIndex >= 0 && (
        <ProjectViewer
          project={PROJECTS[openIndex]}
          index={openIndex}
          total={PROJECTS.length}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}

/* ── shared bits ───────────────────────────────────────────────── */

function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold leading-none tracking-[-0.08em]", className)}>
      rf<span className="sr-only">, Roxana Fadanelli</span>
    </span>
  );
}

function PlusLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-start gap-3 text-[1.1rem] font-medium tracking-[-0.02em]">
      <span className="bar-link">{children}</span>
      <svg viewBox="0 0 14 14" className="mt-1.5 h-3.5 w-3.5 transition duration-500 group-hover:rotate-90" aria-hidden>
        <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  );
}

function SectionHead({
  title,
  aside,
  className,
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex items-end justify-between gap-6", className)}>
      <h2 className="display">{title}</h2>
      {aside && <div className="shrink-0 pb-2">{aside}</div>}
    </Reveal>
  );
}

/* ── header: mark on the left, "+" on the right, drop-down menu ──── */

function Header() {
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrap}>
      <div aria-hidden className="edge-blur edge-blur--top" />

      <div
        id="site-menu"
        className={cn(
          "menu-panel fixed inset-x-0 top-0 z-40 flex h-[min(90svh,50rem)] flex-col justify-between bg-white/70 px-4 pb-12 pt-28 backdrop-blur-2xl md:px-8 md:pt-40",
          open && "is-open",
        )}
        inert={!open}
      >
        <nav aria-label="Main">
          <ul className="space-y-1 md:space-y-5">
            {NAV.map((n, i) => (
              <li
                key={n.href}
                className="menu-item group relative flex items-center"
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              >
                <span className="mono w-[4.25rem] shrink-0 whitespace-pre text-[0.8rem]">
                  {`( _${String(i + 1).padStart(2, "0")} )`}
                </span>
                <a
                  href={n.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="text-[clamp(2.4rem,4.2vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.02em] after:absolute after:inset-0"
                >
                  {n.label}
                </a>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100 md:-bottom-2.5"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="menu-item flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          style={{ transitionDelay: open ? "450ms" : "0ms" }}
        >
          <a
            href={`mailto:${EMAIL}`}
            tabIndex={open ? 0 : -1}
            className="bar-link text-[clamp(1.4rem,2.2vw,2rem)] font-medium tracking-[-0.02em]"
          >
            {EMAIL}
          </a>
          <QuickLinks />
        </div>
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-4 py-5 md:px-8">
          <a href="#top" className="pointer-events-auto text-[1.9rem]" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="pointer-events-auto relative grid h-10 w-10 place-items-center"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-8 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]",
                open && "rotate-45 scale-x-[0.9]",
              )}
            />
            <span
              className={cn(
                "absolute h-8 w-[1.5px] bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]",
                open && "rotate-45 scale-y-[0.9]",
              )}
            />
          </button>
        </div>
      </header>
    </div>
  );
}

/* ── statement, with a row of clients sliding underneath ─────────── */

function Statement() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section aria-label="About in brief" className="px-4 pb-10 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto max-w-[38rem] text-center">
        <BlurWords
          text="I’m Roxana Fadanelli — an art director shaping premium brands, thoughtful digital products and images that tell one story."
          className="lead text-balance"
        />
      </div>
      <Reveal delay={150}>
        <div
          className="mx-auto mt-14 max-w-[38rem] overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)",
            WebkitMaskImage: "linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)",
          }}
        >
          <ul className="marquee flex w-max" style={{ ["--marquee-speed" as string]: "40s" }}>
            {row.map((c, i) => (
              <li
                key={i}
                aria-hidden={i >= CLIENTS.length || undefined}
                className="whitespace-nowrap pr-14 text-[1.4rem] font-medium tracking-[-0.03em] text-muted-foreground/90"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ── latest projects: two columns of rounded images ─────────────── */

function Work({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="work" className="px-4 pt-24 md:px-8 md:pt-36">
      <SectionHead
        title={
          <>
            Latest
            <br />
            Projects.
          </>
        }
        aside={<span className="mono whitespace-pre">{`( _©${YEAR} )`}</span>}
      />
      <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={(i % 2) * 90} onOpen={() => onOpen(p.id)} />
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({ project, delay, onOpen }: { project: Project; delay: number; onOpen: () => void }) {
  return (
    <Reveal as="li" delay={delay}>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left"
        aria-label={`Open ${project.title}: ${project.subtitle}`}
      >
        <div className="aspect-[676/540] overflow-hidden rounded-[1.5rem] bg-muted">
          <img
            src={sm(project.cover)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 px-3 text-xs font-medium">
          <span className="uppercase">{project.title}</span>
          <span className="text-muted-foreground">_{project.year ?? project.category}</span>
        </div>
      </button>
    </Reveal>
  );
}

/* ── services: pastel cards sliding sideways ─────────────────────── */

// 5×5 pixel glyphs drawn in the middle of each service card.
const GLYPHS = [
  "..##.|.####|##.##|####.|.##..",
  "..#..|.#.#.|#.#.#|.#.#.|..#..",
  "#.#.#|.#.#.|#.#.#|.#.#.|#.#.#",
  "#####|#...#|#.#.#|#...#|#####",
  "##..#|.##.#|..##.|#.##.|#..##",
];

function Glyph({ rows }: { rows: string }) {
  const cells = rows.split("|").flatMap((r, y) => [...r].map((c, x) => (c === "#" ? [x, y] : null)));
  return (
    <svg viewBox="0 0 5 5" className="h-14 w-14" aria-hidden shapeRendering="crispEdges">
      {cells.map((c, i) => c && <rect key={i} x={c[0]} y={c[1]} width="1" height="1" fill="currentColor" />)}
    </svg>
  );
}

function Services() {
  const cards = [...SERVICES, ...SERVICES];
  return (
    <section aria-labelledby="services-title" className="pt-28 md:pt-44">
      <SectionHead
        className="px-4 md:px-8"
        title={<span id="services-title">Services.</span>}
        aside={<PlusLink href="#contact">Get in touch</PlusLink>}
      />
      <Reveal className="marquee-pause mt-12 overflow-hidden px-4 md:px-8">
        <div
          style={{
            maskImage: "linear-gradient(90deg,#000 80%,transparent)",
            WebkitMaskImage: "linear-gradient(90deg,#000 80%,transparent)",
          }}
        >
          <ul className="marquee flex w-max" style={{ ["--marquee-speed" as string]: "55s" }}>
            {cards.map((s, i) => (
              <li
                key={i}
                aria-hidden={i >= SERVICES.length || undefined}
                className="mr-3 flex h-[clamp(26rem,56vh,31rem)] w-[min(28rem,82vw)] flex-col justify-between rounded-[2rem] p-8 md:p-10"
                style={{ background: s.color }}
              >
                <span className="mono whitespace-pre">{`( ${String((i % SERVICES.length) + 1).padStart(3, "0")} )`}</span>
                <div className="grid place-items-center">
                  <Glyph rows={GLYPHS[i % GLYPHS.length]} />
                </div>
                <div>
                  <h3 className="mono uppercase">{s.title}</h3>
                  <p className="mt-3 max-w-[16rem] text-[0.88rem] leading-[1.4]">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ── about: statement, wide image, four numbers ──────────────────── */

const STATS = [
  { value: "~10", label: "Years working across design and direction." },
  { value: "5", label: "Studios and teams, from magazines to museums." },
  { value: String(PROJECTS.length), label: "Projects collected in the book." },
  { value: "MX", label: "Based in Mexico, working worldwide." },
];

function About() {
  return (
    <section id="about" className="px-4 pt-28 md:px-8 md:pt-44">
      <Reveal>
        <h2 className="lead max-w-[48rem]">
          Roxana Fadanelli is an art director and product designer bringing craft and product thinking together.
        </h2>
      </Reveal>
      <Reveal className="mt-10 overflow-hidden rounded-[2rem]">
        <img
          src={lg(15)}
          alt="Ophidia packaging with an embossed seal, from the Country Lakes identity"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover md:aspect-[1376/840]"
        />
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal as="li" key={s.label} delay={i * 80}>
            <p className="text-[2.5rem] font-medium leading-none tracking-[-0.03em]">{s.value}</p>
            <p className="mt-5 max-w-[12.5rem] text-[1.1rem] leading-[1.5] text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── experience: cards that stack as you scroll ──────────────────── */

const CARD_COLORS = ["var(--lavender)", "var(--lime)", "var(--rose)", "var(--peach)", "var(--sky)"];

function Experience() {
  return (
    <section id="experience" className="px-4 pt-28 md:px-8 md:pt-44">
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <p className="mono whitespace-pre">{"( EXPERIENCE )"}</p>
        <h2 className="mt-6 text-balance text-[clamp(2.2rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em]">
          Ten years with brands who aren’t afraid to stand out.
        </h2>
      </Reveal>

      <ol className="mt-14">
        {EXPERIENCE.map((e, i) => (
          <li
            key={e.org}
            className="sticky mb-8 grid overflow-hidden rounded-[2rem] bg-secondary md:h-[min(calc(100svh-7rem),46rem)] md:grid-cols-2"
            style={{ top: `calc(5rem + ${i * 0.75}rem)` }}
          >
            <div
              className="flex min-h-[15rem] flex-col gap-8 p-8 md:p-12"
              style={{ background: CARD_COLORS[i % CARD_COLORS.length] }}
            >
              <span className="mono whitespace-pre">{`( ${String(i + 1).padStart(3, "0")} )`}</span>
              <p className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.06em]">{e.org}</p>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="max-w-[35rem] text-[clamp(1.5rem,2.25vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                {e.text}
              </p>
              <p className="mt-12">{e.role}</p>
              <p className="mt-2 text-[1.1rem] text-muted-foreground">{e.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── FAQ: title on the left, accordion on the right ──────────────── */

function Faq() {
  const [open, setOpen] = React.useState(0);
  return (
    <section aria-labelledby="faq-title" className="grid gap-10 px-4 pb-32 pt-24 md:grid-cols-2 md:px-8 md:pb-44 md:pt-36">
      <Reveal>
        <h2 id="faq-title" className="display">
          FAQ.
        </h2>
      </Reveal>
      <Reveal className="max-w-[31.25rem]">
        <ul>
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={cn("transition", isOpen && "text-muted-foreground")}>{f.q}</span>
                    <svg
                      viewBox="0 0 16 16"
                      className={cn("h-4 w-4 shrink-0 transition-transform duration-500", isOpen && "rotate-180")}
                      aria-hidden
                    >
                      <path d="M2 5.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <p className="overflow-hidden leading-[1.45] text-muted-foreground">
                    <span className="block pb-6 pt-1">{f.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

/* ── footer: say hi on the left, contact form on the right ───────── */

function Footer() {
  return (
    <footer id="contact" className="bg-secondary px-4 pb-10 pt-8 md:px-8">
      <div className="flex items-center justify-between">
        <a href="#top" className="text-[2.6rem]">
          <Logo />
        </a>
        <QuickLinks />
      </div>

      <div className="mt-24 grid gap-20 md:mt-32 md:grid-cols-2">
        <Reveal>
          <p className="max-w-[26rem] text-[clamp(1.6rem,2.2vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            I’d love to hear from you —{" "}
            <span className="text-muted-foreground">whether you have a project in mind, or just want to say hi.</span>
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="bar-link mt-12 break-all text-[clamp(1.4rem,2.2vw,2rem)] font-medium tracking-[-0.02em]"
          >
            {EMAIL}
          </a>
        </Reveal>
        <Reveal className="md:ml-auto md:w-full md:max-w-[28rem]">
          <ContactForm />
        </Reveal>
      </div>

      <div className="mt-28 flex flex-col gap-6 md:mt-40 md:flex-row md:items-end md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-medium">
            {NAV.slice(1).map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition hover:opacity-50">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mono whitespace-pre">{`( ©${YEAR} Roxana Fadanelli )`}</p>
      </div>
    </footer>
  );
}

/** Posts to Netlify Forms; the matching hidden form lives in index.html. */
function ContactForm() {
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  const field =
    "w-full border-b border-foreground/30 bg-transparent pb-3 pt-1 outline-none transition placeholder:text-muted-foreground focus:border-foreground";

  return (
    <form name="contact" onSubmit={submit} className="flex flex-col gap-7">
      <div>
        <h2 className="text-[clamp(2.4rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em]">
          Start a<br />
          project
        </h2>
        <p className="mono mt-3 text-[0.8rem] text-muted-foreground">Tell me a little about what you’re making.</p>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>
      <label className="block">
        <span className="sr-only">Name</span>
        <input name="name" required placeholder="Name" autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Email</span>
        <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" rows={2} placeholder="Message" className={cn(field, "resize-none")} />
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="h-[3.25rem] rounded-xl bg-foreground font-medium uppercase text-background transition hover:opacity-85 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send"}
      </button>
      <p aria-live="polite" className="mono -mt-3 min-h-[1.2em] text-[0.8rem] text-muted-foreground">
        {state === "sent" && "Thank you, your message is on its way."}
        {state === "error" && `That didn’t send. Please write to ${EMAIL}.`}
      </p>
    </form>
  );
}
