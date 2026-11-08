import * as React from "react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ProjectViewer } from "@/components/project-viewer";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  CLIENTS,
  EMAIL,
  EXPERIENCE,
  HERO_PAGES,
  PROJECTS,
  SKILLS,
  STRENGTHS,
  TOOLS,
  sm,
  type Project,
} from "@/data/content";

const HERO_IMAGES = HERO_PAGES.map((p) => ({ src: sm(p) }));

const NAV = [
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

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <Intro />

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

/* ── header ─────────────────────────────────────────────────────── */

function Header() {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="font-serif text-[15px] tracking-[0.08em]">
          <strong className="font-semibold">ROXANA</strong> <em className="font-light">FADANELLI</em>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 md:gap-2">
            {NAV.map((n, i) => (
              <li key={n.href} className={cn(i === 1 || i === 2 ? "hidden sm:block" : "")}>
                <a
                  href={n.href}
                  className="label rounded-md px-2.5 py-2 text-muted-foreground transition hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ── hero: the 21st.dev Tilted Grid Hero streaming pages of the book ── */

function Hero() {
  return (
    <TiltedGridHero
      id="top"
      images={HERO_IMAGES}
      speed={3.6}
      tileHeight={28}
      axis={60}
      curve={78}
      fade={10}
      className="h-[100svh] min-h-[640px] w-full bg-background"
    >
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-center justify-between px-5 pb-10 pt-24 text-center md:px-10 md:pt-28">
        <div>
          <p className="label text-muted-foreground">Portfolio · México</p>
          <h1 className="mt-5 font-serif text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.92] tracking-[0.02em]">
            <span className="font-semibold">ROXANA</span>{" "}
            <em className="font-light">FADANELLI</em>
          </h1>
          <p className="mt-4 font-serif text-lg tracking-[0.12em] md:text-xl">
            <em className="font-light">ART DIRECTOR</em> &amp; <strong className="font-semibold">UI–UX</strong>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-balance text-muted-foreground md:text-left">
            Art director, graphic designer and product designer with about ten years in branding, UI/UX,
            digital experiences and creative direction.
          </p>
          <a
            href="#work"
            className="label group inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-primary-foreground transition hover:bg-foreground hover:text-background"
          >
            See the work
            <span aria-hidden className="transition group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </div>
    </TiltedGridHero>
  );
}

/* ── client strip ───────────────────────────────────────────────── */

function Clients() {
  return (
    <section aria-label="Clients and collaborators" className="border-y border-border bg-secondary/40">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 md:px-10">
        {CLIENTS.map((c) => (
          <span key={c} className="label text-secondary-foreground/70">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── statement ──────────────────────────────────────────────────── */

function Intro() {
  return (
    <section className="px-5 pt-24 md:px-10 md:pt-36">
      <Reveal className="mx-auto max-w-5xl">
        <p className="font-serif text-3xl leading-[1.2] tracking-tight md:text-5xl md:leading-[1.15]">
          I build brands and digital products that feel{" "}
          <em className="text-primary">crafted</em>, from luxury hospitality in Tulum to music streaming and
          museum experiences. Concept, identity, interface and image,{" "}
          <em className="text-primary">directed as one story</em>.
        </p>
      </Reveal>
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
