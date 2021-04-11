<?php


namespace App\Controllers;


interface CRUD
{
    /**
     * Action principale du controller
     *
     * @return mixed
     */
    public function index();

    /**
     * Action d'affichage de la page de création
     *
     * @return mixed
     */
    public function create();

    /**
     * Action de création dans la base de données
     *
     * @return mixed
     */
    public function store();

    /**
     * Action d'affichage d'un élément
     *
     * @return mixed
     */
    public function show();

    /**
     * Action d'affichage de la page d'édition
     *
     * @return mixed
     */
    public function edit();

    /**
     * Action d'édition dans la base de données
     *
     * @return mixed
     */
    public function update();

    /**
     * Action de suppression dans la base de données
     *
     * @return mixed
     */
    public function destroy();
}