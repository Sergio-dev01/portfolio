"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Download, Loader2, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { BorderBeam } from "@/components/ui/border-beam";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionHeading } from "@/components/site/section-heading";
import { SELECT_SERVICE_EVENT } from "@/components/site/services";
import { profile, whatsappHref } from "@/content/site";
import { contactSchema, topicLabel, topics, type TopicId } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "h-12 rounded-xl border-line bg-ink px-4 text-base md:text-base placeholder:text-muted-foreground/60 focus-visible:border-lavender focus-visible:ring-lavender/25";

function ContactForm() {
  const [topic, setTopic] = useState<TopicId>("lavoro");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  // "Chiedi un preventivo" nella sezione servizi preseleziona il motivo.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (topics.some((t) => t.id === id)) setTopic(id as TopicId);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...data, topic };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      if (res.status === 503) {
        // Invio via email non configurato: si apre l'app di posta con il messaggio già scritto.
        const subject = `Portfolio: ${topicLabel(parsed.data.topic)} da ${parsed.data.name}`;
        const body = `${parsed.data.message}\n\n${parsed.data.name}\n${parsed.data.email}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        toast("Si è aperta la tua app di posta con il messaggio già scritto: premi Invia per spedirlo.");
        setStatus("idle");
        return;
      }

      throw new Error(String(res.status));
    } catch {
      setStatus("idle");
      toast.error("Il messaggio non è partito. Riprova, oppure scrivimi su WhatsApp o via email.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2/70 p-6 backdrop-blur md:p-8">
      <BorderBeam size={180} duration={9} colorFrom="#bbaaff" colorTo="#7b5cff" borderWidth={1.5} />
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[460px] flex-col items-start justify-center"
            role="status"
          >
            <span className="grid size-12 place-items-center rounded-full bg-mint/15 text-mint">
              <Send className="size-5" />
            </span>
            <p className="font-display mt-6 text-2xl font-semibold">Messaggio inviato.</p>
            <p className="mt-3 max-w-sm text-muted-foreground">
              Ti rispondo il prima possibile all&apos;indirizzo che mi hai lasciato.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm text-lavender underline-offset-4 hover:underline"
            >
              Scrivi un altro messaggio
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-6"
          >
            <fieldset>
              <legend className="mb-3 text-sm text-muted-foreground">Di cosa vuoi parlarmi?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label
                    key={t.id}
                    className={cn(
                      "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lavender",
                      topic === t.id
                        ? "border-lavender bg-lavender text-ink"
                        : "border-line text-muted-foreground hover:border-lavender/50 hover:text-foreground",
                    )}
                  >
                    <input
                      type="radio"
                      name="topic-choice"
                      value={t.id}
                      checked={topic === t.id}
                      onChange={() => setTopic(t.id)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Come ti chiami"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nome@esempio.it"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Messaggio</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder={
                  topic === "lavoro"
                    ? "Raccontami della posizione e del team"
                    : "Raccontami del progetto: cosa ti serve, tempi e budget indicativo"
                }
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="min-h-36 rounded-xl border-line bg-ink px-4 py-3 text-base md:text-base placeholder:text-muted-foreground/60 focus-visible:border-lavender focus-visible:ring-lavender/25"
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            {/* campo trappola per i bot, nascosto alle persone */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
              <label htmlFor="company">Azienda</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lavender px-6 font-medium text-ink transition-colors hover:bg-white disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {status === "sending" ? "Invio in corso" : "Invia messaggio"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Indirizzo email copiato.");
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contatti" aria-labelledby="contatti-title" className="relative px-5 py-28 md:px-10 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[600px] bg-[radial-gradient(45%_55%_at_20%_100%,rgba(123,92,255,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div>
          <SectionHeading
            id="contatti-title"
            title="Scrivimi."
            intro="Hai una posizione aperta nel tuo team o un progetto da realizzare? Rispondo a tutti i messaggi."
          />

          <div className="mt-10 flex flex-col gap-3">
            <Magnetic intensity={0.2} range={110}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 w-full items-center gap-3 rounded-2xl border border-[#25d366]/40 bg-[#25d366]/10 px-5 font-medium text-foreground transition-colors hover:bg-[#25d366]/20 sm:w-auto"
              >
                <FaWhatsapp className="size-6 text-[#25d366]" />
                Scrivimi su WhatsApp
              </a>
            </Magnetic>

            <div className="flex items-center gap-2 rounded-2xl border border-line bg-ink-2/50 p-1.5 pl-5">
              <Mail className="size-5 shrink-0 text-lavender" aria-hidden="true" />
              <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate py-2.5 hover:text-lavender">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="grid size-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-ink-3 hover:text-foreground"
                aria-label="Copia l'indirizzo email"
              >
                <Copy className="size-4" />
              </button>
            </div>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-lavender/60"
              >
                <FaLinkedin className="size-4 text-lavender" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-lavender/60"
              >
                <FaGithub className="size-4 text-lavender" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.cv}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-lavender/60"
              >
                <Download className="size-4 text-lavender" /> Scarica il CV
              </a>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
