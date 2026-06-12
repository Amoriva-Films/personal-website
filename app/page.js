import Hero from '@/components/Hero';
import ContentSections from '@/components/ContentSections';
import Prozess from '@/components/Prozess';
import LeistungenSection from '@/components/LeistungenSection';
import Testimonials from '@/components/Testimonials';
import BegrenztTermine from '@/components/BegrenztTermine';
import Founders from '@/components/Founders';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSections />
      <FadeIn><Prozess /></FadeIn>
      <FadeIn><LeistungenSection /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
      <FadeIn><BegrenztTermine /></FadeIn>
      <FadeIn><Founders /></FadeIn>
      <FadeIn><FAQ /></FadeIn>
      <FadeIn><FinalCTA /></FadeIn>
      <Footer />
      <WhatsApp />
    </>
  );
}
