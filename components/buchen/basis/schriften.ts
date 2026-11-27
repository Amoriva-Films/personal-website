import localFont from "next/font/local";

// Schriften von amoriva-films.de, lokal aus dem Prototyp-Ordner kopiert. Kein fremder Server.
// Die Variablen werden in buchen.css als --display, --text und --schrift genutzt.

export const display = localFont({
  src: "./fonts/cormorant-garamond-normal-400-700.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--af-f-display",
});

export const kursiv = localFont({
  src: "./fonts/cormorant-garamond-italic-400-700.woff2",
  weight: "400 700",
  style: "italic",
  display: "swap",
  variable: "--af-f-kursiv",
});

export const text = localFont({
  src: "./fonts/jost-normal-300-700.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--af-f-text",
});

export const schrift = localFont({
  src: "./fonts/pinyon-script-normal-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--af-f-schrift",
});

export const schriftKlassen = [display.variable, kursiv.variable, text.variable, schrift.variable].join(" ");
