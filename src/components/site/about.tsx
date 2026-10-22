import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { SectionHeading } from "@/components/site/section-heading";
import { profile } from "@/content/site";

const facts = [
  { term: "Base", detail: "Bari, disponibile a trasferirmi" },
  { term: "Formazione", detail: "Master Full-Stack Development, Epicode (2025)" },
  { term: "Lingue", detail: "Italiano madrelingua, inglese intermedio" },
  { term: "Come lavoro", detail: "In squadra, con curiosità, rispettando le scadenze" },
];

export function About() {
  return (
    <section id="chi-sono" aria-labelledby="chi-sono-title" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        <div className="mx-auto w-full max-w-sm md:mx-0">
          <Tilt rotationFactor={8} springOptions={{ stiffness: 200, damping: 20 }} className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
              <Image
                src={profile.photo}
                alt="Ritratto di Maselli Sergio Francesco"
                fill
                sizes="(min-width: 768px) 380px, 90vw"
                className="object-cover object-top saturate-[0.85] transition duration-700 group-hover:saturate-100"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-violet/10" />
              <div className="absolute inset-x-5 bottom-5" style={{ transform: "translateZ(40px)" }}>
                <p className="font-display text-xl font-semibold">{profile.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">Full stack developer junior</p>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-violet/25 blur-3xl"
            />
          </Tilt>
        </div>

        <div>
          <SectionHeading id="chi-sono-title" title="Seguo un'idea dall'interfaccia al database." />
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Sono un full stack developer junior. Mi piace sviluppare applicazioni complete e curarne ogni
              passaggio: il design dell&apos;interfaccia e l&apos;esperienza di chi la usa, ma anche
              l&apos;architettura e la logica che lavorano dietro le quinte.
            </p>
            <p>
              Faccio attenzione alla qualità del codice, alla chiarezza delle interazioni e alla coerenza tra
              le parti del sistema. L&apos;obiettivo è sempre lo stesso: software affidabile, veloce e
              piacevole da usare.
            </p>
            <p className="text-foreground">
              Cerco un&apos;azienda in cui crescere accanto a professionisti più esperti, prendermi
              responsabilità reali e vedere il mio lavoro arrivare alle persone.
            </p>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.term} className="bg-ink px-5 py-4">
                <dt className="text-sm text-muted-foreground">{f.term}</dt>
                <dd className="mt-1 text-foreground">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
