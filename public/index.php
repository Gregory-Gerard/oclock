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

try {
    // Définition des routes
    $app->router->get('/', [Controllers\GameController::class, 'index']);
    $app->router->post('/bravo', [Controllers\GameController::class, 'store']);
    $app->router->get('/best', [Controllers\GameController::class, 'show']);

    // Lancement du routeur
    $app->router->run();
} catch (\App\Exceptions\NotFoundException $e) {
    http_response_code(404);
} catch (\Exception $e) {
    http_response_code(500);
}

