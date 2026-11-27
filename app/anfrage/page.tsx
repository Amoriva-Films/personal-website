import { Strecke } from "@/components/buchen/anfrage/Strecke";
import { KENNENLERNEN_DAUER_MIN } from "@/lib/films-typen";

// Einstieg der Paare: Datum prüfen und Anfrage (Stufe 1 und 2). Indexierbar, Metadaten aus dem Layout.
// Die Gesprächsdauer ist derselbe Wert wie in Selfmade (REGELN.dauerMin), damit beide Seiten dasselbe sagen.
export default function AnfragePage() {
  return <Strecke dauerMin={KENNENLERNEN_DAUER_MIN} />;
}
