import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

// Grundbausteine der Buchungsstrecke im Look von amoriva-films.de (Klassen aus buchen.css).
// Bewusst ohne eigenen Zustand, nutzbar in Server- und Client-Komponenten.

type KnopfArt = "rand" | "hell" | "hell-voll" | "gruen";

function knopfKlasse(art: KnopfArt, voll: boolean, extra?: string) {
  return ["knopf", voll ? "voll" : "", art === "rand" ? "" : art, extra ?? ""].filter(Boolean).join(" ");
}

/** Runder Knopf mit Doppelrand und Punkten. Mit href als Link, sonst als button. */
export function Knopf({
  art = "rand",
  voll = true,
  href,
  beschaeftigt,
  className,
  children,
  ...rest
}: { art?: KnopfArt; voll?: boolean; href?: string; beschaeftigt?: boolean; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const klasse = knopfKlasse(art, voll, className);
  if (href) {
    const extern = /^https?:|^mailto:|^tel:/.test(href);
    if (extern) {
      return (
        <a className={klasse} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">
          {children}
        </a>
      );
    }
    return (
      <Link className={klasse} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={klasse} aria-busy={beschaeftigt || undefined} {...rest}>
      {children}
    </button>
  );
}

/** Kopf mit Wortmarke AMORIVA / FILMS mittig, optional „Zurück“ links oder ein Hinweis rechts. */
export function Kopf({ zurueck, rechts }: { zurueck?: { href?: string; onClick?: () => void }; rechts?: string }) {
  return (
    <header className="af-kopf">
      {zurueck?.href ? (
        <Link className="af-kopf-link" href={zurueck.href} style={{ left: "var(--rand)", right: "auto" }}>
          Zurück
        </Link>
      ) : zurueck?.onClick ? (
        <button type="button" className="af-kopf-link" onClick={zurueck.onClick} style={{ left: "var(--rand)", right: "auto" }}>
          Zurück
        </button>
      ) : null}
      {rechts ? <span className="af-kopf-link">{rechts}</span> : null}
    </header>
  );
}

/** Eingabefeld mit Versal-Beschriftung, wie im Anfrageformular. children ist das input, select oder textarea. */
export function Feld({ label, ungueltig, children, style }: { label: string; ungueltig?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <label className={`feld${ungueltig ? " ungueltig" : ""}`} style={style}>
      <span>{label}</span>
      {children}
    </label>
  );
}

/** Kleine Versal-Zeile in Khaki. */
export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="label" style={style}>
      {children}
    </p>
  );
}

/** Rahmen mit doppelter feiner Linie (statt Karte). */
export function Karte({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="karte" style={style}>
      {children}
    </div>
  );
}

/** Hinweis-Band mit Linie links. grau = ruhiger Ton (Warteliste). */
export function Band({ grau, children, style }: { grau?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className={`band${grau ? " grau" : ""}`} style={style}>
      {children}
    </div>
  );
}

/** Ladekreis mit Text, wie beim Prüfen des Datums. */
export function Lade({ label, titel, unter }: { label: string; titel: ReactNode; unter?: string }) {
  return (
    <div className="bahn mitte-in" role="status" aria-live="polite">
      <div className="lade" aria-hidden="true">
        <span />
      </div>
      <p className="label" style={{ marginTop: 28 }}>
        {label}
      </p>
      <h2 style={{ marginTop: 8 }}>{titel}</h2>
      {unter ? <p className="lade-datum">{unter}</p> : null}
    </div>
  );
}

/** Gezeichneter Haken (grün) oder ruhiges Fragezeichen (khaki). zeichnen = mit Animation. */
export function Haken({ art = "ok", zeichnen = true, klein }: { art?: "ok" | "frage"; zeichnen?: boolean; klein?: boolean }) {
  const klasse = ["haken", art === "frage" ? "ruhig" : "", zeichnen ? "zeichnen" : ""].filter(Boolean).join(" ");
  const groesse = klein ? { width: 46, height: 46, flex: "0 0 46px", margin: 0 } : undefined;
  return (
    <svg className={klasse} viewBox="0 0 96 96" aria-hidden="true" style={groesse}>
      <circle cx="48" cy="48" r="45" />
      {art === "ok" ? (
        <path d="M29 49l13 13 26-28" />
      ) : (
        <>
          <path d="M38 37C38 31 42.5 27 48 27C53.5 27 58 31 58 36C58 41.5 53 43 50 46C48.5 47.5 48 49.5 48 54" />
          <circle className="punkt" cx="48" cy="66" r="2.2" />
        </>
      )}
    </svg>
  );
}

/** Leiste für die drei Anfrage-Schritte. */
export function SchrittLeiste({ schritt, von = 3 }: { schritt: number; von?: number }) {
  return (
    <div className="schritt-leiste" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${von},minmax(0,1fr))` }}>
      {Array.from({ length: von }, (_, i) => (
        <span key={i} className={i < schritt ? "an" : undefined} />
      ))}
    </div>
  );
}

/** Abstand wie im Prototyp (30 px, oder eigene Höhe). */
export function Abstand({ hoehe }: { hoehe?: number }) {
  return <div className="abstand" style={hoehe ? { height: hoehe } : undefined} />;
}

/** Fehlerzeile unter einem Knopf, ruhig im Sand-Ton (nie Rot). */
export function Fehler({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <p className="fehler" role="alert">
      {text}
    </p>
  );
}

/** Fußzeile mit Wortmarke. */
export function Fuss({ children }: { children?: ReactNode }) {
  return <footer className="fuss">{children}</footer>;
}
