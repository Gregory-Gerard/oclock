<?php


namespace App\Responses;


use App\Exceptions\ViewException;

/**
 * Une view est une page complète (html) renvoyée à l'utilisateur
 *
 * @package App\Responses
 */
class View implements Response
{
    /**
     * Dossier racine des vues
     */
    private const VIEW_FOLDER = __DIR__.'/../../resources/views';

    /**
     * @var string Chemin complet de la vue
     */
    private string $fullPath = '';

    /**
     * Charge un fichier de vue à afficher ultérieurement
     *
     * @param string $path Fichier de la vue
     *
     * @throws ViewException
     */
    public function __construct(string $path)
    {
        $fullPath = self::VIEW_FOLDER."/{$path}.php";

        if (file_exists($fullPath) === false) throw new ViewException("La vue ({$fullPath}) n'existe pas");

        $this->fullPath = $fullPath;
    }

    /**
     * Affiche le contenu de la vue
     *
     * @return void
     */
    public function render(): void
    {
        include $this->fullPath;
    }
}