"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionHeading } from "@/components/site/section-heading";
import { layers } from "@/content/tech";
import { cn } from "@/lib/utils";

const GAP = 78;
const TOP = 46;
const THICK = 14;

/** Disegnini sul piano di ogni strato, in un quadrato 100×100 proiettato in isometria. */
function Glyph({ id }: { id: string }) {
  switch (id) {
    case "interfaccia":
      return (
        <>
          <rect x="12" y="12" width="76" height="76" rx="5" />
          <line x1="12" y1="26" x2="88" y2="26" />
          <rect x="20" y="36" width="26" height="22" rx="3" />
          <rect x="54" y="36" width="26" height="22" rx="3" />
          <rect x="20" y="66" width="60" height="12" rx="3" />
        </>
      );
    case "logica":
      return (
        <>
          <path d="M22 22 L12 50 L22 78" />
          <path d="M78 22 L88 50 L78 78" />
          <line x1="32" y1="32" x2="64" y2="32" />
          <line x1="38" y1="44" x2="70" y2="44" />
          <line x1="38" y1="56" x2="58" y2="56" />
          <line x1="32" y1="68" x2="52" y2="68" />
        </>
      );
    case "dati":
      return (
        <>
          <rect x="14" y="14" width="72" height="72" rx="4" />
          <line x1="14" y1="32" x2="86" y2="32" />
          <line x1="14" y1="50" x2="86" y2="50" />
          <line x1="14" y1="68" x2="86" y2="68" />
          <line x1="40" y1="14" x2="40" y2="86" />
        </>
      );
    default:
      return (
        <>
          <line x1="20" y1="50" x2="80" y2="50" />
          <path d="M36 50 C 46 50, 46 26, 60 26 L 80 26" />
          <circle cx="20" cy="50" r="5" />
          <circle cx="50" cy="50" r="5" />
          <circle cx="80" cy="50" r="5" />
          <circle cx="80" cy="26" r="5" />
        </>
      );
  }
}

function StackIllustration({ active }: { active: number }) {
  // Si disegna dal basso verso l'alto, così lo strato superiore copre quelli sotto.
  const order = layers.map((l, i) => ({ ...l, i })).reverse();
  return (
    <svg viewBox="0 0 520 470" className="w-full" role="img" aria-label="Gli strati di un'applicazione web: interfaccia, logica e API, dati, strumenti">
      {order.map(({ id, title, i }) => {
        const y = TOP + i * GAP;
        const isActive = i === active;
        return (
          <motion.g
            key={id}
            animate={{ y: isActive ? -16 : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* lati dello spessore */}
            <polygon
              points={`50,${y + 86} 200,${y + 172} 200,${y + 172 + THICK} 50,${y + 86 + THICK}`}
              className={cn("transition-colors duration-500", isActive ? "fill-violet/70" : "fill-ink-3")}
            />
            <polygon
              points={`200,${y + 172} 350,${y + 86} 350,${y + 86 + THICK} 200,${y + 172 + THICK}`}
              className={cn("transition-colors duration-500", isActive ? "fill-violet/40" : "fill-line")}
            />
            {/* piano superiore */}
            <polygon
              points={`200,${y} 350,${y + 86} 200,${y + 172} 50,${y + 86}`}
              strokeWidth="1.5"
              className={cn(
                "transition-colors duration-500",
                isActive ? "fill-[#2a2058] stroke-lavender" : "fill-ink-2 stroke-[#3a3366]",
              )}
            />
            <g
              transform={`matrix(1.5 0.86 -1.5 0.86 200 ${y})`}
              fill="none"
              strokeWidth="1.6"
              className={cn("transition-all duration-500 [&>*]:[vector-effect:non-scaling-stroke]", isActive ? "stroke-lavender opacity-100" : "stroke-[#5b5390] opacity-70")}
            >
              <Glyph id={id} />
            </g>
            {/* etichetta */}
            <line
              x1="350"
              y1={y + 86}
              x2="380"
              y2={y + 86}
              className={cn("transition-colors duration-500", isActive ? "stroke-lavender" : "stroke-line")}
            />
            <text
              x="388"
              y={y + 91}
              className={cn(
                "font-display text-[15px] font-semibold transition-colors duration-500",
                isActive ? "fill-foreground" : "fill-muted-foreground",
              )}
            >
              {title}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

export function Stack() {
  const [active, setActive] = useState(0);

  return (
    <section id="competenze" aria-labelledby="competenze-title" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="competenze-title"
          title="Lavoro su tutti gli strati di un'applicazione."
          intro="Full stack vuol dire saper costruire ogni livello e farli parlare tra loro. Ecco cosa uso in ciascuno."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-28">
              <StackIllustration active={active} />
            </div>
          </div>

          <ol className="space-y-5">
            {layers.map((layer, i) => (
              <motion.li
                key={layer.id}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "relative rounded-2xl border p-6 transition-colors duration-500 md:p-8",
                  active === i ? "border-lavender/40 bg-ink-2" : "border-line bg-ink-2/40",
                )}
              >
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <h3 className="font-display text-2xl font-semibold tracking-tight">{layer.title}</h3>
                <p className="mt-3 max-w-[54ch] leading-relaxed text-muted-foreground">{layer.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {layer.tech.map(({ name, icon: Icon }) => (
                    <li
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-ink px-3 py-1.5 text-sm text-foreground"
                    >
                      <Icon className="size-4 text-lavender" aria-hidden="true" />
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
