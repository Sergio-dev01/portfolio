import { z } from "zod";

export const topics = [
  { id: "lavoro", label: "Offerta di lavoro" },
  { id: "sito-vetrina", label: "Sito vetrina" },
  { id: "landing-page", label: "Landing page" },
  { id: "web-app", label: "Web app" },
  { id: "altro", label: "Altro" },
] as const;

export type TopicId = (typeof topics)[number]["id"];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Scrivi il tuo nome").max(80, "Il nome è troppo lungo"),
  email: z.email("Controlla l'indirizzo email"),
  topic: z.enum(topics.map((t) => t.id) as [TopicId, ...TopicId[]]),
  message: z
    .string()
    .trim()
    .min(10, "Scrivi almeno qualche parola in più")
    .max(3000, "Il messaggio supera i 3000 caratteri"),
  /** Campo trappola per i bot: le persone non lo vedono e lo lasciano vuoto. */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function topicLabel(id: TopicId) {
  return topics.find((t) => t.id === id)?.label ?? "Altro";
}
