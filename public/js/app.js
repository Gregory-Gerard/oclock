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
    cardsSelected = [];

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
     * Initialisation
     */
    constructor() {
        // on sélectionne 8 cartes au hasard parmi les cartes disponibles
        this.cardsSelected = this.cardsAvailableType.sort(() => Math.random() - 0.5).slice(0, (this.gridWidthHeight**2)/2);

        // duplique les valeurs et remélange
        this.cardsSelected = [...this.cardsSelected, ...this.cardsSelected].sort(() => Math.random() - 0.5);

        // kage bunshin no jutsu
        this.cardsSelected.forEach((card, i) => {
            this.gameEl.appendChild(this.html(`<div class="card rounded shadow-md p-4 bg-gray-800 cursor-pointer animate-bounceIn" data-id="${i}"></div>`));

            this.cards[i] = {
                el: document.querySelector(`.card[data-id="${i}"]`), // on utilise pas le résultat d'appendChild car il renvoie un DocumentFragment vide,
                type: card
            };
        });

        this.initListeners();
    }

    /**
     * Les écouteurs d'événements
     */
    initListeners() {
        this.gameEl.querySelectorAll('.card').forEach(el =>
            el.addEventListener('click', e => {
                alert(this.cards[e.currentTarget.dataset.id].type)
            })
        )
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