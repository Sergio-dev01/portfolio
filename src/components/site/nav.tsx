"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Evidenzia la voce della sezione che occupa il centro dello schermo.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Navigazione principale"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border py-1.5 pr-1.5 pl-4 transition-colors duration-300",
          scrolled
            ? "border-line bg-ink/75 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-tight text-foreground"
          aria-label="Torna all'inizio"
        >
          sm<span className="text-lavender">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-lamp"
                    className="absolute inset-0 rounded-full bg-ink-3"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <span className="absolute -top-1.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-lavender shadow-[0_0_14px_4px_rgba(187,170,255,0.55)]" />
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href="#contatti"
            className="rounded-full bg-lavender px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            Scrivimi
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-foreground md:hidden"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-3xl font-semibold text-foreground"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
