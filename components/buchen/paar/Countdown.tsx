"use client";

import { useEffect, useState } from "react";

const zwei = (n: number) => String(n).padStart(2, "0");

/** Echter Countdown bis zum Hochzeitstag, sekundengenau. Keine Knappheits-Tricks, nur das Datum des Paares. */
export function Countdown({ ziel }: { ziel: string }) {
  const [jetzt, setJetzt] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setJetzt(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const ms = Math.max(0, new Date(ziel).getTime() - jetzt);
  const tage = Math.floor(ms / 864e5);
  const std = Math.floor(ms / 36e5) % 24;
  const min = Math.floor(ms / 6e4) % 60;
  const sek = Math.floor(ms / 1e3) % 60;
  return (
    <div className="countdown" aria-label={`Noch ${tage} ${tage === 1 ? "Tag" : "Tage"} bis zu eurem Tag`}>
      <div>
        <b>{tage}</b>
        <span>{tage === 1 ? "Tag" : "Tage"}</span>
      </div>
      <div>
        <b>{zwei(std)}</b>
        <span>Stunden</span>
      </div>
      <div>
        <b>{zwei(min)}</b>
        <span>Minuten</span>
      </div>
      <div aria-hidden="true">
        <b>{zwei(sek)}</b>
        <span>Sekunden</span>
      </div>
    </div>
  );
}
