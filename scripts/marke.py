from PIL import Image, ImageDraw, ImageFont
import numpy as np

TTF   = 'BodoniModa.ttf'
GRUEN = (104, 120, 80, 255)
WEISS = (255, 255, 255, 255)

def schrift(px, gewicht=400, opsz=11):
    f = ImageFont.truetype(TTF, px)
    f.set_variation_by_axes([gewicht, opsz])
    return f

def gesperrt(zeichner, xy, text, font, sperre, farbe):
    """PIL kennt keine Laufweite. Also Zeichen fuer Zeichen setzen."""
    x, y = xy
    for z in text:
        zeichner.text((x, y), z, font=font, fill=farbe)
        x += zeichner.textlength(z, font=font) + sperre
    return x - sperre

def breite(zeichner, text, font, sperre):
    b = sum(zeichner.textlength(z, font=font) for z in text)
    return b + sperre * (len(text) - 1)

def wortmarke(hoehe, farbe, rand=0.12):
    """Zweizeilig: AMORIVA gross, FILMS klein und weit gesperrt darunter."""
    UEB = 4          # Ueberabtastung, danach verkleinern
    H = hoehe * UEB
    # Gewicht 600 und kleine optische Groesse, genau wie der gesetzte
    # Text auf der Seite. Die Bodoni duennt ihre Haarstriche aus, je
    # groesser die optische Groesse gewaehlt wird - bei 400/36 war die
    # Marke kaum zu lesen (Nevio, 26.09.2026).
    gross  = schrift(int(H * 0.42), 600, 11)
    klein  = schrift(int(H * 0.177), 600, 11)
    sp_g   = H * 0.42 * 0.16
    sp_k   = H * 0.155 * 0.46

    mess = ImageDraw.Draw(Image.new('RGBA', (10, 10)))
    bg = breite(mess, 'AMORIVA', gross, sp_g)
    bk = breite(mess, 'FILMS',   klein, sp_k)
    B  = int(max(bg, bk) * (1 + rand * 2))

    bild = Image.new('RGBA', (B, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(bild)
    y1 = int(H * 0.06)
    gesperrt(d, ((B - bg) / 2, y1), 'AMORIVA', gross, sp_g, farbe)
    y2 = y1 + int(H * 0.52)
    gesperrt(d, ((B - bk) / 2, y2), 'FILMS', klein, sp_k, farbe)

    # auf die tatsaechliche Zeichenflaeche beschneiden, dann verkleinern
    bild = bild.crop(bild.getbbox())
    z = int(bild.width * hoehe / bild.height)
    return bild.resize((z, hoehe), Image.LANCZOS)

def zeichen(kante, gewicht=600, opsz=6):
    """Das A als Monogramm. Kraeftiges Gewicht und kleine optische Groesse,
       sonst verschwinden die Haarstriche der Bodoni im Browsertab."""
    UEB = 4
    K = kante * UEB
    bild = Image.new('RGBA', (K, K), (0, 0, 0, 0))
    m = Image.new('L', (K, K), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, K - 1, K - 1], radius=int(K * 0.22), fill=255)
    grund = Image.new('RGBA', (K, K), GRUEN)
    bild.paste(grund, (0, 0), m)

    f = schrift(int(K * 0.78), gewicht, opsz)
    d = ImageDraw.Draw(bild)
    x0, y0, x1, y1 = d.textbbox((0, 0), 'A', font=f)
    d.text(((K - (x1 - x0)) / 2 - x0, (K - (y1 - y0)) / 2 - y0), 'A', font=f, fill=WEISS)
    return bild.resize((kante, kante), Image.LANCZOS)
