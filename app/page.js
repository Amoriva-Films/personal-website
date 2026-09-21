import Hero from '@/components/Hero';
import ContentSections from '@/components/ContentSections';
import Prozess from '@/components/Prozess';
import Bildband from '@/components/Bildband';
import LeistungenSection from '@/components/LeistungenSection';
import Testimonials from '@/components/Testimonials';
import BegrenztTermine from '@/components/BegrenztTermine';
import Founders from '@/components/Founders';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';

/* Reihenfolge nach dem Wechsel hell/dunkel:
   Hero dunkel, Film dunkel, Arbeit hell, Vertrauen hell, Bilder dunkel,
   Ablauf hell-2, Leistungen hell, Stimmen hell, Termine hell,
   Ueber uns hell-2, Fragen hell, Abschluss dunkel, Fuss dunkel. */

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSections />
      <Prozess />
      <Bildband />
      <LeistungenSection />
      <Testimonials />
      <BegrenztTermine />
      <Founders />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsApp />
    </>
  );
}
