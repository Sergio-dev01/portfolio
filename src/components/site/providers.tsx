"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Chi ha attivato "riduci movimento" nel sistema vede il sito senza animazioni.
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
            color: "var(--foreground)",
          },
        }}
      />
    </MotionConfig>
  );
}
