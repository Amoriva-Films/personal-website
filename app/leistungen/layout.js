import { seiteLeistungen as s } from '@/content/texte';

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: {
    canonical: 'https://amoriva-films.de/leistungen',
  },
};

export default function LeistungenLayout({ children }) {
  return children;
}
