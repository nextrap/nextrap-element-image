# General Image Component

- Positionierung von Bildern (top, bottom, left, right, center) über style Attribut object-postion (default: center center)
- Aspect-Ratio bei verschiedenen BreakPoints
- Slideshow mit mehreren Bildern (blend-effekt)
- Slideshow mit Rechts / Links Navigation
- Slideshow mit Alt-Text oder data-caption als Caption
- Fullsize Image mit zentriertem Bild und kopie des Bildes verschwommen im Hintergrund


Bilder bleiben im Root-Dom. Ggf werden Klassen im Root-Dom gesetzt.

## Nutzung

### Einfaches Bild

```html
<nxa-image style="width: 100%; height: 250px">
    <img src="" style="object-position: top center;">
</nxa-image>
```


### Slideshow

Die Funktionen werden über das `data-features` Attribut gesteuert.

```html
<nxa-image style="width: 100%; height: 250px" data-features="slideshow blend fullsize">
    <img src="" style="object-position: top center;" data-caption="Bild 1" data-crop="top: 10%; bottom: 20%">
    <img src="" style="object-position: bottom center;">
    <img src="" style="object-position: center center;">
</nxa-image>
```

### Crop

Bilder sollen über das data-crop attribut zugeschnitten werden können (virtuell) und danach per object-position noch positioniert werden können.

Dabei beziehen sich die Prozent-Werte auf die Höhe und Breite des Bildes.


### Fullsize Image

Bei option Fullsize kann das Bild angeklickt werden. Es öffnet sich ein Modal mit dem Bild in voller Größe.
(Siehe modal).


### SwipeDetection

Es soll eine SwipeDetection Klasse geben (universell nutzbar), die ein Pointer event aufnimmt und bei einem Swipe
eine Funktion aufruft. Diese Funktion kann dann z.B. ein `next()` oder `prev()` auf der Slideshow auslösen.

Um einen Swipe auszuölsen, muss der Pointer mindestens XXpx in eine Richtung bewegt werden. Außerdem darf der Swipe Event 
nicht während eines Scroll events ausgelöst werden.
