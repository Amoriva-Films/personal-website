import FragenListe from '@/components/vintage/FragenListe';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { seiteFragen as s } from '@/content/texte';

/* Fragen als eigene Seite (Board: Unterseiten statt Onepager). */

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: { canonical: 'https://amoriva-films.de/fragen' },
};

export default function Fragen() {
  return (
    <>
      <main>
        <FragenListe liste={s.liste} label={s.label} titel={s.titel} bild={s.bild} einleitung={s.einleitung} abschlussTitel={s.abschlussTitel} abschluss={s.abschluss} />
      </main>
      <Fuss />
      <WhatsApp />
    </>
  );
}
