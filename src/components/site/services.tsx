"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Check, Plus } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionHeading } from "@/components/site/section-heading";
import { services, workflow } from "@/content/site";
import { cn } from "@/lib/utils";

/** Il form contatti ascolta questo evento per preselezionare il servizio. */
export const SELECT_SERVICE_EVENT = "portfolio:select-service";

function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mt-28">
      <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Come lavoriamo insieme</h3>
      <ol ref={ref} className="relative mt-10 grid gap-10 md:grid-cols-4 md:gap-8">
        <div aria-hidden="true" className="absolute top-5 right-0 left-5 hidden h-px bg-line md:block">
          <motion.div className="h-full origin-left bg-lavender" style={{ scaleX: fill }} />
        </div>
        {workflow.map((step, i) => (
          <li key={step.title} className="relative flex gap-5 md:block">
            <span className="font-display relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-lavender/50 bg-ink text-sm font-semibold text-lavender">
              {i + 1}
            </span>
            <div className="md:mt-6">
              <p className="text-lg font-medium text-foreground">{step.title}</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Services() {
  const [open, setOpen] = useState(services[0].id);

  const requestQuote = (id: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
  };

  return (
    <section id="servizi" aria-labelledby="servizi-title" className="relative px-5 py-28 md:px-10 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_60%_at_80%_0%,rgba(123,92,255,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <SectionHeading
              id="servizi-title"
              title="Cosa posso costruire per te."
              intro="Lavoro anche come freelance. Mi occupo di tutto, dal progetto alla messa online, e resti sempre in contatto diretto con chi scrive il codice."
            />
          </div>

          <ul className="space-y-3">
            {services.map((service) => {
              const isOpen = open === service.id;
              return (
                <li
                  key={service.id}
                  className={cn(
                    "relative rounded-2xl border transition-colors duration-300",
                    isOpen ? "border-lavender/35 bg-ink-2" : "border-line bg-ink-2/30 hover:bg-ink-2/70",
                  )}
                >
                  <GlowingEffect spread={44} disabled={false} proximity={56} inactiveZone={0.01} borderWidth={2} />
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? "" : service.id)}
                      aria-expanded={isOpen}
                      aria-controls={`servizio-${service.id}`}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
                    >
                      <span>
                        <span className="font-display block text-2xl font-semibold tracking-tight md:text-[2rem]">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-muted-foreground">{service.forWho}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                          isOpen ? "border-lavender bg-lavender text-ink" : "border-line text-foreground",
                        )}
                      >
                        <Plus className="size-5" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`servizio-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 md:px-8 md:pb-8">
                          <p className="max-w-[58ch] text-lg leading-relaxed text-foreground/90">{service.description}</p>
                          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {service.includes.map((item) => (
                              <li key={item} className="flex gap-3 text-muted-foreground">
                                <Check className="mt-0.5 size-4 shrink-0 text-lavender" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                            <p className="text-sm text-muted-foreground">Di solito con {service.stack}</p>
                            <a
                              href="#contatti"
                              onClick={() => requestQuote(service.id)}
                              className="inline-flex h-11 items-center rounded-full bg-lavender px-5 text-sm font-medium text-ink transition-colors hover:bg-white"
                            >
                              Chiedi un preventivo
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <ProcessSteps />
      </div>
    </section>
  );
}
