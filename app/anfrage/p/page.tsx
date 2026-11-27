import type { Metadata } from "next";
import { PaarSeite } from "@/components/buchen/paar/PaarSeite";

// Seite des Paares: /anfrage/p#<schlüssel>. Der Schlüssel steht nur im Fragment und geht so nie in Server-Protokolle
// oder den Verlauf von Zwischenstationen. Die Seite selbst ist statisch, die Daten holt sie per POST mit dem Schlüssel.
export const metadata: Metadata = {
  // absolute: das Layout von /anfrage setzt einen eigenen Titel, die Vorlage „… | Amoriva Films“ greift hier nicht
  title: { absolute: "Eure Seite · Amoriva Films" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  referrer: "no-referrer",
};

export default function Page() {
  return <PaarSeite />;
}
