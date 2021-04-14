class App {
    /**
     * Taille de la grille (4x4 par exemple)
     *
     * @type {number}
     */
    gridWidthHeight = 4;

    /**
     * Liste des cartes disponibles pour jouer
     * (j'avoue certaines je n'ai pas su reconnaître...)
     *
     * @type {array}
     */
    cardsAvailableType = ['apple', 'banana', 'orange', 'lime', 'pomegranate', 'lemon', 'strawberry', 'watermelon', 'cherry', 'grape', 'apricot', 'peach'];

    /**
     * Liste des cartes sélectionnées pour l'instance de jeu
     *
     * @type {array}
     */
    cardsSelectedType = [];

    /**
     * Sélecteur DOM du jeu
     *
     * @type {Element | null}
     */
    gameEl = document.querySelector('#game');

    /**
     * Objet contenant les cartes
     *
     * @type {object}
     */
    cards = {};

    /**
     * Carte actuellement sélectionnée par le joueur
     *
     * @type {object | null}
     */
    cardSelected = null;

    /**
     * Jeu actuellement bloqué (en cours d'animation par exemple)
     *
     * @type {boolean}
     */
    blocked = false;

    /**
     * Nombre de cartes trouvées
     *
     * @type {number}
     */
    matches = 0;

    /**
     * Nombre de tentatives
     *
     * @type {number}
     */
    tries = 0;

    /**
     * Initialisation
     */
    constructor() {
        // on sélectionne 8 cartes au hasard parmi les cartes disponibles
        this.cardsSelectedType = this.cardsAvailableType.sort(() => Math.random() - 0.5).slice(0, (this.gridWidthHeight**2)/2);

        // duplique les valeurs et remélange
        this.cardsSelectedType = [...this.cardsSelectedType, ...this.cardsSelectedType].sort(() => Math.random() - 0.5);

        // kage bunshin no jutsu
        this.cardsSelectedType.forEach((card, i) => {
            this.gameEl.querySelector('.grid').appendChild(this.html(`<div class="card rounded shadow-md p-4 bg-gray-800 cursor-pointer animate-bounceIn transition-colors" data-id="${i}"><span></span></div>`));

            this.cards[i] = {
                el: this.gameEl.querySelector(`.card[data-id="${i}"]`), // on utilise pas le résultat d'appendChild car il renvoie un DocumentFragment vide,
                type: card,
                disabled: false
            };
        });

        this.initListeners();
    }

    /**
     * Fonction qui gère les clics sur une carte
     *
     * @param e Événement du clic
     */
    eventCardClick(e) {
        if (this.blocked === true) return;

        const card = this.cards[e.currentTarget.dataset.id];

        if (card.disabled === true) return;

        // retire la classe d'entrée au démarrage du jeu quand on clique pour la première fois sur la carte
        card.el.classList.remove('animate-bounceIn');

        // si une carte est déjà sélectionnée, on check si c'est la même que celle sur laquelle on vient de cliquer
        if (this.cardSelected !== null) {
            if (this.cardSelected === card) return false;
            else if (this.cardSelected.type === card.type) this.secondChoiceCardValid(card);
            else this.secondChoiceCardInvalid(card);
        } else this.firstChoiceCard(card);
    }

    /**
     * Fonction qui sélectionne une carte (la retourne et la met en attente)
     *
     * @param card Carte à sélectionner
     */
    firstChoiceCard(card) {
        // affichage du fruit
        card.el.querySelector('span').textContent = card.type;

        // animation
        card.el.classList.remove('bg-gray-800', 'cursor-pointer');
        card.el.classList.add(card.type, 'animate-flipIn', 'bg-gray-700');

        this.cardSelected = card;
    }

    /**
     * Fonction qui sélectionne une deuxième carte (cas valide)
     *
     * @param card
     */
    secondChoiceCardValid(card) {
        if (this.cardSelected === null) return;

        // désactivation des deux cartes désormais trouvées
        this.cards[this.cardSelected.el.dataset.id].disabled = true;
        this.cards[card.el.dataset.id].disabled = true;

        // affichage du fruit
        card.el.querySelector('span').textContent = card.type;

        // animation
        this.cardSelected.el.classList.remove('bg-gray-700');
        this.cardSelected.el.classList.add('bg-green-700');
        card.el.classList.remove('bg-gray-800', 'cursor-pointer');
        card.el.classList.add(card.type, 'animate-flipIn', 'bg-green-700');

        // maj compteurs
        this.matches = this.matches + 2;
        this.incrementTries();

        // reset carte sélectionnée
        this.cardSelected = null;

        if (this.matches === this.gridWidthHeight**2) setTimeout(() => alert("c'est la win"), 250);
    }

    /**
     * Fonction qui sélectionne une deuxième carte (cas invalide)
     *
     * @param card
     */
    secondChoiceCardInvalid(card) {
        if (this.cardSelected === null) return;

        this.blocked = true;

        const firstChoice = this.cardSelected;

        // affichage du fruit
        card.el.querySelector('span').textContent = card.type;

        // animation
        firstChoice.el.classList.remove('bg-gray-700');
        firstChoice.el.classList.add('bg-red-900');
        card.el.classList.remove('bg-gray-800', 'cursor-pointer');
        card.el.classList.add(card.type, 'animate-flipIn', 'bg-red-900');

        setTimeout(() => {
            firstChoice.el.classList.remove(firstChoice.type, 'bg-red-900', 'animate-flipIn');
            firstChoice.el.classList.add('bg-gray-800', 'cursor-pointer', 'animate-flipOut');
            firstChoice.el.querySelector('span').textContent = '';
            card.el.classList.remove(card.type, 'bg-red-900', 'animate-flipIn');
            card.el.classList.add('bg-gray-800', 'cursor-pointer', 'animate-flipOut');
            card.el.querySelector('span').textContent = '';

            this.blocked = false;

            setTimeout(() => {
                firstChoice.el.classList.remove('animate-flipOut');
                card.el.classList.remove('animate-flipOut');
            }, 750)
        }, 1000);

        // maj compteurs
        this.incrementTries();

        // reset carte sélectionnée
        this.cardSelected = null;
    }

    /**
     * Augmente les tentatives
     */
    incrementTries() {
        this.tries++;
        this.gameEl.querySelector('#match').textContent = this.tries.toString();
    }

    /**
     * Les écouteurs d'événements
     */
    initListeners() {
        this.gameEl.querySelectorAll('.card').forEach(el =>
                el.addEventListener('click', (e) => this.eventCardClick(e))
        );
    }

    /**
     * Converti un string en élément HTML (ajoutable sur la page)
     *
     * @param string
     * @returns {DocumentFragment}
     */
    html(string) {
        const template = document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
}

const app = new App();