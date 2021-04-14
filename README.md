# O'clock
Voir `./test.pdf` pour les consignes !

## Contexte
Réalisation d'un jeu Memory pour O'clock, en essayant d'apporter une valeur pédagogique

## Réalisation
Pour ce faire, j'ai trouvé intéressant de réaliser un petit framework MVC très très basique en PHP. Je pense que c'est une excellente porte d'entrée au monde de la POO en PHP, on retrouve des designs patterns, les bonnes manières pour coder proprement avec une bonne architecture... 

Voici le "stack" de l'application que j'ai réalisée :
* Un Container pour gérer l'état de l'application globale
* Un système de Router
* Un système de Controllers
* Un système de Response
  * View
  * Json
  * ...
* Un système de Models
* Une seule dépendance composer (DotEnv pour gérer l'environnement) pour voir ce gestionnaire de paquets très important en PHP
* Une dépendance NPM (Tailwind, reposant sur PostCSS pour build) qui est très important aussi aujourd'hui dans le web
* Du JS vanilla
* Une BDD MySQL

_⚠️ Compatibilité avec les navigateurs "récents" seulement ! Je n'ai pas utilisé babel ou autre pour éviter d'encore plus complexifier 😊_

Évidemment, tout ça pour un projet pareil est un peu "overkill", mais à but éducatif je pense qu'il peut introduire des grosses bases sur un stack classique du web :)

_Petite précision, je n'ai pas pu utiliser les images fournies car elles n'étaient pas transparentes :(_

## Résultat
Voici un petit déploiement sur une instance de Scaleway : [https://oclock.gregory-gerard.dev](https://oclock.gregory-gerard.dev)

Stack : LAMP, HTTPS (obligatoire avec un .dev toute façon)

## Merci :)