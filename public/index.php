<?php

// Charge l'autoloader de composer (dépendances du projet)
require '../vendor/autoload.php';

// Charge les variables d'environnements (fichier .env) via DotEnv
(Dotenv\Dotenv::createImmutable('../'))->load();

// Mise en place de l'environnement de l'application
if ($_ENV['DEBUG'] === 'true') {
    ini_set('display_errors', 1);
} else {
    ini_set('display_errors', 0);
}

// Charge le router et sa liste de routes
$router = new \App\Router();
$router->get('/', function () { return __DIR__; });
$router->run();

