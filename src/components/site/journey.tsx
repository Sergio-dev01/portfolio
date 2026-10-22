import { Timeline } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/site/section-heading";
import { journey } from "@/content/site";

export function Journey() {
  const data = journey.map((step) => ({
    title: step.period,
    content: (
      <div className="max-w-xl rounded-2xl border border-line bg-ink-2/50 p-6 md:p-8">
        <p className="text-sm text-lavender">{step.place}</p>
        <p className="font-display mt-2 text-xl font-semibold tracking-tight md:text-2xl">{step.title}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{step.text}</p>
        {step.tags && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {step.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));

  return (
    <section id="percorso" aria-labelledby="percorso-title" className="relative pt-4 pb-24 md:pt-8 md:pb-32">
      <Timeline
        data={data}
        header={
          <SectionHeading
            id="percorso-title"
            title="Il mio percorso fino a qui."
            intro="Dalla scuola tecnica al master full-stack, poi i primi progetti fatti da solo."
          />
        }
      />
    </section>
  );
}
