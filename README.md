# Portfolio di Maselli Sergio Francesco

Sito vetrina personale: Next.js 16, TypeScript, Tailwind CSS 4 e Motion, con componenti presi dalle librerie pubblicate su [21st.dev](https://21st.dev).

## Avvio in locale

```bash
npm install
npm run dev
```

Il sito si apre su <http://localhost:3000>.

| Comando         | Cosa fa                                                  |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Server di sviluppo con ricaricamento automatico          |
| `npm run build` | Build di produzione                                      |
| `npm run start` | Avvia la build di produzione                             |
| `npm run lint`  | Controllo del codice con ESLint                          |
| `npm run cv`    | Rigenera il PDF del CV da `cv/cv.html` (serve Chrome)    |

## Modificare i contenuti

Tutti i testi sono in due file:

- `src/content/site.ts`: profilo, contatti, progetti, servizi, fasi di lavoro e percorso.
- `src/content/tech.tsx`: tecnologie divise per strato (interfaccia, logica, dati, strumenti).

### Immagini dei progetti

Finché un progetto non ha un'immagine, il sito mostra un segnaposto animato con i colori del progetto. Per sostituirlo:

1. Salva la schermata in `public/progetti/`, per esempio `public/progetti/cinematheque.webp` (formato consigliato 16:10, larghezza almeno 1600 px).
2. In `src/content/site.ts` aggiungi al progetto `image: "/progetti/cinematheque.webp"`.

La parallasse e gli effetti funzionano anche con le immagini vere.

### Foto profilo

È in `public/sergio.png` (estratta dal vecchio CV). Per cambiarla, sostituisci il file mantenendo lo stesso nome, oppure aggiorna `profile.photo` in `src/content/site.ts`.

## Form contatti

Il form invia i messaggi con [Resend](https://resend.com), che ha un piano gratuito.

1. Crea un account su Resend e una chiave API.
2. Copia `.env.example` in `.env.local` e incolla la chiave in `RESEND_API_KEY`.
3. Riavvia `npm run dev`.

Senza chiave il form funziona lo stesso: apre l'app di posta del visitatore con il messaggio già scritto. Il bottone WhatsApp e l'indirizzo email sono sempre visibili come alternativa.

## CV

- Sorgente modificabile: `cv/cv.html` (testo normale in HTML, con i commenti per orientarsi).
- `npm run cv` rigenera `public/CV-Maselli-Sergio-Francesco.pdf`, il file scaricabile dal sito.

## Componenti di terze parti

Installati con la CLI di shadcn dai registry pubblici delle librerie originali, gli stessi pubblicati su 21st.dev:

| Componente                        | Libreria         | Dove si usa                          |
| --------------------------------- | ---------------- | ------------------------------------ |
| Background Paths                  | Kokonut UI       | Sfondo dell'hero                     |
| Text Scramble, Magnetic, Tilt     | Motion Primitives | Ruolo nell'hero, bottoni, foto       |
| Infinite Slider, Progressive Blur | Motion Primitives | Nastro delle tecnologie              |
| Glowing Effect                    | Aceternity UI    | Bordi luminosi di competenze e servizi |
| Timeline                          | Aceternity UI    | Sezione "Percorso"                   |
| Border Beam                       | Magic UI         | Riquadro del form contatti           |

Il registry di 21st.dev ora risponde solo agli utenti autenticati: con un account puoi installare altri componenti direttamente da lì, seguendo le istruzioni del sito.

## Pubblicazione

Il sito è pronto per [Vercel](https://vercel.com): pubblica il repository su GitHub, importalo su Vercel e aggiungi le variabili di `.env.example` nelle impostazioni del progetto.
