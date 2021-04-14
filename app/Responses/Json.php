<?php


namespace App\Responses;


use App\Exceptions\ViewException;

/**
 * Une réponse JSON, qui sert pour les appels en ajax par exemple
 *
 * @package App\Responses
 */
class Json implements Response
{
    /**
     * @var array Tableau de données
     */
    private array $data = [];

    /**
     * Charge un tableau à renvoyer, ultérieurement, en json
     *
     * @param array $data Tableau des données
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Affiche le contenu de la vue
     *
     * @return void
     */
    public function render(): void
    {
        header('Content-Type: application/json');

        echo json_encode($this->data);
    }
}