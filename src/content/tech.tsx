import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiSpringsecurity,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZod,
  SiBootstrap,
} from "react-icons/si";

export type Tech = { name: string; icon: IconType };

/** Gli strati di un'applicazione e le tecnologie che uso in ognuno. */
export const layers: {
  id: string;
  title: string;
  text: string;
  tech: Tech[];
}[] = [
  {
    id: "interfaccia",
    title: "Interfaccia",
    text: "Quello che vedi e tocchi. Componenti accessibili, animazioni misurate, layout che reggono dal telefono al monitor grande.",
    tech: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Redux", icon: SiRedux },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },
  {
    id: "logica",
    title: "Logica e API",
    text: "Le regole dell'applicazione. API REST chiare, autenticazione e ruoli, validazione dei dati prima che arrivino al database.",
    tech: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Spring Security", icon: SiSpringsecurity },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Zod", icon: SiZod },
    ],
  },
  {
    id: "dati",
    title: "Dati",
    text: "Dove le informazioni restano al sicuro. Modelli relazionali progettati a partire dalle esigenze, query SQL e ORM.",
    tech: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Hibernate", icon: SiHibernate },
    ],
  },
  {
    id: "strumenti",
    title: "Strumenti",
    text: "Quello che tiene insieme il lavoro: versionamento, test automatici e pubblicazione.",
    tech: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vite", icon: SiVite },
      { name: "Vitest", icon: SiVitest },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];

export const allTech: Tech[] = layers.flatMap((l) => l.tech);
