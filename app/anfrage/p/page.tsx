import type { Metadata } from "next";
import { PaarSeite } from "@/components/buchen/paar/PaarSeite";

// Seite des Paares: /anfrage/p#<schlüssel>. Der Schlüssel steht nur im Fragment und geht so nie in Server-Protokolle
// oder den Verlauf von Zwischenstationen. Die Seite selbst ist statisch, die Daten holt sie per POST mit dem Schlüssel.
export const metadata: Metadata = {
  title: "Eure Seite",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  referrer: "no-referrer",
};

export default function Page() {
  return <PaarSeite />;
}
