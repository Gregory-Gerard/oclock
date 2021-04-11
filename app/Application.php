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

    public function __construct(Router $router)
    {
        $this->router = $router;

        static::setInstance($this);
    }

    public static function setInstance(Application $application): Application
    {
        return static::$instance = $application;
    }

    public static function getInstance(): Application
    {
        return static::$instance;
    }
}