<?php


namespace App\Controllers;


use App\Models\TimeModel;
use App\Responses\Json;
use App\Responses\View;

class GameController implements CRUD
{
    /**
     * Affiche la page principale du jeu
     *
     * @return View
     */
    public function index(): View
    {
        return new View('index');
    }

    public function create()
    {
        // TODO: Implement create() method.
    }

    /**
     * Ajoute un nouveau temps dans la base de données
     *
     * @return Json
     */
    public function store(): Json
    {
        if (!isset($_REQUEST['tries']) || !isset($_REQUEST['time'])) {
            http_response_code(422);
            return new Json(['code' => 422, 'message' => "Veuillez remplir tous les champs obligatoires (tries, time)"]);
        }

        // Ajoute le temps dans la base de données via le model
        try {
            (new TimeModel())->insertNewTime($_REQUEST['tries'], $_REQUEST['time']);
        } catch (\Exception $e) {
            return new Json(['code' => 500, 'message' => 'La base de données a rencontrée une erreur :(']);
        }

        return new Json(['code' => 0, 'message' => 'Temps ajouté à la base de données']);
    }

    /**
     * Renvoi les meilleurs temps
     *
     * @return Json
     */
    public function show(): Json
    {
        try {
            return new Json(['code' => 0, 'message' => (new TimeModel())->listBestTimes()]);
        } catch (\Exception $e) {
            return new Json(['code' => 500, 'message' => 'La base de données a rencontrée une erreur :(']);
        }
    }

    public function edit()
    {
        // TODO: Implement edit() method.
    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function destroy()
    {
        // TODO: Implement destroy() method.
    }
}