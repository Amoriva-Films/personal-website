import type { Metadata } from "next";
import { WartelisteSeite } from "@/components/buchen/warteliste/Warteliste";

// /anfrage/warteliste#<schlüssel>: Paar antwortet auf die Warteliste per Klick (weiter warten, absagen mit Grund,
// frei gewordenen Tag annehmen). Statisch: Der Schlüssel steht nur im Fragment und erreicht den Server nie über die Adresse.
export const metadata: Metadata = {
  title: { absolute: "Warteliste · Amoriva Films" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  referrer: "no-referrer",
};

export default function WartelistePage() {
  return <WartelisteSeite />;
}
