<?php


namespace App\Controllers;


use App\Application;
use App\Responses\View;
use App\Router;

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

    public function store()
    {
        // TODO: Implement store() method.
    }

    public function show()
    {
        // TODO: Implement show() method.
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