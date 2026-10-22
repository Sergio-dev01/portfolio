"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { allTech } from "@/content/tech";

export function TechMarquee() {
  return (
    <div className="relative border-y border-line bg-ink-2/40 py-5">
      <p className="sr-only">Tecnologie che uso: {allTech.map((t) => t.name).join(", ")}</p>
      <div aria-hidden="true">
      <InfiniteSlider gap={44} speed={38} speedOnHover={14}>
        {allTech.map(({ name, icon: Icon }) => (
          <span key={name} className="flex items-center gap-2.5 text-muted-foreground">
            <Icon className="size-5 text-lavender/80" />
            <span className="text-sm whitespace-nowrap">{name}</span>
          </span>
        ))}
      </InfiniteSlider>
      </div>
      <ProgressiveBlur className="pointer-events-none absolute inset-y-0 left-0 h-full w-24 sm:w-40" direction="left" blurIntensity={1} />
      <ProgressiveBlur className="pointer-events-none absolute inset-y-0 right-0 h-full w-24 sm:w-40" direction="right" blurIntensity={1} />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
