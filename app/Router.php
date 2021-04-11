<?php


namespace App;


use App\Exceptions\NotFoundException;
use App\Exceptions\RouterException;
use App\Responses\Response;
use Closure;

/**
 * Class Router permettant de faire le lien entre les url et des méthodes (contrôleurs ou fonctions anonymes / closure),
 * une sorte de .htaccess pour les url réécrites mais version php et plus facilement maintenable
 *
 * @package App
 */
class Router
{
    /**
     * Liste des routes enregistrées
     *
     * @var array
     */
    private array $routes = [];

    /**
     * Url de base (complète) de l'application
     *
     * @var string
     */
    private string $baseUrl;

    /**
     * Url (complète) actuelle de la requête
     *
     * @var string
     */
    private string $currentUrl;

    /**
     * Url (relative) actuelle de la requête (utilisée pour matcher les routes)
     *
     * @var string
     */
    private string $currentRelativeUrl;

    /**
     * Initialise et détecte la bonne configuration des url de l'application et instancie un routeur
     */
    public function __construct()
    {
        // Le document root dépendra de la config serveur. Si le document root est correctement configuré, $documentRoot sera une chaîne vide (car l'index.php est bien à la racine)
        // Dans le cadre d'un environnement de dev par exemple, il contiendra le chemin complet vers le projet (exemple '/perso/oclock/public')
        $documentRoot = rtrim(str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']), '/');

        // currentRelativeUrl correspond au chemin actuellement navigué par le client sans query string (exemple pour https://oclock.test/super-url/longue, currentRelativeUrl = /super-url/longue)
        $this->currentRelativeUrl = (string)preg_replace('/\?.*/', '', str_replace($documentRoot, '', $_SERVER['REQUEST_URI']));
        $this->baseUrl = "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['SERVER_NAME']}{$documentRoot}";
        $this->currentUrl = $this->baseUrl.($this->currentRelativeUrl !== '/' ? $this->currentRelativeUrl : '');
    }

    /**
     * Fonction pour ajouter un chemin en méthode GET au Router
     *
     * @param string $path Chemin utilisé
     * @param Closure|array $action Action utilisée (Closure ou Contrôleur)
     * @param string|null $name Nom de la route
     *
     * @throws RouterException
     */
    public function get(string $path, $action, $name = null)
    {
        $this->add(['GET', 'HEAD'], $path, $action, $name);
    }

    /**
     * Fonction pour ajouter un chemin en méthode POST au Router
     *
     * @param string $path Chemin utilisé
     * @param Closure|array $action Action utilisée (Closure ou Contrôleur)
     * @param string|null $name Nom de la route
     *
     * @throws RouterException
     */
    public function post(string $path, $action, $name = null)
    {
        $this->add('POST', $path, $action, $name);
    }

    /**
     * Fonction qui lance le routeur
     *
     * @throws NotFoundException|RouterException
     */
    public function run()
    {
        $currentMethod = $_SERVER['REQUEST_METHOD'];
        $foundRoute = null;

        foreach (($this->routes[$_SERVER['REQUEST_METHOD']] ?? []) as $route) {
            if ($route['path'] !== $this->currentRelativeUrl) continue;

            $foundRoute = $route;
            break;
        }

        if ($foundRoute === null) throw new NotFoundException();

        $this->execute($foundRoute['action']);
    }

    /**
     * Fonction qui exécute l'action d'une route
     *
     * @param array|Closure $action
     *
     * @throws RouterException
     */
    private function execute($action)
    {
        if (($action instanceof Closure)) {
            $this->output($action());
        } elseif (is_array($action) && count($action) === 2 && method_exists($action[0], $action[1])) {
            $this->output(call_user_func([new $action[0], $action[1]]));
        } else {
            throw new RouterException('Action impossible à exécuter');
        }
    }

    /**
     * Affiche le résultat d'exécution d'une action
     *
     * @param mixed $output
     */
    private function output($output)
    {
        if ($output instanceof Response) {
            $output->render();
        } else {
            echo $output;
        }
    }

    /**
     * Fonction pour ajouter un chemin au Router
     *
     * @param string|array $methods Méthode(s) utilisée(s) (GET, POST, ...)
     * @param string $path Chemin utilisé
     * @param Closure|array $action Action utilisée (Closure ou Contrôleur)
     * @param string|null $name Nom de la route
     *
     * @throws RouterException
     */
    private function add($methods, string $path, $action, $name = null)
    {
        if (!$action instanceof Closure && !is_array($action)) throw new RouterException("La méthode doit-être une Closure ou un array");

        // Si un string est passé on le transforme en tableau pour garder le code dans la même boucle (DRY)
        foreach ((is_array($methods) ? $methods : [$methods]) as $method) {
            $this->routes[$method][] = [
                'path' => $this->normalizePath($path),
                'action' => $action,
                'name' => $name
            ];
        }
    }

    /**
     * Fonction pour retourner un chemin normalisé
     *
     * @param string $path Chemin à normaliser
     *
     * @return string
     */
    private function normalizePath(string $path): string
    {
        return '/'.trim($path, '/'); // une url sera toujours /quelque-chose/suite quand on l'enregistre, ça permet de normaliser le fonctionnement et d'éviter d'avoir des effets indésirables
    }
}