import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/content/site";
import { cacheLife } from "next/cache";

/** Anno corrente, calcolato in fase di build e aggiornato al massimo una volta al giorno. */
async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pt-16 pb-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p
          aria-hidden="true"
          className="font-display pointer-events-none text-[clamp(2.4rem,8.6vw,7.6rem)] leading-[0.9] font-extrabold tracking-[-0.05em] text-ink-3 select-none"
        >
          {profile.name}
        </p>
        <div className="mt-10 flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {profile.name}. Sito sviluppato da me con Next.js e Motion.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-lavender/60 hover:text-foreground"
            >
              <FaGithub className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-lavender/60 hover:text-foreground"
            >
              <FaLinkedin className="size-4" />
            </a>
            <a
              href="#top"
              className="ml-2 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 transition-colors hover:border-lavender/60 hover:text-foreground"
            >
              <ArrowUp className="size-4" />
              Torna su
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
