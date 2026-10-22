"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  intro?: React.ReactNode;
  className?: string;
  id?: string;
};

/** Titolo di sezione: la riga si scopre dal basso quando entra nello schermo. */
export function SectionHeading({ title, intro, className, id }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2
        id={id}
        className="font-display overflow-hidden text-[clamp(2.1rem,5.4vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
      >
        <motion.span
          className="block"
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.span>
      </h2>
      {intro && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {intro}
        </motion.div>
      )}
    </div>
  );
}
