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
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Vision', href: '/vision' },
  { label: 'Fragen', href: '/fragen' },
];

// Nur im Handy-Menue und im Fuss, nicht in der Kopfleiste (dort waere es zu
// voll). Der Ratgeber braucht trotzdem einen festen Link von jeder Seite,
// sonst gilt er fuer Google als unwichtig (Nevio 28.10.2026).
export const navigationMehr = [
  { label: 'Ratgeber', href: '/ratgeber' },
  { label: 'Hochzeitsfotograf Wolfsburg', href: '/hochzeitsfotograf-wolfsburg' },
  { label: 'Hochzeitsvideo Wolfsburg', href: '/hochzeitsvideo-wolfsburg' },
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
  // Start-Film (IntroFilm.jsx): Zeile ueber der Fassade, Entwurf 26.10.2026
  filmKlein: 'Amoriva Films',
  filmSchrift: 'Kapitel eins. Euer Tag.',
};

export const hero = {
  // Film und Fotografie gleich stark (Nevio 28.10.2026). Die Zeile gehoert zur H1.
  label: 'Hochzeitsfilm & Hochzeitsfotografie',
  titel: 'Amoriva Films',
  unterzeile: 'Mit Sitz in Wolfsburg, für Hochzeiten in ganz Europa.',
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
    // Neue Fotos (Nevio 26.10.2026): jedes Bild nur einmal auf der Seite
    linksBlass: { src: '/images/anzug-balkon.jpg', b: 1600, h: 2400 },
    linksScharf: { src: '/images/paare/paar-gehen.webp', alt: 'Ein Brautpaar geht Hand in Hand durch den Schlossgarten', b: 1024, h: 1536 },
    rechtsBlass: { src: '/images/kerzentisch.jpg', b: 1600, h: 2400 },
    rechtsScharf: { src: '/images/braut-schleier-garten.jpg', alt: 'Braut mit Schleier und Strauß im Schlossgarten', b: 1333, h: 2000 },
  },
  knopf: 'Anfrage stellen',
};

// Grosser Satz in Versalien ueber einem Foto (Vorbild Blumen-Referenz im Board)
export const leitsatz = {
  label: 'Amoriva Films · Wolfsburg',
  // Haltung gegen den Einheitslook der Branche, ohne jemanden zu nennen
  text: 'Euer Film soll sich in zwanzig Jahren noch nach euch anfühlen und nicht nach dem Trend von damals.',
  bild: { src: '/images/autofahrt.jpg', alt: 'Brautpaar lacht auf der Rückbank eines Oldtimers' },
};

export const momente = {
  zeile: 'Aus unseren Hochzeiten',
  titel: 'Momente, die *bleiben.*',
  schrift: 'Momente, die bleiben',
  // Paare gemischt, kein Paar dominiert, kein Bild doppelt (Nevio 26.10.2026).
  // 0 und 2 stehen gross in der Mitte, der Rest liegt verstreut (STREU in Momente.jsx).
  bilder: [
    { src: '/images/kuss-seifenblasen.jpg', alt: 'Brautpaar küsst sich im Schlosshof, Seifenblasen fliegen', b: 1600, h: 2400 },
    { src: '/images/hochzeit-1.jpg', alt: 'Brautpaar Stirn an Stirn unter dem Schleier', b: 1333, h: 2000 },
    { src: '/images/discokugel.jpg', alt: 'Brautpaar tanzt allein unter einer Discokugel', b: 1333, h: 2000 },
    { src: '/images/feigen-ring.jpg', alt: 'Ehering auf einer aufgeschnittenen Feige', b: 1333, h: 2000 },
    { src: '/images/schleier-klavier.jpg', alt: 'Braut unter dem Schleier am Flügel', b: 1333, h: 2000 },
    { src: '/images/Bild-76.webp', alt: 'Braut unter einem Perlenschleier, Porträt', b: 2000, h: 3000 },
    { src: '/images/hochzeit-3.jpg', alt: 'Brautpaar unter dem Schleier, Schwarzweiß', b: 1333, h: 2000 },
    { src: '/images/paare/haende.webp', alt: 'Die Hände des Brautpaars, ineinander gelegt', b: 1600, h: 2400 },
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
      unter: 'Fine-Art-Fotografie',
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
    { titel: 'Europaweit buchbar', text: 'Wir reisen dorthin, wo eure Hochzeit ist' },
  ],
  knopf: 'Anfrage stellen',
};

