<?php


namespace App\Responses;


interface Response
{
    /**
     * Affiche le contenu d'un élément "Response"
     *
     * @return void
     */
    public function render(): void;
}