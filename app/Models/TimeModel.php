<?php


namespace App\Models;


use App\Models\Connectors\DatabaseConnector;

class TimeModel
{
    use DatabaseConnector;

    /**
     * Instancie la connexion à la base de données
     */
    public function __construct()
    {
        $this->connect();
    }

    /**
     * Insertion d'un nouveau temps dans la base données
     *
     * @param int $tries Nombre de tentatives
     * @param string $time Temps effectué
     */
    public function insertNewTime(int $tries, string $time)
    {
        $this->execute("INSERT INTO times(tries, time) VALUES(:tries, :time)", compact('tries', 'time'));
    }

    /**
     * Renvoi les meilleurs temps
     *
     * @return array
     */
    public function listBestTimes(): array
    {
        return $this->fetchAll("SELECT * FROM times ORDER BY time, tries LIMIT 5;");
    }
}