export const prozess = {
  zeile: 'So funktioniert es',
  titel: 'Von der ersten Nachricht bis zu *eurem* Film.',
  // Je Schritt ein kurzer Text und ein Link auf die passende Seite. Die Karte
  // zeigt immer nur den aktiven Schritt (Nevio 26.10.2026)
  schritte: [
    { titel: 'Anfrage', text: 'Schreibt uns kurz über das Formular oder per WhatsApp, wann und wo ihr heiratet und was ihr euch vorstellt. Das ist unverbindlich, ihr verpflichtet euch zu nichts.', link: { label: 'Zur Anfrage', href: '/anfrage' } },
    { titel: 'Kennenlernen', text: 'Bevor ihr bucht, lernt ihr jeden kennen, der an eurem Tag hinter der Kamera steht, persönlich oder per Video. Ohne Verkaufsgespräch, einfach um zu sehen, ob es passt.', link: { label: 'Wer wir sind', href: '/ueber-uns' } },
    { titel: 'Eure Vision', text: 'Gemeinsam sprechen wir darüber, was euer Film und eure Fotos erzählen sollen. Was ihr euch vorstellt, setzen wir um, ob erstes Morgenlicht oder Feier in Italien.', link: { label: 'Unsere Vision', href: '/vision' } },
    { titel: 'Euer Tag', text: 'Am Tag selbst sind wir von morgens bis abends da. Wo ihr unsicher seid, leiten wir euch an, sonst halten wir uns im Hintergrund, damit ihr eure Hochzeit wirklich erlebt.', link: { label: 'Häufige Fragen', href: '/fragen' } },
    { titel: 'Film und Fotos', text: 'Eure Fotos bekommt ihr in drei bis sechs Wochen, euren Film in sechs bis acht Wochen, beides in einer privaten Online-Galerie, in voller Auflösung zum Anschauen, Teilen und Aufheben.', link: { label: 'Jetzt anfragen', href: '/anfrage' } },
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
      name: 'Danilo Buonafede',
      bio: 'Danilo filmt und fotografiert mit demselben Anspruch und plant euren Tag von Anfang an mit. Mit seinem Gespür für Licht, Bewegung und echte Emotionen entstehen Momente, die euren Film später lebendig machen.',
      // Langfassung nur fuer Ueber uns (Nevio 26.10.2026, freigegeben); die Startseite nutzt bio
      // Test (Nevio 26.10.2026): auf Ueber uns als Plakat nach "About me"-Vorbild
      plakat: true,
      freigestellt: '/images/danilo-frei.png',
      bioLang: [
        'Danilo arbeitet seit vier Jahren in der Medienbranche und hat in dieser Zeit an ganz unterschiedlichen Projekten mitgearbeitet. Das merkt man heute an jedem Film: Er weiß, wie Licht fällt und in welchem Moment man einfach draufhalten muss, statt lange zu überlegen. Angekommen ist er in der Hochzeitscinégraphie. Hier hat er gefunden, was ihm am meisten Spaß macht, und das sieht man seinen Filmen an.',
        'Wer Danilo kennenlernt, lacht meistens schon nach ein paar Minuten. Wenn er eine Hochzeit filmen darf, ist er in seinem Element, gut gelaunt und voller Freude. Diese Laune bringt er mit an euren Tag, was gerade dann hilft, wenn sich die Kamera für euch noch ungewohnt anfühlt. Hinter der guten Stimmung steckt aber jemand, der sehr genau arbeitet: Während er mit euch scherzt, hat er längst im Blick, wo das Licht gleich am schönsten ist.',
      ],
      bild: '/images/danilo-v3.webp',
    },
    {
      // Entwurf (Nevio 23.10.2026: "denk dir erstmal irgendeinen Text aus"), noch nicht bestätigt.
      // Katharina macht die Bilder von Amoriva und steht in der Mitte zwischen den Gründern.
      name: 'Katharina Hieb',
      bio: 'Katharina fotografiert, was sie bewegt, und das ist fast alles: Menschen, Orte, Licht, Alltag und Feiern. Genau dieser weite Blick macht ihre Bilder lebendig. Sie arbeitet eng mit uns zusammen und hält fest, wie Amoriva aussieht und sich anfühlt.',
      // Langfassung nur fuer Ueber uns (Nevio 26.10.2026, freigegeben); die Startseite nutzt bio
      // Wie Danilo und Nevio, dritte Anordnung: Foto rechts, Name und Text links,
      // Katis Kamera zeigt in den Namen (Nevio 26.10.2026)
      plakat: 'rechts',
      freigestellt: '/images/kati-frei.png',
      bioLang: [
        'Kati fotografiert in ganz unterschiedlichen Bereichen, und genau diese Vielfalt bringt sie mit auf eure Hochzeit. Sie hält sich an kein festes Schema und entdeckt Motive oft dort, wo andere einfach vorbeilaufen. So entstehen Fotos mit einem Look, der so einzigartig ist wie eure Hochzeit.',
        'Für uns war Kati das letzte Puzzleteil. Mit ihr bekommt ihr Film und Fotos aus einem Team, das sich kennt und aufeinander eingespielt ist. Sie arbeitet mit einer Leidenschaft, die ansteckt, und hat ein Auge für Details, das man nicht lernen kann. Spätestens wenn ihr eure Bilder zum ersten Mal durchblättert, werdet ihr das sehen.',
      ],
      bild: '/images/katharina-hieb-v2.jpg',
    },
    {
      name: 'Nevio Mastrogiorgio',
      bio: 'Nevio steht genauso hinter der Kamera wie Danilo und ist vom ersten Gespräch an für euch da. Mit seiner ruhigen und klaren Art sorgt er dafür, dass ihr euch am Tag selbst sicher und vollkommen aufgehoben fühlt.',
      // Langfassung nur fuer Ueber uns (Nevio 26.10.2026, freigegeben); die Startseite nutzt bio
      // Test (Nevio 26.10.2026): wie Danilo (grosser blasser Name, Foto davor),
      // aber anders gesetzt: Name auf Hoehe des Laptops, Text darunter rechts
      plakat: 'unten',
      freigestellt: '/images/nevio-frei.png',
      bioLang: [
        'Mit Nevio sprecht ihr meistens als Erstes. Er beantwortet eure Fragen, hört genau hin, was euch wichtig ist, und behält die Absprachen im Blick, damit am Tag selbst nichts offen bleibt. Hinter der Kamera steht er trotzdem genauso wie Danilo. Gerade diese Mischung macht ihn aus: Wenn eure Hochzeit beginnt, kennt er sie schon ziemlich gut.',
        'Nevio ist der Ruhepol im Team. Wenn der Zeitplan wackelt oder jemand noch fehlt, bleibt er gelassen und findet eine Lösung, ohne dass ihr viel davon mitbekommt. Diese Ruhe überträgt sich, und ihr könnt euch auf das konzentrieren, worum es an dem Tag eigentlich geht: auf euch.',
      ],
      bild: '/images/nevio-v2.webp',
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
  // Vier lose Abzuege, keines davon steht sonst auf der Seite
  bilder: [
    { src: '/images/Bild-5.webp', alt: '' },
    { src: '/images/paare/kronleuchter-v2.webp', alt: '' },
    { src: '/images/hochzeit-4.jpg', alt: '' },
    { src: '/images/champagner.jpg', alt: '' },
  ],
};

/* ── Unterseiten ─────────────────────────────────────────────────── */

export const seiteUeberUns = {
  meta: { titel: 'Über uns', text: 'Amoriva Films: ein junges Team mit italienischen Wurzeln aus Wolfsburg. Hochzeitsfilm und Fotografie im neuen Vintage, für Hochzeiten in ganz Europa.' },
  label: 'Amoriva Films',
  titel: 'Über *uns*',
  // Gemaltes Team-Bild (Figma-KI, 26.10.2026), Kopf im gleichen Aufbau wie Fragen
  bild: { src: '/images/vintage/team-unterwegs.jpg', alt: 'Gemaltes Bild: Danilo, Kati und Nevio gehen in der Ferne durch ein Feld in der Toskana' },
  // Danilo, Runde 7: "Ich moechte jetzt ueber Amoriva, wofuer wir stehen."
  // Junges Team, Mediengestaltung, italienisch, neues Vintage, und das
  // Gegenteil von teuer, unzuverlaessig und stoerend.
  einleitungZeile: 'Wofür wir stehen',
  einleitungTitel: 'Neues *Vintage* aus Wolfsburg.',
  // Text neu aufgebaut (Nevio 23.10.2026): ohne "gegruendet von" und "zu dritt oder
  // zu viert"; Jung und kreativ, professionell, erreichbar, Team vorher persoenlich
  // kennenlernen, freundschaftliche Verbindung, Wohlfuehlen an einem intimen Tag.
  // Schreibregeln: Skill anti-ai-slop-writing. Unbestaetigtes (vier Jahre
  // Medienbranche, 24 Stunden) bewusst nicht im Text.
  absaetze: [
    'Amoriva ist ein junges, kreatives Team mit italienischen Wurzeln, zu Hause in Wolfsburg und unterwegs auf Hochzeiten in ganz Europa. Ja, wir sind jung, aber wir wissen ganz genau, was wir tun: Wir arbeiten professionell, halten klare Absprachen ein und antworten euch, bevor ihr anfangt zu zweifeln.',
    'Eine Hochzeit ist ein besonderer und sehr persönlicher Tag, und dass wir dabei sein dürfen, ist für uns keine Selbstverständlichkeit. Deshalb lernt ihr jeden aus unserem Team vorher kennen, bei einem Treffen oder per Video, wie es euch lieber ist. Dabei soll mehr entstehen als ein Termin im Kalender, nämlich ein freundschaftliches Verhältnis, in dem ihr euch wohlfühlt.',
    'Am Tag selbst stehen dann Menschen neben euch, mit denen ihr schon gelacht habt. Ihr müsst euch nicht verstellen und niemandem etwas beweisen. Wer sich wohlfühlt, sieht auf den Bildern später genau so aus.',
    'Unser Stil ist neues Vintage: die Wärme alter Filme und Fotografien, so wie wir sie aus Italien kennen, verbunden mit moderner Technik und einem ruhigen, klaren Schnitt. Zeitlos, ohne altmodisch zu sein.',
  ],
  werte: [
    { titel: 'Jung und kreativ', text: 'Frische Ideen und ein eigener Look statt Standard' },
    { titel: 'Professionell', text: 'Klare Absprachen, pünktlich und verlässlich' },
    { titel: 'Erreichbar', text: 'Antwort innerhalb von 24 Stunden' },
    { titel: 'Unauffällig', text: 'Wir begleiten euren Tag, ohne ihn zu stören' },
    { titel: 'Neues Vintage', text: 'Italienischer Flair, moderne Technik' },
    { titel: 'Schnelle Lieferung', text: 'Fotos in drei bis sechs Wochen, Film in sechs bis acht' },
  ],
};

export const seiteVision = {
  meta: { titel: 'Vision', text: 'Die Vision von Amoriva Films aus Wolfsburg: Hochzeitsfilm und Hochzeitsfotografie mit eigenem Look, für Paare in Niedersachsen, Deutschland und Südeuropa.' },
  label: 'Amoriva Films',
  titel: 'Unsere *Vision*',
  video: '[VIDEO FOLGT: Vision-Film]',
  // Vision-Text (Nevio 26.10.2026 freigegeben): Fliesstext aus Sicht der Paare,
  // mit allen Vorteilen und Orten fuer Google
  absaetze: [
    'Unsere Vision ist schnell erklärt: Jedes Paar soll Erinnerungen bekommen, die es so nur einmal gibt. Wenn ihr euren Hochzeitsfilm in ein paar Jahren wieder anschaut oder eure Hochzeitsfotos durchblättert, soll sich das nach euch anfühlen und nicht nach einem Stil, den man auf jeder zweiten Hochzeit sieht. Deshalb arbeiten wir mit einem eigenen Look, den man erkennt, bevor man unseren Namen liest, und der sich nicht einfach nachmachen lässt.',
    'Vielleicht kennt ihr die Sorge, dass am Ende genau die Momente fehlen, die euch wichtig waren, oder dass ihr euch vor der Kamera fremd fühlt. Bei uns lernt ihr jeden, der an eurem Tag filmt oder fotografiert, vorher persönlich kennen, und wo ihr unsicher seid, leiten wir euch an. Den Rest des Tages halten wir uns im Hintergrund, damit ihr eure Hochzeit wirklich erlebt. Film und Fotos kommen dabei aus einem Team, mit einem Look und einem Ansprechpartner, ohne dass ihr zwei Anbieter aufeinander abstimmen müsst.',
    'Was ihr euch vorstellt, setzen wir um. Ihr wollt euch im ersten Morgenlicht sehen, eure Trauung am See oder eure Feier in Italien? Dann finden wir einen Weg, statt nach Gründen zu suchen, warum es nicht geht. Unser Zuhause ist Wolfsburg, und wir begleiten Hochzeiten in Braunschweig, Hannover und ganz Niedersachsen genauso wie in ganz Deutschland, Österreich, der Schweiz und Südeuropa.',
    'Unsere italienischen Wurzeln sieht man unseren Bildern an: warm, zeitlos und mit einem Hauch Vintage, aber mit moderner Technik umgesetzt. Eure Fotos bekommt ihr in drei bis sechs Wochen, euren fertigen Hochzeitsfilm in sechs bis acht Wochen, beides in eurer privaten Online-Galerie, zum Anschauen, Teilen und Aufheben.',
  ],
  // Ueberschrift der Spalte, die aus der Kamera kommt (darin der Vision-Text)
  spalteZeile: 'Wofür wir stehen',
  spalteTitel: 'Erinnerungen, die es nur *einmal* gibt.',
  moodboardZeile: 'Moodboard',
};

export const seiteFragen = {
  meta: { titel: 'Häufige Fragen', text: 'Antworten zu Hochzeitsfilm und Hochzeitsfotografie bei Amoriva Films: Ablauf, Lieferzeit, Vertrag, Reisen.' },
  label: 'Häufige Fragen',
  titel: 'Was ihr *wissen* wollt.',
  // Gemaltes Toskana-Bild statt Paarfoto (Nevio 23.10.2026: Seite wirkte leer)
  bild: { src: '/images/vintage/landschaft-gemalt.webp', alt: '' },
  einleitung: 'Bevor ihr uns schreibt, habt ihr bestimmt ein paar Fragen. Die, die uns am häufigsten gestellt werden, beantworten wir hier ehrlich und ohne Kleingedrucktes.',
  abschlussTitel: 'Eure Frage ist *nicht* dabei?',
  abschluss: 'Dann schreibt uns einfach, per Formular oder WhatsApp. Wir antworten persönlich, nicht mit einem Textbaustein.',
  // Zwoelf Fragen (Nevio 26.10.2026), sortiert nach dem Weg eines Paares:
  // Anfragen, Kennenlernen, der Tag, das Ergebnis. Neu: Zeitpunkt, Kennenlernen,
  // Teamgroesse, Kamerascheu, Filmlaenge/Musik, Ausfall.
  liste: [
    { frage: 'Was kostet ein Hochzeitsfilm bei euch?', antwort: 'Ein Hochzeitsfilm beginnt bei uns ab 1.000 €, Hochzeitsfotografie für den ganzen Tag ab 850 € und Fotos im Standesamt ab 250 €. Was euer Tag genau kostet, hängt vom Aufwand ab: wie viele Stunden wir da sein sollen, wie lang euer Film wird und ob ihr ihn dokumentarisch oder gescriptet mit gespielten Szenen möchtet. Nach einem kurzen Gespräch bekommt ihr ein Angebot, das genau zu euch passt.' },
    { frage: 'Wie früh sollten wir anfragen?', antwort: 'Am besten, sobald Datum und Location feststehen. Weil wir die Zahl unserer Hochzeiten bewusst begrenzt halten, sind beliebte Samstage im Sommer oft früh vergeben. Kurzfristig lohnt sich eine Anfrage trotzdem, manchmal ist genau euer Termin noch frei.' },
    { frage: 'Gibt es einen Vertrag und wie läuft die Bezahlung ab?', antwort: 'Ja. Nach der Anfrage erhaltet ihr von uns ein schriftliches Angebot und einen Vertrag. Eine Anzahlung sichert euren Termin. Den Restbetrag zahlt ihr nach der Hochzeit. Alles wird offen und transparent im Vorfeld besprochen.' },
    { frage: 'Lernen wir euch vor der Hochzeit kennen?', antwort: 'Ja, und zwar jeden, der an eurem Tag filmt oder fotografiert. Wir treffen uns persönlich oder per Video, ganz ohne Verkaufsgespräch. Ihr sollt wissen, mit wem ihr den wichtigsten Tag verbringt, und wir wollen wissen, was euch als Paar ausmacht.' },
    { frage: 'Wie viele von euch sind am Tag dabei?', antwort: 'In der Regel sind wir zu dritt oder zu viert, je nachdem, ob ihr Film, Fotos oder beides bucht und wie groß eure Hochzeit ist. Alle gehören zu unserem festen Team und arbeiten eingespielt zusammen, ihr habt trotzdem nur einen Ansprechpartner.' },
    { frage: 'Wir stehen nicht gern vor der Kamera. Ist das ein Problem?', antwort: 'Überhaupt nicht. Beim Paarshooting leiten wir euch an, mit kleinen Aufgaben statt steifer Posen, und den Rest des Tages halten wir uns im Hintergrund. Nach ein paar Minuten vergessen die meisten, dass wir überhaupt da sind.' },
    { frage: 'Seid ihr nur in Wolfsburg tätig?', antwort: 'Nein, wir filmen europaweit. Wolfsburg ist unser Zuhause und bisher waren wir in ganz Deutschland unterwegs. Für eure Hochzeit reisen wir genauso nach Österreich, in die Schweiz oder nach Südeuropa. Wo es hingeht, schauen wir uns gemeinsam an, und die Anreise sprechen wir vorher offen ab.' },
    { frage: 'Wie lang wird unser Film und können wir die Musik mitbestimmen?', antwort: 'Euer Hauptfilm ist zwischen 3 und 12 Minuten lang. Die Musik wählen wir gemeinsam mit euch aus, damit der Film nach euch klingt. Habt ihr ein Lied, das euch viel bedeutet, sagt es uns einfach.' },
    { frage: 'Wie lange dauert es, bis wir Film und Fotos bekommen?', antwort: 'Eure Fotos bekommt ihr innerhalb von 3 bis 6 Wochen nach der Hochzeit, euren fertigen Film innerhalb von 6 bis 8 Wochen, beides in einer privaten Online-Galerie. Bei besonderen Terminwünschen sprechen wir das gerne vorab ab.' },
    { frage: 'In welchem Format erhalten wir den Film und die Fotos?', antwort: 'Euer Film wird als hochauflösende Videodatei geliefert. Die Fotos erhaltet ihr in voller Auflösung mit Druckfreigabe. Alles landet in einer privaten Online-Galerie, die ihr jederzeit aufrufen und mit Familie und Freunden teilen könnt.' },
    { frage: 'Was passiert, wenn jemand von euch krank wird?', antwort: 'Weil wir als Team arbeiten, hängt euer Tag nicht an einer einzelnen Person. Fällt jemand aus, springt jemand aus unserem Team ein, der eure Absprachen kennt. Ihr erfahrt es sofort von uns und müsst euch um nichts kümmern.' },
  ],
};

// Leistungen im Vintage-Design (Nevio 28.10.2026). Ersetzt /angebote (leitet
// hierher um). Erst ohne Preise, dann am selben Tag doch mit Startpreisen
// (Nevio 28.10.2026, siehe preise). Pakete und Ablauf kommen aus
// leistungen.pakete und prozess.schritte.
export const seiteLeistungen = {
  meta: { titel: 'Leistungen: Hochzeitsfilm & Fotografie', text: 'Hochzeitsfilm ab 1.000 €, Hochzeitsfotografie ab 850 €, Standesamt ab 250 €: was in jedem Paket steckt, wovon euer Angebot abhängt und wie der Ablauf ist. Aus Wolfsburg, europaweit.' },
  label: 'Leistungen',
  titel: 'Film, Foto oder *beides.*',
  // Weiterfuehrender Link je Paket (gleiche Reihenfolge wie leistungen.pakete)
  paketLinks: [{ label: 'Hochzeitsvideo in Wolfsburg', href: '/hochzeitsvideo-wolfsburg' }, { label: 'Hochzeitsfotograf in Wolfsburg', href: '/hochzeitsfotograf-wolfsburg' }, null],
  // Je Paket ein Bild, in derselben Reihenfolge wie leistungen.pakete
  bilder: [
    { src: '/images/Bild-101.webp', alt: 'Brautpaar am Hochzeitstisch vor einem roten Samtvorhang', b: 2000, h: 3000 },
    { src: '/images/paare/paar-wand-v2.webp', alt: 'Bräutigam lehnt an einer Säule, die Braut schaut zu ihm auf', b: 1600, h: 2400 },
    { src: '/images/paare/paar-kuss.webp', alt: 'Brautpaar kurz vor dem Kuss, Schwarzweiß', b: 1600, h: 2400 },
  ],
  einleitung: 'Hier seht ihr, was in jedem Paket steckt und ab welchem Preis es losgeht. Jede Hochzeit ist anders, deshalb bekommt ihr nach einem kurzen Gespräch ein Angebot, das genau zu eurem Tag passt.',
  // Startpreise (Nevio 28.10.2026). Reihenfolge wie besprochen.
  preiseZeile: 'Preise',
  preiseTitel: 'Womit ihr *rechnen* könnt.',
  preise: [
    { titel: 'Hochzeitsfilm', text: 'Begleitung eures Tages mit Film in Cinégraphie', preis: 'ab 1.000 €', ab: 1000 },
    { titel: 'Hochzeitsfotografie, ganzer Tag', text: 'Vom Getting Ready bis zum Tanz', preis: 'ab 850 €', ab: 850 },
    { titel: 'Fotos im Standesamt', text: 'Eure standesamtliche Trauung in Bildern', preis: 'ab 250 €', ab: 250 },
    { titel: 'Fotos für ein paar Stunden', text: 'Zum Beispiel Trauung und Paarshooting', preis: 'auf Anfrage' },
    { titel: 'Film und Foto aus einer Hand', text: 'Ein Team, ein Look, ein Ansprechpartner', preis: 'auf Anfrage' },
  ],
  // Preiskarte wie die Menuekarte eines alten Grandhotels (Preiskarte.jsx)
  preiseKarte: { kopf: 'Amoriva Films · Wolfsburg', titel: 'Preiskarte', saison: 'Saison 2026 · 2027', gruss: 'Danilo, Kati & Nevio' },
  preiseHinweis: 'Alle Preise sind Startpreise. Was euer Tag genau kostet, hängt vom Aufwand ab: wie viele Stunden wir da sind, wie lang euer Film wird und ob ihr ihn dokumentarisch oder gescriptet mit gespielten Szenen möchtet. Das besprechen wir offen, bevor ihr bucht.',
  angebotZeile: 'Euer Angebot',
  angebotTitel: 'Wovon euer Angebot *abhängt.*',
  angebotPunkte: [
    { titel: 'Film, Foto oder beides', text: 'Bucht ihr Film und Fotos zusammen, arbeitet ein eingespieltes Team mit einem Look, statt zwei Anbieter nebeneinander.' },
    { titel: 'Dauer der Begleitung', text: 'Wie viele Stunden wir da sein sollen: nur die Trauung im Standesamt oder der ganze Tag bis zum ersten Tanz.' },
    { titel: 'Art und Länge des Films', text: 'Dokumentarisch, wie euer Tag passiert, oder gescriptet mit gespielten Szenen. Und wie lang euer Film werden soll.' },
    { titel: 'Ort und Anreise', text: 'Wolfsburg, Braunschweig, Hannover oder eine Hochzeit irgendwo in Europa. Die Anreise sprechen wir vorher offen ab.' },
  ],
  ablaufZeile: 'Ablauf',
  ablaufTitel: 'In fünf *Schritten* zu eurem Film.',
  abschlussTitel: 'Erzählt uns von *eurem* Tag.',
  abschluss: 'Schreibt uns Datum, Ort und was ihr euch vorstellt. Wir melden uns persönlich und schicken euch nach einem kurzen Gespräch euer Angebot.',
};

// Stadtseite "Hochzeitsfotograf in Wolfsburg" (Nevio 28.10.2026: "krass pushen
// fuer Fotograf"). Nur Angaben, die auch sonst auf der Seite stehen. Die Orte
// sind Orte, an denen in Wolfsburg geheiratet wird, keine Behauptung, dass wir
// dort schon fotografiert haben.
export const seiteFotografWolfsburg = {
  meta: {
    titel: 'Hochzeitsfotograf in Wolfsburg',
    text: 'Hochzeitsfotograf in Wolfsburg: Fine-Art-Hochzeitsfotos vom Getting Ready bis zum ersten Tanz, ganzer Tag ab 850 €, Standesamt ab 250 €. Film auf Wunsch aus demselben Team.',
  },
  label: 'Hochzeitsfotograf Wolfsburg',
  titel: 'Hochzeitsfotograf in *Wolfsburg.*',
  einleitung: 'Wir sind Amoriva, ein junges Team aus Wolfsburg, und fotografieren Hochzeiten im Fine-Art-Stil: warm, zeitlos, mit einem Hauch Vintage. Den ganzen Tag begleiten wir euch ab 850 €, die standesamtliche Trauung ab 250 €, und wer zu den Fotos noch einen Film möchte, bekommt ihn vom selben Team.',
  fakten: [
    // Eckdaten: kurze Marke oben, Wert darunter (Nevio 29.10.2026: "cleaner")
    { text: 'Ganzer Tag', wert: 'ab 850 €' },
    { text: 'Standesamt', wert: 'ab 250 €' },
    { text: 'Fertig in', wert: '3–6 Wochen' },
    { text: 'Dazu buchbar', wert: 'Hochzeitsfilm' },
  ],
  bilder: [
    { src: '/images/Bild-76.webp', alt: 'Hochzeitsfotografie: Braut unter einem Perlenschleier, Porträt', b: 2000, h: 3000 },
    { src: '/images/kuss-seifenblasen.jpg', alt: 'Brautpaar küsst sich im Schlosshof, Seifenblasen fliegen', b: 1600, h: 2400 },
    { src: '/images/feigen-ring.jpg', alt: 'Detailfoto: Ehering auf einer aufgeschnittenen Feige', b: 1333, h: 2000 },
    { src: '/images/discokugel.jpg', alt: 'Brautpaar tanzt allein unter einer Discokugel', b: 1333, h: 2000 },
  ],
  stilZeile: 'Unser Stil',
  stilTitel: 'Fotos, die sich nach *euch* anfühlen.',
  stil: [
    'Wir fotografieren so, dass ihr euren Tag in zwanzig Jahren wiedererkennt: das Licht am Nachmittag, die Hand eurer Mutter auf eurem Arm, den Moment, in dem beim Tanz alle gleichzeitig lachen. Die Bilder bearbeiten wir warm und natürlich, ohne harte Filter, damit sie auch später nicht nach einem bestimmten Jahr aussehen.',
    'Vor der Kamera fühlen sich die meisten erst einmal ungewohnt an. Beim Paarshooting geben wir euch kleine Aufgaben statt steifer Posen, und während der Trauung und der Feier halten wir uns im Hintergrund. Kennenlernen werdet ihr uns vorher trotzdem, persönlich oder per Video, damit am Hochzeitstag niemand Fremdes hinter der Kamera steht.',
  ],
  inhaltTitel: 'Was in eurem *Paket* steckt.',
  inhalt: [
    'Fotobegleitung vom Getting Ready bis zum ersten Tanz',
    'Alle bearbeiteten Fotos in hoher Auflösung',
    'Private Online-Galerie zum Anschauen, Teilen und Herunterladen',
    'Druckfreigabe inklusive',
    'Persönliches Kennenlernen vor der Buchung',
    'Lieferung in drei bis sechs Wochen',
  ],
  orteZeile: 'In Wolfsburg und Umgebung',
  orteTitel: 'Wo in Wolfsburg *geheiratet* wird.',
  orteText: 'Ob ihr im Standesamt heiratet, im Schloss oder in einer Scheune draußen vor der Stadt: Wir kommen dorthin, wo eure Hochzeit stattfindet. Ein paar Orte, die Paare in Wolfsburg gern wählen:',
  orte: [
    { name: 'Schloss Wolfsburg', text: 'Renaissance-Schloss mit Park und Schlosshof, Trauungen sind direkt im Schloss möglich. Gegenüber liegen die Schlossremisen für die Feier.' },
    { name: 'Schloss Fallersleben', text: 'Kleines Schloss im Stadtteil Fallersleben mit Garten, beliebt für standesamtliche Trauungen im kleinen Kreis.' },
    { name: 'Autostadt', text: 'Moderne Kulisse am Mittellandkanal, mit dem Ritz-Carlton für Feiern und Hotelzimmer direkt vor Ort.' },
    { name: 'Allersee und Allerpark', text: 'Wasser, Wiesen und viel Himmel. Gut für ein Paarshooting am Abend, wenn das Licht weicher wird.' },
  ],
  umgebung: 'Genauso fotografieren wir in Braunschweig, Gifhorn, Wolfenbüttel, Helmstedt, Hannover und Celle, und für eure Hochzeit reisen wir auch durch ganz Europa.',
  fragenTitel: 'Häufige Fragen zum Hochzeitsfotografen in *Wolfsburg.*',
  fragen: [
    { frage: 'Was kostet ein Hochzeitsfotograf in Wolfsburg bei euch?', antwort: 'Für den ganzen Tag ab 850 €, für die standesamtliche Trauung ab 250 €. Wenn ihr nur ein paar Stunden braucht, zum Beispiel Trauung und Paarshooting, machen wir euch ein Angebot. Der genaue Preis hängt davon ab, wie lange wir dabei sein sollen und was ihr euch wünscht.' },
    { frage: 'Fotografiert ihr auch nur das Standesamt?', antwort: 'Ja. Viele Paare heiraten erst standesamtlich im kleinen Kreis und feiern später. Für die Trauung im Standesamt mit ein paar Bildern davor und danach beginnen wir ab 250 €.' },
    { frage: 'Kommt ihr auch nach Braunschweig, Gifhorn oder Hannover?', antwort: 'Ja, Wolfsburg ist nur unser Zuhause. Wir fotografieren in ganz Niedersachsen und reisen für Hochzeiten durch ganz Europa. Die Anreise sprechen wir vorher offen mit euch ab.' },
    { frage: 'Können wir zu den Fotos auch einen Hochzeitsfilm buchen?', antwort: 'Ja, Film und Fotos kommen bei uns aus einem Team. Ihr habt einen Ansprechpartner, und Bilder und Film passen im Look zusammen, statt dass zwei Anbieter nebeneinander arbeiten.' },
    { frage: 'Wann sollten wir anfragen?', antwort: 'Sobald Datum und Location feststehen. Beliebte Samstage im Sommer sind oft früh vergeben, eine kurzfristige Anfrage lohnt sich aber trotzdem.' },
  ],
  abschlussTitel: 'Erzählt uns von *eurem* Tag.',
  abschluss: 'Schreibt uns Datum und Ort eurer Hochzeit. Wir melden uns persönlich und sagen euch ehrlich, ob wir an dem Tag noch frei sind.',
};

// Stadtseite "Hochzeitsvideo in Wolfsburg" (Nevio 29.10.2026). Gegenstueck zur
// Fotograf-Seite, aber auf "Hochzeitsvideo" ausgerichtet; die Startseite bleibt
// bei "Hochzeitsfilm" (Platz 2 bei Google), damit sich beide nicht im Weg stehen.
// Nur Angaben, die auch sonst auf der Seite stehen.
export const seiteVideoWolfsburg = {
  meta: {
    titel: 'Hochzeitsvideo in Wolfsburg',
    text: 'Hochzeitsvideo in Wolfsburg: euer Hochzeitsfilm in Cinégraphie ab 1.000 €, 3 bis 12 Minuten lang, dokumentarisch oder mit Drehbuch, fertig in 6 bis 8 Wochen.',
  },
  label: 'Hochzeitsvideo Wolfsburg',
  titel: 'Hochzeitsvideo in *Wolfsburg.*',
  einleitung: 'Wir sind Amoriva, ein junges Team aus Wolfsburg, und machen aus eurem Hochzeitsvideo einen Film, der sich anfühlt wie Kino. Euer Hauptfilm ist 3 bis 12 Minuten lang, und nach sechs bis acht Wochen liegt er in eurer privaten Online-Galerie. Los geht es ab 1.000 €, und wer zum Film noch Fotos möchte, bekommt sie vom selben Team.',
  fakten: [
    // Eckdaten: kurze Marke oben, Wert darunter (Nevio 29.10.2026: "cleaner")
    { text: 'Preis', wert: 'ab 1.000 €' },
    { text: 'Hauptfilm', wert: '3–12 Minuten' },
    { text: 'Fertig in', wert: '6–8 Wochen' },
    { text: 'Dazu buchbar', wert: 'Fotos' },
  ],
  stilZeile: 'Unser Stil',
  stilTitel: 'Dokumentarisch oder mit *Drehbuch.*',
  stil: [
    'Ein Hochzeitsvideo kann zwei Dinge sein. Dokumentarisch heißt, wir begleiten euren Tag so, wie er passiert, und fangen die Momente ein, die man nicht planen kann: den Blick beim Einzug, das Lachen bei den Reden, die Hand eures Vaters auf eurer Schulter. Gescriptet heißt, wir überlegen vorher gemeinsam eine Idee, schreiben ein kleines Drehbuch und drehen ein paar Szenen, die ihr mit uns spielt.',
    'Die meisten Paare nehmen eine Mischung aus beidem. Weil bei uns immer mindestens zwei filmen, entgeht euch dabei nichts, auch wenn an zwei Stellen gleichzeitig etwas passiert, und die Musik sucht ihr mit uns aus, damit der Film nach euch klingt.',
  ],
  // Drehplan als Drehbuchblatt (Drehplan.jsx). Ein Beispieltag, kein fester Ablauf.
  drehplanZeile: 'So kann euer Drehtag aussehen',
  drehplanTitel: 'Euer *Drehplan.*',
  klappe: [
    { feld: 'Produktion', wert: 'Eure Hochzeit' },
    { feld: 'Ort', wert: 'Wolfsburg' },
    { feld: 'Datum', wert: 'Euer Tag' },
    { feld: 'Format', wert: 'Cinégraphie' },
  ],
  szenen: [
    { zeit: '10:00', titel: 'Getting Ready', text: 'Kleid, Anzug, Ringe und die letzten nervösen Minuten' },
    { zeit: '13:00', titel: 'Trauung', text: 'Einzug, Ja-Wort und die ersten Glückwünsche' },
    { zeit: '15:00', titel: 'Paarshooting', text: 'Eine halbe Stunde nur für euch zwei' },
    { zeit: '18:00', titel: 'Dinner und Reden', text: 'Eure Gäste, die Reden und die kleinen Details am Tisch' },
    { zeit: '21:00', titel: 'Erster Tanz', text: 'Und alles, was danach auf der Tanzfläche passiert' },
  ],
  drehplanFuss: 'Beispiel. Euren eigenen Drehplan schreiben wir beim Kennenlernen gemeinsam.',
  inhaltTitel: 'Was in eurem *Paket* steckt.',
  // Paket als Kino-Abspann: Rolle links, Inhalt rechts (Nevio 29.10.2026)
  inhalt: [
    { rolle: 'Hauptfilm', wert: '3 bis 12 Minuten in Cinégraphie' },
    { rolle: 'Begleitung', wert: 'Vom Morgen bis zum Abend' },
    { rolle: 'Kennenlernen', wert: 'Persönlich, vor der Buchung' },
    { rolle: 'Soundtrack', wert: 'Nach euren Wünschen' },
    { rolle: 'Galerie', wert: 'Privat, zum Anschauen und Teilen' },
    { rolle: 'Premiere', wert: 'In sechs bis acht Wochen' },
  ],
  inhaltPreis: 'ab 1.000\u00a0€',
  orteZeile: 'In Wolfsburg und Umgebung',
  orteTitel: 'Wo euer Film *spielen* kann.',
  orteText: 'Wir kommen dorthin, wo ihr heiratet. Ein paar Orte in Wolfsburg, die im Film jeweils ganz anders wirken:',
  orte: [
    { name: 'Schloss Wolfsburg', text: 'Der Schlosshof mit seinen Arkaden gibt eurem Film sofort einen Rahmen, und getraut werden könnt ihr direkt im Schloss.' },
    { name: 'Schloss Fallersleben', text: 'Klein und ruhig, gut für eine standesamtliche Trauung im engsten Kreis, bei der es auf jedes Wort ankommt.' },
    { name: 'Autostadt', text: 'Glas, Wasser und klare Linien am Mittellandkanal. Eine moderne Kulisse, die im Film ganz anders wirkt als ein Schloss.' },
    { name: 'Allersee', text: 'Am Abend über dem Wasser entstehen die ruhigen, weiten Bilder, mit denen viele Hochzeitsfilme enden.' },
  ],
  umgebung: 'Genauso filmen wir in Braunschweig, Gifhorn, Wolfenbüttel, Helmstedt, Hannover und Celle, und für eure Hochzeit reisen wir durch ganz Europa.',
  fragenTitel: 'Häufige Fragen zum Hochzeitsvideo in *Wolfsburg.*',
  fragen: [
    { frage: 'Was kostet ein Hochzeitsvideo in Wolfsburg bei euch?', antwort: 'Euer Hochzeitsvideo beginnt bei 1.000 €. Was es genau kostet, hängt vom Aufwand ab: wie viele Stunden wir filmen, wie lang euer Film wird und ob ihr ihn dokumentarisch oder gescriptet möchtet. Nach einem kurzen Gespräch bekommt ihr ein Angebot, das genau zu eurem Tag passt.' },
    { frage: 'Wie lang wird unser Hochzeitsvideo?', antwort: 'Der Hauptfilm ist zwischen 3 und 12 Minuten lang. Die Länge legen wir vorher mit euch fest, je nachdem, wie viel von eurem Tag ihr im Film sehen wollt.' },
    { frage: 'Hochzeitsfilm oder Hochzeitsvideo, was ist der Unterschied?', antwort: 'Im Alltag meinen beide Wörter dasselbe. Wenn wir von Hochzeitsfilm sprechen, meinen wir aber mehr als ein Video, das den Tag einfach mitschneidet: Wir drehen in Cinégraphie, mit Licht und Musik wie im Kino, und schneiden euren Tag zu einem Film, der eure Geschichte erzählt.' },
    { frage: 'Dokumentarisch oder gescriptet, was passt zu uns?', antwort: 'Wenn ihr euren Tag einfach erleben wollt, ist dokumentarisch richtig, und wir halten uns im Hintergrund. Habt ihr Lust auf eine Idee, die über den Tag hinausgeht, zum Beispiel eine kleine Geschichte, wie ihr euch kennengelernt habt, drehen wir dafür ein paar gescriptete Szenen. Das besprechen wir beim Kennenlernen.' },
    { frage: 'Können wir zum Hochzeitsvideo auch Fotos buchen?', antwort: 'Ja, Film und Fotos kommen bei uns aus einem Team. Ihr habt einen Ansprechpartner, und Bilder und Film passen im Look zusammen. Fotos für den ganzen Tag beginnen bei 850 €.' },
  ],
  abschlussTitel: 'Erzählt uns von *eurem* Tag.',
  abschluss: 'Schreibt uns Datum und Ort eurer Hochzeit. Wir melden uns persönlich und sagen euch ehrlich, ob wir an dem Tag noch frei sind.',
};

// Ratgeber im Vintage-Design (Nevio 28.10.2026). Die Artikel liegen weiter
// unter app/ratgeber/<slug>, hier stehen nur Liste und Kopf.
export const seiteRatgeber = {
  meta: { titel: 'Ratgeber: Hochzeitsfilm & Fotografie', text: 'Ratgeber für Brautpaare: was ein Hochzeitsfilm kostet, wann ihr Fotograf und Videograf buchen solltet und was einen cinematic Hochzeitsfilm ausmacht.' },
  label: 'Ratgeber',
  titel: 'Was ihr vor der *Buchung* wissen solltet.',
  einleitung: 'Ehrliche Antworten auf die Fragen, die uns Paare vor der Buchung am häufigsten stellen: Kosten, der richtige Zeitpunkt und der Stil eures Films.',
  artikel: [
    { href: '/ratgeber/was-kostet-ein-hochzeitsfilm', kategorie: 'Kosten', titel: 'Was kostet ein Hochzeitsfilm? Was den Preis bestimmt', kurz: 'Was kostet ein Hochzeitsfilm?', text: 'Den einen Preis gibt es nicht. Wir erklären, welche Faktoren ihn bestimmen und woran ihr ein gutes Paket erkennt.', lesezeit: '5 Min.' },
    { href: '/ratgeber/hochzeitsfilmer-wann-buchen', kategorie: 'Planung', titel: 'Wann Hochzeitsfilmer & Fotograf buchen? Der richtige Zeitpunkt', kurz: 'Wann Hochzeitsfilmer & Fotograf buchen?', text: 'Zu spät buchen ist der häufigste Fehler bei der Hochzeitsplanung. Eine klare Empfehlung und eine Checkliste für die Buchung.', lesezeit: '4 Min.' },
    { href: '/ratgeber/cinematic-hochzeitsfilm', kategorie: 'Stil', titel: 'Was ist ein cinematic Hochzeitsfilm?', kurz: 'Was ist ein cinematic Hochzeitsfilm?', text: 'Cinematic bedeutet mehr als eine gute Kamera. Der Unterschied zwischen dokumentarisch und cinematic, und warum er so viel ausmacht.', lesezeit: '4 Min.' },
  ],
  abschlussTitel: 'Eure Frage ist *nicht* dabei?',
  abschluss: 'In unseren häufigen Fragen findet ihr kurze Antworten zu Vertrag, Lieferzeit und Ablauf. Oder ihr schreibt uns direkt.',
  artikelCta: { zeile: 'Amoriva Films · Wolfsburg', titel: 'Euer Hochzeitsfilm *wartet.*', text: 'Schreibt uns, wann und wo ihr heiratet. Wir melden uns persönlich und beraten euch unverbindlich.' },
};

export const seiteAnfrage = {
  label: 'Jetzt anfragen',
  titel: 'Beginnt mit eurer *Geschichte.*',
  bild: { src: '/images/braut-drehen.jpg', alt: '' },
};
