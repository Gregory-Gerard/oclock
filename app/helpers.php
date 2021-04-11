<?php

use App\Application;
use App\Router;

if (!function_exists('router')) {
    /**
     * Retourne l'instance du router de l'application
     *
     * @return Router
     */
    function router(): Router
    {
        return Application::getInstance()->router;
    }
}