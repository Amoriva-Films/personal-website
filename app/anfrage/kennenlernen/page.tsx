import type { Metadata } from "next";
import { KennenlernenSeite } from "@/components/buchen/kennenlernen/Kennenlernen";

// /anfrage/kennenlernen#<schlüssel>: Paar wählt, verschiebt oder sagt das Kennenlernen ab.
// Statisch: Der Schlüssel steht nur im Fragment und erreicht den Server nie über die Adresse.
export const metadata: Metadata = {
  title: { absolute: "Kennenlernen · Amoriva Films" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  referrer: "no-referrer",
};

export default function KennenlernenPage() {
  return <KennenlernenSeite />;
}
