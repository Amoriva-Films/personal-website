import type { PaketId } from "@/lib/films-typen";

// Feste Auswahlwerte der Anfrage, gemeinsam für Formular (Browser) und Prüfung (Server).
// Titel wie die Pakete im Angebot (Foto, Komplett, Film), damit das Paar sie dort wiedererkennt.
export const WUENSCHE: Record<PaketId, { titel: string; kurz: string; text: string }> = {
  foto: { titel: "Foto", kurz: "Foto", text: "Sorgfältig bearbeitete Fotos vom ganzen Tag" },
  komplett: { titel: "Komplett", kurz: "Komplett, Foto und Film", text: "Foto und Film aus einer Hand, ein Team" },
  film: { titel: "Film", kurz: "Film", text: "Euer Hochzeitsfilm mit Ton von Trauung und Reden" },
};
/** Reihenfolge wie im Prototyp. */
export const WUNSCH_REIHENFOLGE: PaketId[] = ["foto", "komplett", "film"];
export const GAESTE = ["bis 50", "50 bis 100", "100 bis 150", "mehr als 150"] as const;
export const MAX_DATEN = 3;
/** „Wie habt ihr von uns erfahren?“ (optional). Landet in der Notiz des Paares. */
export const HERKUNFT = ["Instagram", "Google", "Empfehlung", "Hochzeitsmesse", "Location", "Sonstiges"] as const;
