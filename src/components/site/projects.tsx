"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectVisual } from "@/components/site/project-visual";
import { profile, projects, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
            link.label === "Demo"
              ? "bg-lavender text-ink hover:bg-white"
              : "border border-line bg-ink text-foreground hover:border-lavender/60",
          )}
        >
          {link.label === "Codice" ? <FaGithub className="size-4" /> : <ArrowUpRight className="size-4" />}
          {link.label === "Codice" ? "Vedi il codice" : "Apri la demo"}
          <span className="sr-only">di {project.title} (si apre in una nuova scheda)</span>
        </a>
      ))}
    </div>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground">
        {project.kind}, {project.year}
      </p>
      <h3 className="font-display mt-3 text-[clamp(2rem,3.4vw,3.4rem)] leading-none font-bold tracking-[-0.04em]">
        {project.title}
      </h3>
      <p className="mt-4 text-lg text-foreground">{project.tagline}</p>
      <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
      <ul className="mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.palette[0] }} />
            {h}
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologie usate">
        {project.stack.map((t) => (
          <li key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

/** Pannello della galleria: si ingrandisce al centro dello schermo e lo sfondo scorre in parallasse. */
function GalleryPanel({
  project,
  x,
  onCentered,
}: {
  project: Project;
  x: MotionValue<number>;
  onCentered: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const geo = useRef({ left: 0, width: 1, vw: 1440 });

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      geo.current = { left: ref.current.offsetLeft, width: ref.current.offsetWidth, vw: window.innerWidth };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Distanza del pannello dal centro dello schermo: 0 al centro, ±1 ai bordi.
  const offset = useTransform(x, (v) => {
    const { left, width, vw } = geo.current;
    return (left + v + width / 2 - vw / 2) / vw;
  });
  const parallax = useTransform(offset, (o) => o * -110);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 1) * 0.07);
  const opacity = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 1) * 0.45);

  useMotionValueEvent(offset, "change", (o) => {
    if (Math.abs(o) < 0.3) onCentered();
  });

  return (
    <motion.article
      ref={ref}
      style={{ scale, opacity }}
      aria-label={project.title}
      className="grid h-[min(74svh,720px)] w-[min(84vw,1180px)] shrink-0 grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 rounded-[2.25rem] border border-line bg-ink-2/50 p-5 backdrop-blur-sm lg:gap-12"
    >
      <ProjectVisual project={project} parallax={parallax} className="h-full" />
      <div className="flex flex-col justify-center overflow-y-auto py-4 pr-6 lg:pr-8">
        <ProjectInfo project={project} />
      </div>
    </motion.article>
  );
}

function DesktopGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.offsetWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(progress, (p) => -p * distance);

  return (
    <div
      ref={sectionRef}
      className="relative hidden md:block"
      // Lo scorrimento verticale disponibile è pari alla larghezza della galleria.
      style={{ height: distance ? `calc(${distance}px + 100svh)` : "600svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-10 pr-[8vw] pl-10">
          <div className="flex w-[min(38vw,520px)] shrink-0 flex-col justify-center pr-6">
            <h2
              id="progetti-title"
              className="font-display text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.98] font-bold tracking-[-0.045em]"
            >
              Cose che ho costruito.
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
              Dalle prime pagine in HTML alle web app con login e database. Continua a scorrere per vederli
              tutti.
            </p>
            <p className="mt-10 inline-flex items-center gap-3 text-sm text-lavender">
              <MoveRight className="size-5 animate-pulse" aria-hidden="true" />
              Scorri verso il basso
            </p>
          </div>

          {projects.map((project, i) => (
            <GalleryPanel key={project.slug} project={project} x={x} onCentered={() => setCurrent(i + 1)} />
          ))}

          <div className="flex w-[min(40vw,560px)] shrink-0 flex-col justify-center pl-6">
            <p className="font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.04em]">
              Il prossimo potrebbe essere il tuo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contatti"
                className="inline-flex h-12 items-center rounded-full bg-lavender px-6 font-medium text-ink transition-colors hover:bg-white"
              >
                Parliamone
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-lavender/60"
              >
                <FaGithub className="size-4" />
                Tutto il codice su GitHub
              </a>
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-x-10 bottom-8 flex items-center gap-5" aria-hidden="true">
          <span className="font-display w-14 text-sm text-muted-foreground tabular-nums">
            {String(current).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 bg-line">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-lavender" style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileList() {
  return (
    <div className="px-5 py-24 md:hidden">
      <h2 className="font-display text-[clamp(2.1rem,9vw,3rem)] leading-[1.02] font-bold tracking-[-0.04em]">
        Cose che ho costruito.
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        Dalle prime pagine in HTML alle web app con login e database.
      </p>
      <div className="mt-12 space-y-16">
        {projects.map((project) => (
          <article key={project.slug} aria-label={project.title}>
            <motion.div
              initial={{ scale: 0.94, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectVisual project={project} className="aspect-[4/3]" sizes="100vw" />
            </motion.div>
            <div className="mt-6">
              <ProjectInfo project={project} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="progetti" aria-labelledby="progetti-title" className="relative">
      <DesktopGallery />
      <MobileList />
    </section>
  );
}
