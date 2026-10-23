/* Alle Texte der neuen Seite an einem Ort. Komponenten holen sich ihre
   Woerter nur von hier.

   Herkunft: die bisherigen, von Nevio und Danilo abgenommenen Texte der
   Live-Seite (Komponenten in components/), dazu der Claim aus dem Vault
   (00 Kontext/Branding) und Danilos Notizen im Figma-Board ("Wir sind
   ein Team"). Fehlt etwas, steht hier [TEXT FEHLT: ...] statt einer
   erfundenen Zeile.

   Schreibschrift-Akzent: das Wort in *Sternchen* setzt die Komponente
   <Titel> in Schreibschrift. */

export const marke = {
  name: 'Amoriva Films',
  telefon: '+49 155 6555 9747',
  telefonHref: 'tel:+4915565559747',
  mail: 'booking@amoriva-films.de',
  mailHref: 'mailto:booking@amoriva-films.de',
  whatsapp: 'https://wa.me/4915565559747?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Arbeit.',
  instagram: 'https://www.instagram.com/amorivafilms/',
  ort: 'Wolfsburg, Niedersachsen',
  sparte: 'Hochzeitsfilm und Fotografie',
};

export const navigation = [
  { label: 'Start', href: '/' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Vision', href: '/vision' },
  { label: 'Fragen', href: '/fragen' },
];

export const anfrage = { label: 'Anfrage', href: '/anfrage' };

export const kopf = {
  startseite: 'Amoriva Films, zur Startseite',
  menueAuf: 'Menü öffnen',
  menueZu: 'Menü schließen',
  menue: 'Menü',
};

export const intro = {
  ueberspringen: 'Überspringen',
};

export const hero = {
  label: 'Hochzeitsfilm & Hochzeitsfotografie',
  titel: 'Amoriva Films',
  unterzeile: 'Mit Sitz in Wolfsburg, für Hochzeiten auf der ganzen Welt.',
  scroll: 'Scroll',
};

export const arbeit = {
  // Positionierung (Danilo 22.10.2026): jung und kreativ, aber seit vier
  // Jahren in der Medienbranche. Eigener Look statt Standard. Freundschaftlich
  // und nah, jeder aus dem Team wird vorher persoenlich kennengelernt.
  // Runde 2 der Texte (22.10.2026): "Team Amoriva" statt zwei Namen, auf
  // Hochzeiten 3 bis 4 Leute. Der Titel beantwortet den Zweifel, den junge
  // Gesichter ausloesen. Konkret statt Werbesprech (Recherche: Paare scrollen
  // an Standardsaetzen vorbei, sie wollen sich den Tag mit euch vorstellen).
  // Aufbau nach Problem, Zuspitzung, Loesung (Danilo 22.10.2026: "da muss ein
  // Painpoint stehen, die Loesung kommt ganz unten"). Dieser erste Abschnitt
  // beschreibt nur das Problem der Paare, noch keine Werbung fuer uns.
  zeile: 'Kennt ihr das?',
  titel: 'Der Tag ist *vorbei,* bevor ihr ihn richtig erlebt habt.',
  links: 'Monatelang plant ihr jedes Detail, und dann rauscht der Tag an euch vorbei. Abends wisst ihr, dass es schön war, aber vieles habt ihr nur halb mitbekommen: die Rede eurer Trauzeugen, die Gesichter eurer Familie beim Ja-Wort, den Moment, in dem plötzlich alle getanzt haben.',
  rechts: 'Also sucht ihr jemanden, der genau das festhält, und merkt schnell, wie schwer das ist. Die Preise liegen weit auseinander, die Portfolios sehen sich ähnlich, und ob jemand am Tag selbst angenehm ist oder stört, erfahrt ihr meistens erst, wenn es zu spät ist.',
  // Ohne "z": das z der Schreibschrift (Pinyon) liest sich wie ein Schnoerkel
  unterschrift: 'Und genau das machen wir anders.',
  bild: { src: '/images/paare/paar-gehen.webp', alt: 'Ein Brautpaar geht Hand in Hand durch den Schlossgarten', b: 1024, h: 1536 },
  // Collage links und rechts vom Text (Vorbild "An Ode to your Memories"):
  // je ein grosses, blasses Bild und ein kleines, scharfes davor
  collage: {
    linksBlass: { src: '/images/Bild-5.webp', b: 2000, h: 3000 },
    linksScharf: { src: '/images/paare/paar-gehen.webp', alt: 'Ein Brautpaar geht Hand in Hand durch den Schlossgarten', b: 1024, h: 1536 },
    rechtsBlass: { src: '/images/paare/kronleuchter-v2.webp', b: 1600, h: 2400 },
    rechtsScharf: { src: '/images/hochzeit-4.jpg', alt: 'Brautpaar im Garten', b: 1333, h: 2000 },
  },
  knopf: 'Anfrage stellen',
};

// Grosser Satz in Versalien ueber einem Foto (Vorbild Blumen-Referenz im Board)
export const leitsatz = {
  label: 'Amoriva Films · Wolfsburg',
  // Haltung gegen den Einheitslook der Branche, ohne jemanden zu nennen
  text: 'Euer Film soll sich in zwanzig Jahren noch nach euch anfühlen und nicht nach dem Trend von damals.',
  bild: { src: '/images/hochzeit-2.jpg', alt: '' },
};

export const momente = {
  zeile: 'Aus unseren Hochzeiten',
  titel: 'Momente, die *bleiben.*',
  schrift: 'Momente, die bleiben',
  bilder: [
    { src: '/images/hochzeit-2.jpg', alt: 'Braut mit Brautstrauß', b: 1333, h: 2000 },
    { src: '/images/paare/paar-kuss.webp', alt: 'Ein Brautpaar küsst sich nach der Trauung, Schwarzweiß', b: 1600, h: 2400 },
    { src: '/images/hochzeit-1.jpg', alt: 'Brautpaar Stirn an Stirn unter dem Schleier', b: 1333, h: 2000 },
    { src: '/images/Bild-76.webp', alt: 'Braut unter einem Perlenschleier, Porträt', b: 2000, h: 3000 },
    { src: '/images/hochzeit-4.jpg', alt: 'Brautpaar im Garten, Ganzkörperaufnahme', b: 1333, h: 2000 },
    { src: '/images/paare/haende.webp', alt: 'Die Hände des Brautpaars, ineinander gelegt', b: 1600, h: 2400 },
    { src: '/images/hochzeit-3.jpg', alt: 'Brautpaar unter dem Schleier, Schwarzweiß', b: 1333, h: 2000 },
  ],
  link: 'Zu unserer Vision',
  // Kurztext rechts in Schreibmaschine (Vorbild Darcy McQueeny)
  // Greift die haeufigste Sorge vor dem Buchen auf (sich vor der Kamera
  // unwohl fuehlen) und sagt ehrlich, dass wir anleiten (Danilo 23.10.2026).
  notiz: 'Ihr steht ungern vor der Kamera? Das müsst ihr auch nicht allein können. Wir sagen euch, wo ihr hinsollt und wie nah ihr euch kommt; ihr müsst nur aufeinander achten.',
  // Blasse Handschrift im Hintergrund, wie ein alter Brief
  handschrift: 'Ein Blick, bevor ihr euch seht. Die Hand, die nicht loslassen will. Das Lachen eurer Liebsten, das Licht am Abend, der Tanz, der kein Ende findet. Alles davon bleibt.',
};

export const leistungen = {
  zeile: 'Leistungen',
  titel: 'Was wir für euch *tun* können.',
  untertitel: 'Film, Foto oder beides aus einer Hand',
  bild: { src: '/images/Bild-33.webp', alt: 'Brautpaar mit Champagner zwischen brennenden Kerzen', b: 2000, h: 3000 },
  pakete: [
    {
      titel: 'Hochzeitsfilm',
      unter: 'Cinégraphie aus Niedersachsen',
      text: 'Ein Film, der sich anfühlt wie Kino. Für Paare in Wolfsburg, Braunschweig, Hannover und ganz Deutschland.',
      inhalt: [
        'Hauptfilm in Cinégraphie (3 bis 12 Minuten)',
        'Emotionaler Highlights-Clip (60 bis 90 Sekunden)',
        'Vollständige Begleitung vom Morgen bis zum Abend',
        'Private Online-Galerie',
        'Soundtrack nach euren Wünschen',
      ],
    },
    {
      // Weiches Trennzeichen: bricht am Handy statt ueberzustehen (wie auf der alten Seite)
      titel: 'Hochzeits­fotografie',
      unter: 'Fine Art Fotografie Niedersachsen',
      text: 'Zeitlose Bilder im Fine-Art-Stil. Wo es hilft, leiten wir euch an; wo es gerade echt wird, halten wir uns raus.',
      inhalt: [
        'Vollständige Fotobegleitung vom Getting Ready bis zum Tanz',
        'Bearbeitete Galeriefotos in hoher Auflösung',
        'Private Online-Galerie zum Download',
        'Druckfreigabe inklusive',
      ],
    },
    {
      titel: 'Film und Foto',
      unter: 'Das komplette Hochzeitspaket',
      text: 'Beides aus einer Hand. Kein zweites Team, keine Koordination zwischen Anbietern.',
      inhalt: [
        'Alles aus Film und Fotografie-Paket',
        'Perfekte Abstimmung durch ein Team',
        'Einheitliche Bildsprache durch gesamten Content',
      ],
    },
  ],
  vertrauen: [
    { titel: 'Persönliche Beratung', text: 'Von Anfang bis Ende nur wir' },
    { titel: 'Datenschutz garantiert', text: 'Veröffentlichung nur nach eurer Freigabe' },
    { titel: 'Antwort innerhalb 24 Stunden', text: 'Auch per WhatsApp erreichbar' },
    { titel: 'International buchbar', text: 'Wir reisen dorthin, wo eure Hochzeit ist' },
  ],
  knopf: 'Anfrage stellen',
};

export const prozess = {
  zeile: 'So funktioniert es',
  titel: 'Von der ersten Nachricht bis zu *eurem* Film.',
  schritte: [
    { titel: 'Anfrage', text: 'Kurz per Formular oder WhatsApp. Keine Verpflichtung.' },
    { titel: 'Kennenlernen', text: 'Ihr lernt jeden kennen, der an eurem Tag dabei ist, persönlich oder per Video. Ohne Verkaufsgespräch.' },
    { titel: 'Eure Vision', text: 'Was euer Film erzählen soll. Kein Wort über Technik.' },
    { titel: 'Euer Tag', text: 'Wir sind den ganzen Tag da. Ohne zu stören, ohne Anweisungen.' },
    { titel: 'Film und Fotos', text: 'In sechs bis acht Wochen in eurer privaten Galerie.' },
  ],
  schritt: 'Schritt',
};

export const stimmen = {
  zeile: 'Das sagen unsere Paare',
  titel: 'Was danach *übrig* bleibt.',
  liste: [
    {
      zitat: 'Wir wollten eigentlich nur ein paar schöne Fotos vom Standesamt. Bekommen haben wir Bilder, die genau so aussehen wie sich der Tag angefühlt hat. Nichts gestellt, nichts gekünstelt. Wir schauen sie uns immer noch ständig an.',
      namen: 'Celine & Alex', art: 'Hochzeitsfotografie · 2026',
    },
    {
      zitat: 'Nevio und Danilo waren den ganzen Tag da und trotzdem haben wir sie kaum bemerkt. Als wir den Film dann gesehen haben, mussten wir beide weinen. Da war alles drin, sogar Momente, die wir selbst gar nicht mitbekommen hatten.',
      namen: 'Laura & Jakob', art: 'Hochzeitsfilm · 2026',
    },
    {
      zitat: 'Film und Fotos aus einer Hand war für uns die beste Entscheidung. Kein Abstimmen zwischen zwei Teams, einfach zwei Leute, die wussten was sie tun. Der Film und die Bilder passen perfekt zusammen und erzählen unseren Tag genau so, wie er war.',
      namen: 'Diana & Mattia', art: 'Hochzeitsfilm und Fotografie · 2026',
    },
  ],
  zurueck: 'Vorherige Stimme',
  weiter: 'Nächste Stimme',
};

export const termine = {
  zeile: 'Verfügbarkeit 2026 / 2027',
  titel: 'Noch ein paar *Termine* frei.',
  jahre: [
    { jahr: '2026', frei: 'Wenige Termine frei' },
    { jahr: '2027', frei: 'Buchung geöffnet' },
  ],
  hinweis: 'Jahr wählen und direkt anfragen',
};

export const gruender = {
  zeile: 'Über uns',
  titel: 'Wir sind *ein* Team.',
  leute: [
    {
      name: 'Nevio Mastrogiorgio',
      bio: 'Nevio steht genauso hinter der Kamera wie Danilo und ist vom ersten Gespräch an für euch da. Mit seiner ruhigen und klaren Art sorgt er dafür, dass ihr euch am Tag selbst sicher und vollkommen aufgehoben fühlt.',
      bild: '/images/nevio-v2.webp',
    },
    {
      name: 'Danilo Buonafede',
      bio: 'Danilo filmt und fotografiert mit demselben Anspruch und plant euren Tag von Anfang an mit. Mit seinem Gespür für Licht, Bewegung und echte Emotionen entstehen Momente, die euren Film später lebendig machen.',
      bild: '/images/danilo-v3.webp',
    },
  ],
  knopf: 'Mehr über uns',
};

export const brief = {
  zeile: 'Anfrage stellen',
  titel: 'Euer Tag verdient mehr als *schöne* Bilder.',
  text: 'Schreibt uns kurz, erzählt uns von eurem Tag, und wir schauen, ob wir zueinander passen. Ihr bekommt innerhalb von 24 Stunden eine ehrliche Antwort und lernt vor der Hochzeit jeden kennen, der mit der Kamera dabei ist. Ohne Druck und ohne Verkaufsgespräch.',
  knopf: 'Anfrage stellen',
  whatsapp: 'WhatsApp schreiben',
};

export const fuss = {
  claim: 'Eure Hochzeit ist mehr als ein Ablauf. Sie ist ein *Gefühl.*',
  bild: { src: '/images/paare/trauung-weit.webp', alt: '' },
  seiten: 'Seiten',
  kontakt: 'Kontakt',
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
  copyright: '© 2026 Amoriva Films',
  bilder: [
    { src: '/images/Bild-5.webp', alt: '' },
    { src: '/images/paare/kronleuchter-v2.webp', alt: '' },
    { src: '/images/paare/paar-wand-v2.webp', alt: '' },
    { src: '/images/hochzeit-3.jpg', alt: '' },
    { src: '/images/Bild-76.webp', alt: '' },
    { src: '/images/paare/haende.webp', alt: '' },
  ],
};

/* ── Unterseiten ─────────────────────────────────────────────────── */

export const seiteUeberUns = {
  meta: { titel: 'Über uns', text: 'Amoriva Films: ein junges Team mit italienischen Wurzeln aus Wolfsburg. Hochzeitsfilm und Fotografie im neuen Vintage, für Hochzeiten auf der ganzen Welt.' },
  label: 'Amoriva Films',
  titel: 'Über *uns*',
  bild: { src: '/images/paare/paar-wand-v2.webp', alt: '' },
  // Danilo, Runde 7: "Ich moechte jetzt ueber Amoriva, wofuer wir stehen."
  // Junges Team, Mediengestaltung, italienisch, neues Vintage, und das
  // Gegenteil von teuer, unzuverlaessig und stoerend.
  einleitungZeile: 'Wofür wir stehen',
  einleitungTitel: 'Neues *Vintage* aus Wolfsburg.',
  absaetze: [
    'Amoriva ist ein junges, ambitioniertes Team mit italienischen Wurzeln, zu Hause in Wolfsburg und unterwegs zu Hochzeiten auf der ganzen Welt. Gegründet haben es Nevio und Danilo; auf euren Hochzeiten sind wir meistens zu dritt oder zu viert. Seit vier Jahren arbeiten wir in der Medienbranche und wissen, wie Licht, Bild, Ton und Schnitt zusammenspielen müssen, damit am Ende ein Gefühl bleibt und nicht nur eine Aufnahme.',
    'Ehrlich gesagt hat uns vieles in der Branche gestört. Teure Pakete, bei denen am Ende zu wenig zurückkommt. Dienstleister, die sich tagelang nicht melden, unprofessionell auftreten oder am Hochzeitstag mehr im Weg stehen, als dass sie helfen. Wir wollten genau das Gegenteil sein.',
    'Bei uns bekommt ihr schnelle Antworten, klare Absprachen und ein Team, das am Tag selbst kaum auffällt und trotzdem alles mitbekommt. Was wir zusagen, liefern wir auch.',
    'Unser Stil ist neues Vintage: die Wärme alter Filme und Fotografien, so wie wir sie aus Italien kennen, verbunden mit moderner Technik und einem ruhigen, klaren Schnitt. Zeitlos, ohne altmodisch zu sein.',
  ],
  werte: [
    { titel: 'Professionell', text: 'Klare Absprachen, pünktlich und verlässlich' },
    { titel: 'Erreichbar', text: 'Antwort innerhalb von 24 Stunden' },
    { titel: 'Unauffällig', text: 'Wir begleiten euren Tag, ohne ihn zu stören' },
    { titel: 'Neues Vintage', text: 'Italienischer Flair, moderne Technik' },
  ],
};

export const seiteVision = {
  meta: { titel: 'Vision', text: 'Die Vision von Amoriva Films: Hochzeitsfilm und Fotografie, die sich anfühlen wie euer Tag.' },
  label: 'Amoriva Films',
  titel: 'Unsere *Vision*',
  video: '[VIDEO FOLGT: Vision-Film]',
  text: '[TEXT FEHLT: Vision-Text von Danilo]',
  // Vorstellung als Team (vorher auf der Startseite unter "Unsere Arbeit")
  teamZeile: 'Team Amoriva',
  teamTitel: 'Jung, ja. Aber nicht *neu* in dem, was wir tun.',
  teamAbsaetze: [
    'Hinter Amoriva steht ein kleines Team aus Wolfsburg. Seit vier Jahren arbeiten wir in der Medienbranche, haben für Unternehmen gedreht, geschnitten und ganze Social-Media-Auftritte betreut. Deshalb wissen wir ziemlich genau, wie ein Film aussehen und klingen muss, damit man ihn sich nicht nur einmal anschaut.',
    'Auf eurer Hochzeit sind wir meistens zu dritt oder zu viert. Und weil ihr uns an so einem Tag ganz nah an euch heranlasst, lernt ihr vorher jeden kennen, der dabei ist, persönlich oder per Video, wie es euch lieber ist. Am Tag selbst stehen dann Leute neben euch, mit denen ihr schon gelacht habt.',
  ],
  moodboardZeile: 'Moodboard',
  moodboardHinweis: '[BILDAUSWAHL FOLGT: Danilo wählt die Bilder]',
};

export const seiteFragen = {
  meta: { titel: 'Häufige Fragen', text: 'Antworten zu Hochzeitsfilm und Hochzeitsfotografie bei Amoriva Films: Ablauf, Lieferzeit, Vertrag, Reisen.' },
  label: 'Häufige Fragen',
  titel: 'Was ihr *wissen* wollt.',
  bild: { src: '/images/paare/kronleuchter-v2.webp', alt: '' },
  liste: [
    { frage: 'Was kostet ein Hochzeitsfilm bei euch?', antwort: 'Das hängt von eurem Tag ab. Wo findet die Hochzeit statt, was braucht ihr, wie lange soll der Film sein. Wir erstellen jedem Paar ein individuelles Angebot nach einem kurzen Gespräch. Schreibt uns einfach an.' },
    { frage: 'Wie lange dauert es bis wir den Film bekommen?', antwort: 'Innerhalb von 6 bis 8 Wochen nach eurer Hochzeit erhaltet ihr euren fertigen Film und alle Fotos in einer privaten Online-Galerie. Bei besonderen Terminwünschen sprechen wir das gerne vorab ab.' },
    { frage: 'Gibt es einen Vertrag und wie läuft die Bezahlung ab?', antwort: 'Ja. Nach der Anfrage erhaltet ihr von uns ein schriftliches Angebot und einen Vertrag. Eine Anzahlung sichert euren Termin. Den Restbetrag zahlt ihr nach der Hochzeit. Alles wird offen und transparent im Vorfeld besprochen.' },
    { frage: 'Seid ihr nur in Wolfsburg tätig?', antwort: 'Nein, wir filmen international. Wolfsburg ist unser Zuhause und bisher waren wir in ganz Deutschland unterwegs. Für eure Hochzeit reisen wir genauso nach Österreich, in die Schweiz oder nach Südeuropa. Wo es hingeht, schauen wir uns gemeinsam an, und die Anreise sprechen wir vorher offen ab.' },
    { frage: 'Wie viele Hochzeiten begleitet ihr pro Jahr?', antwort: 'Wir halten unsere Buchungen bewusst begrenzt. So bleibt jede Hochzeit eine Einzelanfertigung und keine Routine. Ihr arbeitet direkt mit uns und nicht mit einem großen Agenturteam das euch kurz vor der Hochzeit zum ersten Mal trifft.' },
    { frage: 'In welchem Format erhalten wir den Film und die Fotos?', antwort: 'Euer Film wird als hochauflösende Videodatei geliefert. Die Fotos erhaltet ihr in voller Auflösung mit Druckfreigabe. Alles landet in einer privaten Online-Galerie die ihr jederzeit aufrufen und mit Familie und Freunden teilen könnt.' },
  ],
};

export const seiteAnfrage = {
  label: 'Jetzt anfragen',
  titel: 'Beginnt mit eurer *Geschichte.*',
  bild: { src: '/images/paare/trauung-weit.webp', alt: '' },
};
