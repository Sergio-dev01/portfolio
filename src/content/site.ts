/**
 * Tutti i testi del sito stanno qui: per aggiornare progetti, servizi o
 * percorso basta modificare questo file.
 */

export const profile = {
  /** Cognome prima del nome, come in tutti i documenti. */
  name: "Maselli Sergio Francesco",
  lastName: "Maselli",
  givenNames: "Sergio Francesco",
  role: "Full stack developer",
  roles: [
    "Full stack developer",
    "Interfacce in React e Next.js",
    "Backend in Java e Spring Boot",
    "Database PostgreSQL",
  ],
  city: "Bari",
  email: "sergiomaselli1@gmail.com",
  /** Solo cifre, con prefisso internazionale: serve al link di WhatsApp. */
  whatsapp: "393701421598",
  whatsappMessage:
    "Ciao Sergio, ho visto il tuo portfolio e vorrei parlarti di un progetto.",
  github: "https://github.com/Sergio-dev01",
  linkedin: "https://www.linkedin.com/in/sergio-francesco-maselli/",
  talent: "https://talent.epicode.com/talent/ce9f78ef-ef37-4e51-a50a-0cb5d1dba1fb",
  cv: "/CV-Maselli-Sergio-Francesco.pdf",
  photo: "/sergio.png",
};

