# CFF Clock
Une version JavaScript de la célèbre horloge SBB pour une utilisation numérique.
## Initialisation
Dans l'en-tête de votre fichier HTML, ajoutez `<script src="path/to/CFFClock-1.3.js"></script>`

Dans le corps HTML, définissez une balise `<div></div>` avec un identifiant unique où l'horloge sera hébergée.

Dans un script séparé, créez une nouvelle horloge `var myClock = new CFFClock(container, background, fps);`

`container (string)` est l'identifiant du conteneur div défini, où l'horloge sera hébergée.

optionnel `background (boolean)` true = l'horloge sera placée sur un fond sombre, false = l'horloge sera placée sur un fond blanc.

optionnel `fps` définit la fréquence de rafraîchissement de l'horloge. Doit être supérieur à 10 images/seconde pour obtenir un mouvement fluide des aiguilles. Si non défini, l'horloge sera rendue à chaque frame.

## Méthodes
`myClock.start()` démarrera l'horloge.

`myClock.stop()` arrêtera l'horloge.

## Todo
- [ ] Faire un widget macos
- [ ] Adapter le code pour les écrans de smartphone
