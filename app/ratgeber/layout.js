import { seiteRatgeber as s } from '@/content/texte';

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: {
    canonical: 'https://amoriva-films.de/ratgeber',
  },
};

export default function RatgeberLayout({ children }) {
  return children;
}
