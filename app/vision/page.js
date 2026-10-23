import VisionInhalt from '@/components/vintage/VisionInhalt';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { seiteVision as s } from '@/content/texte';

/* Vision als eigene Seite (Board). Video und Text liefert Danilo noch,
   bis dahin klar markierte Platzhalter. */

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: { canonical: 'https://amoriva-films.de/vision' },
};

export default function Vision() {
  return (
    <>
      <main>
        <VisionInhalt />
      </main>
      <Fuss />
      <WhatsApp />
    </>
  );
}
