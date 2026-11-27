/* Anschluss der Buchungsstrecke an Selfmade (27.11.2026).

   Die Seiten unter /anfrage laufen auf dieser Website, Daten und Logik
   liegen in Selfmade. Jeder Aufruf von /api/buchen/* geht serverseitig
   dorthin (app/api/buchen/[...pfad]/route.js). Der Waechter prueft mit
   denselben Werten, ob der Anschluss steht.

   FILMS_API_URL      Adresse von Selfmade, live https://selfmadedashboard.online.
                      Nur https, ausser http://127.0.0.1 und http://localhost
                      fuer lokale Tests.
   FILMS_EINGANG_TOKEN derselbe geheime Wert wie in Selfmade, mindestens 32
                      Zeichen. Nur damit glaubt Selfmade der mitgeschickten
                      Adresse und dem Browser des Paares (Bremsen,
                      Unterschrift, Widerruf). */

export const TOKEN_MIN = 32;

/** Basisadresse von Selfmade ohne Schraegstrich am Ende, oder null mit Grund. */
export function filmsBasis() {
  const roh = (process.env.FILMS_API_URL || '').trim();
  if (!roh) return { basis: null, grund: 'FILMS_API_URL ist nicht gesetzt.' };
  let url;
  try {
    url = new URL(roh);
  } catch {
    return { basis: null, grund: 'FILMS_API_URL ist keine gueltige Adresse.' };
  }
  const lokal = url.protocol === 'http:' && (url.hostname === '127.0.0.1' || url.hostname === 'localhost');
  if (url.protocol !== 'https:' && !lokal) {
    return { basis: null, grund: 'FILMS_API_URL muss mit https:// beginnen.' };
  }
  if (url.username || url.password || url.search || url.hash) {
    return { basis: null, grund: 'FILMS_API_URL darf keine Zugangsdaten, kein ? und kein # enthalten.' };
  }
  return { basis: `${url.origin}${url.pathname.replace(/\/+$/, '')}`, grund: '' };
}

/** Geheimer Token fuer Selfmade, oder null mit Grund. */
export function filmsToken() {
  const token = (process.env.FILMS_EINGANG_TOKEN || '').trim();
  if (!token) return { token: null, grund: 'FILMS_EINGANG_TOKEN ist nicht gesetzt.' };
  if (token.length < TOKEN_MIN) return { token: null, grund: `FILMS_EINGANG_TOKEN ist kuerzer als ${TOKEN_MIN} Zeichen.` };
  return { token, grund: '' };
}
