"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  /** Spostamento orizzontale dello sfondo, per l'effetto parallasse. */
  parallax?: MotionValue<number>;
  className?: string;
  sizes?: string;
};

/**
 * Immagine del progetto. Finché `project.image` è vuoto mostra un segnaposto
 * disegnato con i colori del progetto: basta aggiungere l'immagine in
 * src/content/site.ts per sostituirlo.
 */
export function ProjectVisual({ project, parallax, className, sizes }: Props) {
  const [a, b] = project.palette;
  const isPhone = project.slug === "mimo";

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-[1.75rem] border border-line bg-ink-2", className)}
    >
      {project.image ? (
        <motion.div className="absolute -inset-x-16 inset-y-0" style={{ x: parallax }}>
          <Image
            src={project.image}
            alt={`Schermata di ${project.title}`}
            fill
            sizes={sizes ?? "(min-width: 768px) 60vw, 100vw"}
            className="object-cover"
          />
        </motion.div>
      ) : (
        <>
          {/* sfondo colorato e griglia, si muovono con la parallasse */}
          <motion.div aria-hidden="true" className="absolute -inset-x-24 inset-y-0" style={{ x: parallax }}>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(60% 70% at 25% 30%, ${a}55, transparent 70%), radial-gradient(55% 60% at 80% 75%, ${b}66, transparent 70%), var(--ink-2)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
              }}
            />
            <span
              className="font-display absolute -bottom-[0.18em] left-6 text-[clamp(6rem,16vw,15rem)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap"
              style={{ color: `${a}2e` }}
            >
              {project.glyph}
            </span>
          </motion.div>

          {/* finestra stilizzata: browser o telefono */}
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-[8%]">
            {isPhone ? (
              <div className="relative aspect-[9/17] h-[88%] rounded-[2rem] border border-white/15 bg-ink/70 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <div className="mx-auto h-1.5 w-12 rounded-full bg-white/15" />
                <div className="mt-[30%] flex flex-col items-center gap-3">
                  <div
                    className="font-display rounded-xl border-2 px-4 py-1.5 text-xl font-bold"
                    style={{ borderColor: b, color: a, boxShadow: `0 0 18px ${b}88, inset 0 0 12px ${b}55` }}
                  >
                    mimo
                  </div>
                  <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                </div>
                <div className="absolute inset-x-4 bottom-6 h-8 rounded-full" style={{ background: a }} />
              </div>
            ) : (
              <div className="w-full max-w-[92%] overflow-hidden rounded-xl border border-white/12 bg-ink/65 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 h-4 w-1/3 rounded-full bg-white/8" />
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-3 p-4">
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 rounded-full" style={{ background: a }} />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-5/6 rounded-full bg-white/10" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] rounded-md"
                        style={{
                          background: i % 3 === 0 ? `linear-gradient(160deg, ${a}66, ${b}44)` : "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