export const whatsappHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  profile.whatsappMessage,
)}`;

export const navLinks = [
  { href: "#chi-sono", label: "Chi sono" },
  { href: "#progetti", label: "Progetti" },
  { href: "#servizi", label: "Servizi" },
  { href: "#percorso", label: "Percorso" },
  { href: "#contatti", label: "Contatti" },
] as const;

export type ProjectLink = { label: "Codice" | "Demo"; href: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  /**
   * Immagine del progetto. Lascia `undefined` per il segnaposto animato,
   * oppure metti il file in /public/progetti e scrivi qui il percorso,
   * per esempio "/progetti/cinematheque.webp" (formato consigliato 16:10).
   */
  image?: string;
  /** Colori del segnaposto: due tinte che richiamano il progetto. */
  palette: [string, string];
  /** Una parola chiave mostrata in grande nel segnaposto. */
  glyph: string;
};

export const projects: Project[] = [
  {
    slug: "cinematheque",
    title: "Cinematheque",
    kind: "Web app full-stack",
    year: "2026",
    tagline: "Una cineteca online per scegliere cosa guardare stasera.",
    description:
      "Classici, cult, perle nascoste e nuove uscite in un unico catalogo, con watchlist, diario dei film visti, voti e recensioni. La sezione «Scopri per te» suggerisce il prossimo film partendo dai tuoi gusti.",
    highlights: [
      "Dati dei film da TMDB, letti solo lato server con cache e nuovi tentativi automatici",
      "Account, liste e recensioni su Supabase, con regole di sicurezza sul database",
      "Test unitari ed end-to-end con Vitest e Playwright",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Zod", "Playwright"],
    links: [{ label: "Codice", href: "https://github.com/Sergio-dev01/cinematheque" }],
    palette: ["#ffb35c", "#e0465b"],
    glyph: "Ciak",
  },
  {
    slug: "petbnb",
    title: "PetBnb",
    kind: "Progetto finale del master",
    year: "2025",
    tagline: "Strutture pet-friendly prenotabili online.",
    description:
      "Mette in contatto chi ha un animale domestico con host disposti a ospitarlo nella propria struttura. Backend e frontend scritti da zero, con un'architettura a moduli pensata per crescere.",
    highlights: [
      "Autenticazione con Spring Security e token JWT",
      "Due ruoli, utente e host, con permessi diversi",
      "Prenotazioni online con validazione dei dati lato server",
    ],
    stack: ["Java 17", "Spring Boot 3", "Spring Security", "PostgreSQL", "JPA / Hibernate", "React", "TypeScript", "Vite"],
    links: [{ label: "Codice", href: "https://github.com/Sergio-dev01/Capstone-PetBnb" }],
    palette: ["#5ee6c9", "#3d7bff"],
    glyph: "Bau",
  },
  {
    slug: "mimo",
    title: "Mimo!",
    kind: "App per smartphone (PWA)",
    year: "2026",
    tagline: "Il gioco del mimo per le serate in compagnia.",
    description:
      "Un telefono che passa di mano: da due a sei squadre, oltre 2200 parole che non si ripetono, timer e rubapalla quando il tempo scade. Si installa dal browser come un'app e funziona anche senza connessione.",
    highlights: [
      "Installabile e utilizzabile offline grazie al service worker",
      "Schermo sempre acceso durante il turno, vibrazione e suoni allo scadere del tempo",
      "Partite e punteggi salvati sul telefono, con annullamento dell'ultimo turno",
    ],
    stack: ["React", "Vite", "PWA", "Web Audio API", "Wake Lock API"],
    links: [{ label: "Demo", href: "https://mimo-app-lime.vercel.app" }],
    palette: ["#ff4fa3", "#3ee8ff"],
    glyph: "Via!",
  },
  {
    slug: "my-shop",
    title: "My Shop",
    kind: "E-commerce",
    year: "2026",
    tagline: "Il negozio online di un marchio di abbigliamento immaginario.",
    description:
      "Vetrina con carosello in homepage, catalogo prodotti a griglia e pagina di dettaglio per ogni capo. Navigazione tra le pagine gestita lato client.",
    highlights: [
      "Catalogo e scheda prodotto costruiti con componenti riutilizzabili",
      "Routing lato client con React Router",
      "Layout responsive pensato prima per lo smartphone",
    ],
    stack: ["React", "Vite", "React Router", "CSS"],
    links: [{ label: "Codice", href: "https://github.com/Sergio-dev01/my-shop" }],
    palette: ["#f2d4b6", "#b46a55"],
    glyph: "Saldi",
  },
  {
    slug: "linkedin-clone",
    title: "LinkedIn clone",
    kind: "Progetto di gruppo",
    year: "2025",
    tagline: "Il social del lavoro, ricostruito in una settimana in quattro.",
    description:
      "Profilo con esperienze modificabili, feed dei post, ricerca di offerte di lavoro e cambio della foto profilo, con i dati letti e scritti tramite API REST.",
    highlights: [
      "Stato globale con Redux Toolkit, salvato tra una visita e l'altra",
      "Lavoro in team su un'unica repository con Git e GitHub",
      "Interfaccia fedele all'originale con React Bootstrap",
    ],
    stack: ["React", "Redux Toolkit", "React Router", "React Bootstrap", "API REST"],
    links: [{ label: "Codice", href: "https://github.com/Sergio-dev01/BW3_Linkedin" }],
    palette: ["#5aa8ff", "#2b4dd8"],
    glyph: "in",
  },
  {
    slug: "youtube-clone",
    title: "YouTube clone",
    kind: "Uno dei primi progetti",
    year: "2025",
    tagline: "La home di YouTube riprodotta solo con HTML e CSS.",
    description:
      "Barra laterale, intestazione con ricerca e griglia dei video: un esercizio di layout per prendere confidenza con Flexbox e Grid.",
    highlights: ["Layout con Flexbox e CSS Grid", "Icone con Ionicons", "Nessuna libreria di interfaccia"],
    stack: ["HTML", "CSS"],
    links: [{ label: "Codice", href: "https://github.com/Sergio-dev01/YouTubeClone" }],
    palette: ["#ff6b6b", "#8a1c2b"],
    glyph: "Play",
  },
];

export type Service = {
  id: string;
  title: string;
  forWho: string;
  description: string;
  includes: string[];
  stack: string;
};

export const services: Service[] = [
  {
    id: "sito-vetrina",
    title: "Siti vetrina",
    forWho: "Per attività, professionisti e negozi",
    description:
      "Un sito di poche pagine che racconta chi sei, cosa offri e come trovarti. Veloce da aprire sul telefono e facile da trovare su Google.",
    includes: [
      "Progetto grafico su misura, niente template",
      "Pagine ottimizzate per i motori di ricerca",
      "Modulo contatti, mappa e collegamento a WhatsApp",
      "Messa online e dominio configurato",
    ],
    stack: "Next.js, Tailwind CSS",
  },
  {
    id: "landing-page",
    title: "Landing page",
    forWho: "Per lanci, eventi e campagne",
    description:
      "Una sola pagina costruita attorno a un obiettivo: farti contattare, raccogliere iscrizioni o vendere un prodotto.",
    includes: [
      "Testi e struttura pensati per far agire chi legge",
      "Animazioni curate, senza appesantire la pagina",
      "Moduli collegati alla tua email o al tuo CRM",
      "Statistiche delle visite",
    ],
    stack: "Next.js, Motion",
  },
  {
    id: "web-app",
    title: "Web app full-stack",
    forWho: "Per startup e aziende",
    description:
      "Applicazioni complete con accesso degli utenti, database e pannello di gestione: dalla prenotazione online al gestionale interno.",
    includes: [
      "Analisi delle funzioni e del modello dei dati",
      "Login, ruoli e permessi",
      "API REST documentate e database PostgreSQL",
      "Test automatici prima della consegna",
    ],
    stack: "React, Spring Boot o Supabase",
  },
];

export const workflow = [
  {
    title: "Ne parliamo",
    text: "Una chiamata per capire obiettivi, tempi e budget. Ti mando un preventivo chiaro, senza sorprese.",
  },
  {
    title: "Progetto",
    text: "Struttura delle pagine e grafica. Le approvi prima che scriva una riga di codice.",
  },
  {
    title: "Sviluppo",
    text: "Ti mando un link di anteprima che si aggiorna man mano, così vedi i progressi.",
  },
  {
    title: "Online",
    text: "Pubblico il sito, ti spiego come gestirlo e resto disponibile per le modifiche.",
  },
];

export type JourneyStep = {
  period: string;
  title: string;
  place: string;
  text: string;
  tags?: string[];
};

export const journey: JourneyStep[] = [
  {
    period: "2022 – 2024",
    title: "Diploma in Informatica e Telecomunicazioni",
    place: "IISS Volta De Gemmis, Bitonto",
    text: "Le basi tecniche: programmazione, gestione delle reti, sistemi operativi, sicurezza informatica e sviluppo software.",
    tags: ["Reti", "Sistemi operativi", "Sicurezza informatica"],
  },
  {
    period: "Feb – Ago 2025",
    title: "Master Full-Stack Development",
    place: "Epicode",
    text: "Sei mesi a tempo pieno, dal primo file HTML a un'applicazione completa con backend Java, database e frontend React. Un progetto consegnato ogni settimana e due build week in team.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React", "Redux", "TypeScript", "JWT"],
  },
  {
    period: "Ago 2025",
    title: "Progetto finale: PetBnb",
    place: "Epicode",
    text: "La prima applicazione full-stack progettata da solo, dall'analisi al database fino all'interfaccia.",
    tags: ["Spring Security", "JPA", "React"],
  },
  {
    period: "2026",
    title: "Progetti personali",
    place: "Da autodidatta",
    text: "Ho allargato il mio stack a Next.js, Supabase e ai test automatici con Cinematheque, e ho pubblicato Mimo, un gioco per smartphone che si installa come un'app.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Testing"],
  },
  {
    period: "Oggi",
    title: "Cerco il mio primo team",
    place: "Bari o dove serve",
    text: "Voglio lavorare accanto a sviluppatori più esperti, prendermi responsabilità vere e vedere il mio codice usato dalle persone.",
  },
];
