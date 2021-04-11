<?php

// Charge l'autoloader de composer (dépendances du projet)
use App\Application;
use App\Controllers;
use App\Router;

require '../vendor/autoload.php';

// Charge les variables d'environnements (fichier .env) via DotEnv
(Dotenv\Dotenv::createImmutable('../'))->load();

// Mise en place de l'environnement de l'application
if ($_ENV['DEBUG'] === 'true') {
    ini_set('display_errors', 1);
} else {
    ini_set('display_errors', 0);
}

// Instance de l'application
$app = new Application(
    new Router()
);

// Définition des routes
$app->router->get('/', [Controllers\GameController::class, 'index']);

// Lancement du routeur
$app->router->run();

