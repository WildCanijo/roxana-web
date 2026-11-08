import * as React from "react";
import { Hero } from "@/components/hero";
import { BlurWords } from "@/components/blur-words";
import { ProjectViewer } from "@/components/project-viewer";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  CLIENTS,
  EMAIL,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  STRENGTHS,
  TOOLS,
  sm,
  type Project,
} from "@/data/content";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function App() {
  const [filter, setFilter] = React.useState<(typeof CATEGORIES)[number]>("All");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const visible = React.useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const openIndex = openId ? visible.findIndex((p) => p.id === openId) : -1;
  const step = React.useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      setOpenId(visible[(openIndex + dir + visible.length) % visible.length].id);
    },
    [openIndex, visible],
  );
  const close = React.useCallback(() => setOpenId(null), []);
  // Cards in the hero can point at any project, so clear the filter first.
  const openFromHero = React.useCallback((id: string) => {
    setFilter("All");
    setOpenId(id);
  }, []);

  return (
    <>
      <Header />
      <div aria-hidden className="edge-blur edge-blur--bottom" />
      <main>
        <Hero onOpenProject={openFromHero} />
        <Statement />

        <section id="work" className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label text-primary">Selected work</p>
                <h2 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-7xl">
                  The <em className="font-light">book</em>
                </h2>
              </div>
              <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={filter === c}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "label rounded-full border px-4 py-2 transition",
                      filter === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>

            <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-6">
              {visible.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  // Two wide, three narrow, repeating.
                  wide={i % 5 < 2}
                  onOpen={() => setOpenId(p.id)}
                />
              ))}
            </ul>
          </div>
        </section>

        <About />
        <Experience />
        <Contact />
      </main>

      {openIndex >= 0 && (
        <ProjectViewer
          project={visible[openIndex]}
          index={openIndex}
          total={visible.length}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}

/* ── header: monogram left, "+" menu right, over a blurred top edge ── */

function Header() {
  const [open, setOpen] = React.useState(false);
  const [overDark, setOverDark] = React.useState(false);
  const panel = React.useRef<HTMLDivElement>(null);

  // Switch to light-on-dark while the dark contact section is behind the header.
  React.useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(([e]) => setOverDark(e.isIntersecting), {
      rootMargin: "0px 0px -92% 0px",
    });
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div className={cn(overDark && "dark")}>
      <div aria-hidden className="edge-blur edge-blur--top" />
      <header className="fixed inset-x-0 top-0 z-40 text-foreground">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" aria-label="Roxana Fadanelli, home" className="font-serif text-[1.65rem] leading-none tracking-tight">
            <span className="font-semibold">r</span>
            <em className="font-light">f</em>
          </a>

          <div ref={panel} className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-10 w-10 place-items-center"
            >
              <span
                className={cn(
                  "absolute h-px w-8 bg-current transition-transform duration-500",
                  open && "rotate-[135deg]",
                )}
              />
              <span
                className={cn(
                  "absolute h-8 w-px bg-current transition-transform duration-500",
                  open && "rotate-[135deg]",
                )}
              />
            </button>

            <div
              id="site-menu"
              className={cn(
                "absolute right-0 top-14 w-[min(20rem,calc(100vw-2.5rem))] origin-top-right rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl transition duration-300",
                open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
              )}
            >
              <nav aria-label="Main">
                <ul className="space-y-3">
                  {NAV.map((n, i) => (
                    <li key={n.href} className="flex items-baseline gap-4">
                      <span className="label w-16 shrink-0 whitespace-nowrap text-muted-foreground">( _{String(i + 1).padStart(2, "0")} )</span>
                      <a
                        href={n.href}
                        tabIndex={open ? 0 : -1}
                        onClick={() => setOpen(false)}
                        className="font-serif text-3xl tracking-tight transition hover:italic hover:text-primary"
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={`mailto:${EMAIL}`}
                tabIndex={open ? 0 : -1}
                className="label mt-6 block border-t border-border pt-4 text-muted-foreground transition hover:text-primary"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

/* ── statement: words sharpen out of a blur, clients underneath ──── */

function Statement() {
  return (
    <section aria-label="About in brief" className="px-5 pb-8 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[62rem] text-center">
        <BlurWords
          text="I’m Roxana — an art director shaping *premium* brands, thoughtful digital products and images that tell *one* story."
          className="text-balance text-[clamp(2rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.03em]"
        />
        <Reveal delay={200}>
          <ul className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-9 gap-y-3">
            {CLIENTS.map((c) => (
              <li key={c} className="label text-muted-foreground">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}


/* ── project card: tilts toward the pointer, like a tile on the hero's arc ── */

function ProjectCard({
  project,
  index,
  wide,
  onOpen,
}: {
  project: Project;
  index: number;
  wide: boolean;
  onOpen: () => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal as="li" delay={(index % 3) * 80} className={cn(wide ? "md:col-span-3" : "md:col-span-2")}>
      <button
        ref={ref}
        type="button"
        onClick={onOpen}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group block w-full text-left [perspective:1200px]"
        aria-label={`Open ${project.title}: ${project.subtitle}`}
      >
        <div
          className="relative aspect-video overflow-hidden rounded-lg bg-muted shadow-sm transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none"
          style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
        >
          <img
            src={sm(project.cover)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <span className="label absolute bottom-4 left-4 translate-y-2 rounded-full bg-background/90 px-3 py-1.5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View project · {project.pages.length} {project.pages.length === 1 ? "image" : "images"}
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl tracking-tight transition group-hover:text-primary md:text-[1.7rem]">
              {project.title}
            </h3>
            <p className="mt-1 text-muted-foreground">{project.subtitle}</p>
          </div>
          <p className="label shrink-0 text-muted-foreground">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
      </button>
    </Reveal>
  );
}

/* ── about: skills and strengths ────────────────────────────────── */

function About() {
  return (
    <section id="about" className="bg-secondary/35 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="label text-primary">About</p>
          <h2 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-6xl">
            Roxana <em className="font-light">Fadanelli G.</em>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            An art director, graphic designer and product designer based in Mexico. For about ten years
            she has worked across graphic design, branding, UI/UX, digital experiences and creative direction,
            from editorial design and museum installations to luxury hospitality and streaming platforms.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            She brings the craft of traditional design together with product thinking, and she
            contributes from the first concept and brand positioning through to the final interface.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-8">
            <Stat value="~10" label="Years in design" />
            <Stat value="5" label="Studios & teams" />
            <Stat value="MX" label="Based in Mexico" />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="label text-foreground">Capabilities</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <li key={s} className="rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <p className="label mt-8 text-muted-foreground">Tools: {TOOLS.join(" · ")}</p>
          </Reveal>

          <ol className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
            {STRENGTHS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="label pt-1.5 text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl tracking-tight md:text-5xl">{value}</p>
      <p className="label mt-2 text-muted-foreground">{label}</p>
    </div>
  );
}

/* ── experience timeline ────────────────────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label text-primary">Experience</p>
          <h2 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-7xl">
            Background <em className="font-light">&amp; teams</em>
          </h2>
        </Reveal>

        <ol className="mt-14 border-t border-border">
          {EXPERIENCE.map((e, i) => (
            <Reveal
              as="li"
              key={e.org}
              delay={i * 60}
              className="group grid gap-2 border-b border-border py-8 transition-colors hover:bg-secondary/25 md:grid-cols-12 md:gap-6 md:px-4"
            >
              <p className="label pt-2 text-muted-foreground md:col-span-2">{e.period}</p>
              <h3 className="font-serif text-3xl tracking-tight transition group-hover:text-primary md:col-span-4 md:text-4xl">
                {e.org}
              </h3>
              <div className="md:col-span-6">
                <p className="font-medium">{e.role}</p>
                <p className="mt-1 text-muted-foreground">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── contact: the book's closing page ───────────────────────────── */

function Contact() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="dark bg-background text-foreground">
      <div className="mx-auto flex min-h-[85svh] max-w-[1400px] flex-col justify-between px-5 py-20 md:px-10 md:py-24">
        <Reveal className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="label text-primary">Let’s work together</p>
          <h2 className="mt-6 font-serif text-[clamp(4.5rem,16vw,13rem)] font-light italic leading-none tracking-tight">
            Gracias.
          </h2>
          <p className="mt-4 font-serif text-xl italic text-muted-foreground">Thank you.</p>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-primary px-6 py-3.5 font-serif text-lg italic text-primary-foreground transition hover:bg-foreground hover:text-background"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copy}
              className="label rounded-full border border-border px-5 py-3.5 text-muted-foreground transition hover:border-primary hover:text-foreground"
            >
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif tracking-[0.08em]">
              <strong className="font-semibold">CONTACT.</strong>
            </p>
            <p className="mt-3 font-serif tracking-[0.06em]">
              <strong className="font-semibold">ROXANA</strong> <em className="font-light">FADANELLI</em>
            </p>
            <p className="font-serif text-sm tracking-[0.08em]">
              <strong className="font-semibold">ART DIRECTOR &amp; UI–UX</strong>
            </p>
          </div>
          <p className="label text-muted-foreground">© {new Date().getFullYear()} Roxana Fadanelli · México</p>
        </div>
      </div>
    </section>
  );
}
