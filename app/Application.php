<?php


namespace App;

/**
 * Classe de l'application. Elle permet entre autre de gérer l'état global de l'application et ses composants,
 * comme par exemple le Router.
 *
 * @package App
 */
class Application
{
    protected static Application $instance;
    public Router $router;

    public function __construct(Router $router = null)
    {
        if ($router !== null) $this->router = $router;
        else $this->router = new Router();

        static::setInstance($this);
    }

    public static function setInstance(Application $application): Application
    {
        return static::$instance = $application;
    }

    public static function getInstance(): Application
    {

        if (is_null(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }
}