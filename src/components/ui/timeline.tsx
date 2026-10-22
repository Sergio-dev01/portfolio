"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

/*
 * Timeline di Aceternity UI, adattata al sito: intestazione passata da fuori,
 * colori della palette e altezza ricalcolata quando il contenuto cambia.
 */

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  header,
}: {
  data: TimelineEntry[];
  header?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      {header && <div className="mx-auto max-w-7xl px-5 pt-4 md:px-0">{header}</div>}

      <div ref={ref} className="relative mx-auto max-w-7xl pb-10">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-12 md:gap-10 md:pt-32">
            <div className="sticky top-32 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink">
                <div className="h-4 w-4 rounded-full border border-lavender/60 bg-ink-3 shadow-[0_0_12px_rgba(187,170,255,0.45)]" />
              </div>
              <h3 className="font-display hidden text-xl font-bold tracking-[-0.03em] text-muted-foreground md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-5 pl-20 md:pl-4">
              <h3 className="font-display mb-4 block text-left text-2xl font-bold text-muted-foreground md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-line to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-lavender from-[0%] via-violet via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
