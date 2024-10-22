# CFF Clock

Une version JavaScript de la célèbre horloge SBB pour une utilisation numérique. Désormais, il est possible d'accéder à l'horloge via : [sbb-clock.slyc.ch](http://sbb-clock.slyc.ch), [cff-clock.slyc.ch](http://cff-clock.slyc.ch), [ffs-clock.slyc.ch](http://ffs-clock.slyc.ch).

## Initialisation

Dans l'en-tête de votre fichier HTML, ajoutez `<script src="path/to/sbbUhr-1.3.js"></script>`

Dans le corps HTML, définissez une balise `<div></div>` avec un identifiant unique où l'horloge sera hébergée.

Dans un script séparé, créez une nouvelle horloge `var myClock = new sbbUhr(container, background, fps);`

- `container (string)` est l'identifiant du conteneur div défini, où l'horloge sera hébergée.
- optionnel `background (boolean)` true = l'horloge sera placée sur un fond sombre, false = l'horloge sera placée sur un fond blanc.
- optionnel `fps` définit la fréquence de rafraîchissement de l'horloge. Doit être supérieur à 10 images/seconde pour obtenir un mouvement fluide des aiguilles. Si non défini, l'horloge sera rendue à chaque frame.

## Méthodes

- `myClock.start()` démarrera l'horloge.
- `myClock.stop()` arrêtera l'horloge.
- `myClock.invertColors()` inversera les couleurs de l'horloge si l'argument 'inverted' est présent dans l'URL.

## Configuration du titre

Le fichier `js/setTitle.js` ajuste le titre de la page en fonction de la langue de l'utilisateur. Les titres disponibles sont "Horloge CFF" pour le français, "SBB Uhr" pour l'allemand, "FFS Orologio" pour l'italien, et "SBB Clock" par défaut.

## Mode sombre

Le fichier `js/background.js` ajuste automatiquement la couleur de fond en fonction des préférences de l'utilisateur pour le mode sombre.

## Todo

- [x] Adapter le code pour les écrans de smartphone
- [ ] Faire un widget macOS
- [ ] Créer une watch face pour Samsung Wear OS
- [ ] Explorer les widgets iOS (nécessite un compte payant pour publier sur le store, ce qui n'est pas envisagé actuellement)
- [x] Faire une version "négatif" de l'horloge avec fond noir et aiguile blanche.

## Contributeurs

Ce projet est un fork de [sbb-design-systems/brand-elements](https://github.com/sbb-design-systems/brand-elements) avec comme contributeur principal [GoetteSebastian](https://github.com/GoetteSebastian). Notez que ce projet a été forké depuis un ancien dépôt qui devrait être archivé. Le nouveau dépôt pour les composants CFF se trouve ici : [lyne-design-system/lyne-components](https://github.com/lyne-design-system/lyne-components).