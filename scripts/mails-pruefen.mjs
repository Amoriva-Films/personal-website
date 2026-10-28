/* Baut jede Mailvorlage einmal mit Beispieldaten. Wirft eine davon,
   bricht der Bau ab.

   Anlass, 21.10.2026: Beim Umbau von mailAnUns am 26.09. fiel die
   Hilfsfunktion kasten() heraus. mailAlarm und mailWaechter benutzten sie
   weiter und stuerzten fast vier Wochen lang ab, bevor sie verschickt
   wurden. Das fiel nicht auf, weil beide nur bei Stoerungen feuern - also
   genau dann, wenn man sie braucht. Der normale Versand lief, alle
   Pruefungen dieses Pfads waren gruen.

   Geprueft wird auch, dass jede Vorlage Betreff, HTML und Textfassung
   liefert und dass im Text keine HTML-Reste stehen. */
import { mailAnPaar, mailAnUns, mailAlarm, mailWaechter } from '../app/api/contact/mail.js';

const anfrage = {
  name: 'Lena & Thomas', email: 'lena.thomas@example.de', hochzeitsdatum: '2027-08-21',
  location: 'Schloss Wolfsburg', telefon: '+49 170 1234567', gaeste: '100 bis 150 Gäste',
  budget: 'Qualität geht vor Preis', vision: 'Zeile eins\nZeile zwei',
  nachricht: 'Telefon: +49 170 1234567\nGästeanzahl: 100 bis 150 Gäste',
};
const leer = { name: 'Nur Name', email: 'a@b.de' };
const wege = [{ name: 'Benachrichtigung an dich', ok: false, grund: 'Probe' }];

const faelle = [
  ['mailAnPaar', () => mailAnPaar(anfrage)],
  ['mailAnPaar (nur Pflicht)', () => mailAnPaar(leer)],
  ['mailAnUns', () => mailAnUns(anfrage)],
  ['mailAnUns (nur Pflicht)', () => mailAnUns(leer)],
  ['mailAlarm verloren', () => mailAlarm({ wege, anfrage, verloren: true })],
  ['mailAlarm halb', () => mailAlarm({ wege, anfrage, verloren: false })],
  ['mailWaechter', () => mailWaechter({ befunde: [{ was: 'Probe', text: 'Nur ein Test.' }] })],
];

const fehler = [];
for (const [name, bau] of faelle) {
  try {
    const m = bau();
    if (!m?.subject) fehler.push(`${name}: kein Betreff`);
    if (!m?.html || m.html.length < 200) fehler.push(`${name}: kein oder zu kurzes HTML`);
    if (!m?.text || !m.text.trim()) fehler.push(`${name}: keine Textfassung`);
    else if (/<[a-z][^>]*>|&[a-z]+;/i.test(m.text)) fehler.push(`${name}: HTML-Reste im Text`);
  } catch (e) {
    fehler.push(`${name}: ${e?.message || e}`);
  }
}

if (fehler.length) {
  console.error(`\n  ${fehler.length} Mailvorlage(n) kaputt:\n`);
  for (const f of fehler) console.error('    ' + f);
  console.error('');
  process.exit(1);
}
console.log(`  Mailvorlagen: alle ${faelle.length} Faelle laufen durch.`);
