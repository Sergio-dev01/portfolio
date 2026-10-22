"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import { TextScramble } from "@/components/ui/text-scramble";
import { Magnetic } from "@/components/ui/magnetic";
import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Ogni lettera sale da sotto una maschera: è l'unico grande momento di ingresso del sito.
 * Il padding orizzontale (compensato dal margine negativo) evita che la maschera
 * tagli le lettere che sporgono per la spaziatura negativa, come la "o" finale.
 */
function RisingWord({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={cn("-mx-[0.12em] -mb-[0.14em] flex overflow-hidden px-[0.12em] pb-[0.2em]", className)} aria-hidden="true">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="font-display flex h-7 items-center gap-3 text-base font-medium whitespace-nowrap text-lavender sm:text-lg">
      <span className="h-px w-8 bg-lavender/60" aria-hidden="true" />
      {reduce ? (
        <span>{profile.role}</span>
      ) : (
        <TextScramble key={index} as="span" duration={0.7} speed={0.03}>
          {profile.roles[index]}
        </TextScramble>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <BackgroundPaths
      className="min-h-svh items-stretch justify-stretch bg-ink text-[#8f78ff] dark:bg-ink dark:text-[#8f78ff]"
      count={48}
      angle={-12}
      speed={0.8}
    >
      <section
        id="top"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pt-32 pb-14 text-foreground md:px-10 md:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-ink-2/70 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-mint" />
          </span>
          Disponibile per un lavoro o un progetto
        </motion.p>

        <h1
          aria-label={profile.name}
          className="font-display text-[clamp(3.4rem,14.5vw,12.5rem)] leading-[0.86] font-extrabold tracking-[-0.045em]"
        >
          <RisingWord text={profile.lastName} delay={0.15} />
          {/* nomi più piccoli del cognome, vanno a capo da soli sugli schermi stretti */}
          <span className="mt-[0.12em] flex flex-wrap gap-x-[0.3em] text-[clamp(2rem,7vw,6rem)] leading-[0.95] md:pl-[min(13vw,11rem)]">
            {profile.givenNames.split(" ").map((word, i) => (
              <RisingWord key={word} text={word} delay={0.45 + i * 0.25} />
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="max-w-xl"
          >
            <RotatingRole />
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Costruisco applicazioni web complete: l&apos;interfaccia che usi, le API che la fanno
              funzionare e il database che conserva i dati. Vivo a {profile.city} e sono disponibile a
              trasferirmi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic intensity={0.25} range={120}>
              <a
                href="#progetti"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-lavender px-6 font-medium text-ink transition-colors hover:bg-white"
              >
                Guarda i progetti
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic intensity={0.25} range={120}>
              <a
                href={profile.cv}
                download
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-ink-2/60 px-6 font-medium text-foreground backdrop-blur transition-colors hover:border-lavender/60"
              >
                <Download className="size-4" />
                Scarica il CV
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </BackgroundPaths>
  );
}
