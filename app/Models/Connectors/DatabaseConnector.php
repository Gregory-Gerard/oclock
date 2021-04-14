<?php


namespace App\Models\Connectors;

/**
 * Trait pour se connecter et récupérer des données d'une base de données
 *
 * @package App\Models\Connectors
 */
trait DatabaseConnector
{
    /**
     * @var \PDO | null
     */
    private $db = null;

    /**
     * Connexion à la base
     */
    public function connect()
    {
        // Instancie une connexion PDO, je ne catch pas l'erreur possible pour que l'error handler global s'en occupe et stop l'exécution du script automatiquement
        $this->db = new \PDO("mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_DATABASE']}", $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);
    }

    /**
     * Fait une requête simple (prepare, execute)
     *
     * @param string $sql La requête SQL
     * @param array $parameters Les paramètres de la requête SQL
     */
    public function execute(string $sql, array $parameters = [])
    {
        $request = $this->db->prepare($sql);
        $request->execute($parameters);
    }

    /**
     * Fait une requête de récupération (prepare, execute, fetch)
     *
     * @param string $sql La requête SQL
     * @param array $parameters Les paramètres de la requête SQL
     *
     * @return array
     */
    public function fetch(string $sql, array $parameters = []): array
    {
        $request = $this->db->prepare($sql);
        $request->execute($parameters);

        return $request->fetch();
    }

    /**
     * Fait une requête de récupération sur plusieurs données (prepare, execute, fetch)
     *
     * @param string $sql La requête SQL
     * @param array $parameters Les paramètres de la requête SQL
     *
     * @return array
     */
    public function fetchAll(string $sql, array $parameters = []): array
    {
        $request = $this->db->prepare($sql);
        $request->execute($parameters);

        return $request->fetchAll();
    }
}