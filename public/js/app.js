class App {
    /**
     * Taille de la grille (4x4 par exemple)
     *
     * @type {number}
     */
    gridWidthHeight = 4;

    /**
     * Temps de jeu au démarrage
     *
     * @type {number}
     */
    maxTime = 90;

    /**
     * Temps de jeu restant
     *
     * @type {number}
     */
    time;

    /**
     * Liste des cartes disponibles pour jouer
     *
     * @type {array}
     */
    cardsAvailableType = ['apple', 'banana', 'orange', 'lemon', 'strawberry', 'watermelon', 'cherry', 'grape', 'peach', 'mango', 'kiwi', 'pear'];

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
            this.gameEl.querySelector('.grid').appendChild(this.html(`
                <div class="card flex justify-center items-center rounded shadow-md p-4 bg-gray-800 cursor-pointer animate-bounceIn transition-colors" data-id="${i}">
                    <span role="img" aria-hidden="true"></span>
                </div>`));

            this.cards[i] = {
                el: this.gameEl.querySelector(`.card[data-id="${i}"]`), // on utilise pas le résultat d'appendChild car il renvoie un DocumentFragment vide,
                type: card,
                disabled: false
            };
        });

        this.time = this.maxTime;

        // affiche le temps restant de base
        this.gameEl.querySelector('#progress-time').textContent = `${Math.floor(this.time/60)}:${(this.time%60).toString().padStart(2, '0')}`;

        this.initListeners();
    }

    /**
     * Démarrage
     */
    start() {
        this.gameEl.querySelector('#game__start').remove();
        this.initTimer();
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
        // affichage du fruit (en prenant en compte l'accessibilité)
        card.el.querySelector('span').classList.add(`card--${card.type}`);
        card.el.querySelector('span').setAttribute('aria-hidden', 'false');
        card.el.querySelector('span').setAttribute('aria-label', card.type);

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

        // affichage du fruit (en prenant en compte l'accessibilité)
        card.el.querySelector('span').classList.add(`card--${card.type}`);
        card.el.querySelector('span').setAttribute('aria-hidden', 'false');
        card.el.querySelector('span').setAttribute('aria-label', card.type);

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

        if (this.matches === this.gridWidthHeight**2) setTimeout(() => this.win(), 250);
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

        // affichage du fruit (en prenant en compte l'accessibilité)
        card.el.querySelector('span').classList.add(`card--${card.type}`);
        card.el.querySelector('span').setAttribute('aria-hidden', 'false');
        card.el.querySelector('span').setAttribute('aria-label', card.type);

        // animation
        firstChoice.el.classList.remove('bg-gray-700');
        firstChoice.el.classList.add('bg-red-900');
        card.el.classList.remove('bg-gray-800', 'cursor-pointer');
        card.el.classList.add(card.type, 'animate-flipIn', 'bg-red-900');

        setTimeout(() => {
            [firstChoice, card].forEach(cardToHide => {
                cardToHide.el.classList.remove(cardToHide.type, 'bg-red-900', 'animate-flipIn');
                cardToHide.el.classList.add('bg-gray-800', 'cursor-pointer', 'animate-flipOut');
                cardToHide.el.querySelector('span').classList.remove(`card--${cardToHide.type}`);
                cardToHide.el.querySelector('span').setAttribute('aria-hidden', 'true');
                cardToHide.el.querySelector('span').setAttribute('aria-label', '');
            })

            setTimeout(() => {
                this.blocked = false;

                firstChoice.el.classList.remove('animate-flipOut');
                card.el.classList.remove('animate-flipOut');
            }, 500)
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
    }

    /**
     * C'est gagné
     */
    win() {
        this.blocked = true;

        // le temps mis pour gagner
        const time = `${Math.floor((this.maxTime-this.time)/60)}:${((this.maxTime-this.time)%60).toString().padStart(2, '0')}`;
        alert(`Et c'est gagné 🤩 En ${this.tries} coups et un temps de ${time}`);

        fetch("bravo", {"headers":{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},"body":`tries=${this.tries}&time=${time}`,"method":"POST"})
            .then(() => location.reload());
    }

    /**
     * C'est perdu
     */
    lose() {
        this.blocked = true;
        alert("Et c'est perdu 😥 Retente ta chance !");
        location.reload();
    }

    /**
     * Affiche les meilleurs temps
     */
    showBestTimes()
    {
        fetch('best')
            .then(response => response.json())
            .then(response => {
                alert(`Classement des meilleurs temps :\n${response.message.map(entry => `🏆 ${entry.time} (en ${entry.tries} tentatives)`).join('\n')}`);
            })
    }

    /**
     * Les écouteurs d'événements
     */
    initListeners() {
        this.gameEl.querySelector('#game__start button').addEventListener('click', () => this.start());

        this.gameEl.querySelector('#game__top').addEventListener('click', () => this.showBestTimes());

        this.gameEl.querySelectorAll('.card').forEach(el =>
                el.addEventListener('click', (e) => this.eventCardClick(e))
        );
    }

    /**
     * Le timer du jeu
     */
    initTimer() {
        const timer = setInterval(() => {
            if (this.time <= 0) {
                clearInterval(timer); // supprime le setInterval, on en a plus besoin !
                this.lose();
                return;
            }

            this.time--;

            const percentage = Math.floor(this.time*100/this.maxTime);

            this.gameEl.querySelector('#progress-bar div').style.width = `${percentage}%`;
            this.gameEl.querySelector('#progress-time').textContent = `${Math.floor(this.time/60)}:${(this.time%60).toString().padStart(2, '0')}`;
        }, 1000);
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