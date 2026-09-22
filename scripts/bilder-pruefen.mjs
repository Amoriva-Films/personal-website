/* Prueft, dass jede im Code genannte Datei aus public/ auch wirklich
   dort liegt.

   Warum es das braucht: next/image prueft Dateien in public/ NICHT zur
   Bauzeit. Ein Tippfehler oder eine geloeschte Datei faellt deshalb
   nicht beim Bauen auf, sondern erst live - der Bildoptimierer
   antwortet dann mit 400 und die Kachel bleibt leer.

   Genau das ist am 22.09.2026 passiert: beim Aufraeumen wurden zwei
   ungenutzte Bilder geloescht, und kurz darauf wurden dieselben beiden
   Dateinamen in die Portraet-Reihe geschrieben. Zwei von sieben
   Kacheln waren live kaputt, und niemand hat es beim Bauen gemerkt.

   Laeuft automatisch vor jedem Build (prebuild in package.json).      */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const UEBERSPRINGEN = new Set(['node_modules', '.next', '.git', 'public', '.vercel']);
const ENDUNGEN = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs']);
const MUSTER = /["'`](\/(?:images|videos|brand)\/[A-Za-z0-9/._-]+)["'`]/g;

function dateien(ordner, gesammelt = []) {
  for (const name of readdirSync(ordner)) {
    if (UEBERSPRINGEN.has(name)) continue;
    const pfad = join(ordner, name);
    if (statSync(pfad).isDirectory()) dateien(pfad, gesammelt);
    else if (ENDUNGEN.has(extname(name))) gesammelt.push(pfad);
  }
  return gesammelt;
}

const fehlend = [];
const gesehen = new Set();

for (const datei of dateien('.')) {
  const text = readFileSync(datei, 'utf8');
  for (const treffer of text.matchAll(MUSTER)) {
    const web = treffer[1];
    const schluessel = `${web}|${datei}`;
    if (gesehen.has(schluessel)) continue;
    gesehen.add(schluessel);
    if (!existsSync(join('public', web))) fehlend.push({ web, datei });
  }
}

if (fehlend.length > 0) {
  console.error(`\n  ${fehlend.length} Datei(en) werden im Code genannt, liegen aber nicht in public/:\n`);
  for (const { web, datei } of fehlend) console.error(`    ${web}\n      genannt in ${datei}`);
  console.error('\n  Entweder die Datei zurueckholen oder den Verweis entfernen.');
  console.error('  Zurueckholen aus der Historie:  git checkout <commit>^ -- public<Pfad>\n');
  process.exit(1);
}

console.log(`  Bilder geprueft: ${gesehen.size} Verweise, alle vorhanden.`);
