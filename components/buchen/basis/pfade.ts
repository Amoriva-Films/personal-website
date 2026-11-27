// Feste Adressen der Buchungsstrecke auf amoriva-films.de. Die Strecke läuft unter /anfrage (Entscheidung Nevio
// 27.11.2026, viele Links der Seite zeigen schon dorthin). Selfmade baut seine Links mit FILMS_BUCHEN_PFAD=/anfrage.
// Der Schlüssel steht immer im Fragment (#…) und erreicht so nie den Server über die Adresse.
export const BUCHEN_PFAD = "/anfrage";

export const PFADE = {
  start: BUCHEN_PFAD,
  paar: (schluessel: string) => `${BUCHEN_PFAD}/p#${schluessel}`,
  kennenlernen: (schluessel: string) => `${BUCHEN_PFAD}/kennenlernen#${schluessel}`,
  warteliste: (schluessel: string) => `${BUCHEN_PFAD}/warteliste#${schluessel}`,
} as const;
