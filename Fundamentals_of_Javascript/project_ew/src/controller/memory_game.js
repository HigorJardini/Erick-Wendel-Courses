
import SuffleCards from "../service/suffle.js"

export default class MemoryGame {

    constructor({ screen, formation }) {
        this.screen =    screen;
        this.formation = formation;
        this.default_theme = 'bitcoin'
        this.cards = [
            {
                img: `./public/assets/card_pack/${this.default_theme}/card_img_1.svg`,
                name: "card_1"
            },
            {
                img: `./public/assets/card_pack/${this.default_theme}/card_img_2.svg`,
                name: "card_2"
            },
            {
                img: `./public/assets/card_pack/${this.default_theme}/card_img_3.svg`,
                name: "card_3"
            },
            {
                img: `./public/assets/card_pack/${this.default_theme}/card_img_4.svg`,
                name: "card_4"
            }
        ];

        this.back_default = `./public/assets/card_pack/${this.default_theme}/back/back_card_img_1.svg`
        this.hideCards     = [];
        this.selectedCards = [];
    }

    init(){
        // this.screen.updateImgs(this.cards);
        this.screen.configButtonStart(this.startGame.bind(this))
        this.screen.configButtonSelectCard(this.checkSelect.bind(this))
        this.screen.configButtonShowAllCards(this.showAllCards.bind(this))
    }

    async shuffle() {
        let timerInterval;
        await Swal.fire({
            title: 'Playing de game!',
            html: 'Start in <b></b>.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

        const cards = SuffleCards.showCards(this.cards);
        this.screen.updateImgs(cards);

        const idBreak = this.screen.initTimer(1000);

        await this.formation.timeOut(3200);
        this.screen.clearTimer(idBreak);
        this.hiddenCards(cards);
    }

    hiddenCards(cards) {
        const hiddens_cards = SuffleCards.hiddenCards(this.back_default, cards);
        this.screen.updateImgs(hiddens_cards);
        this.hideCards = hiddens_cards;
    }

    showCard(card) {
        const { img } = SuffleCards.showCard(card, this.cards);
        this.screen.showCard(card, img);
    }

    checkSelect(id, name) {
        const item = {id, name};
        const selectedCards = this.selectedCards.length;

        switch(selectedCards) {
            case 0:
                this.selectedCards.push(item);
                break;
            case 1:
                const [ option1 ] = this.selectedCards;
                this.selectedCards = [];
                if(option1.name === item.name &&
                   option1.id !== item.id
                ){
                    this.showCard(item.name);
                    this.screen.showMessage();
                    return;
                }

                this.screen.showMessage(false);
                break;
        }

    }

    showAllCards() {
        const hiddenCards = this.hideCards;
        for(const card of hiddenCards){
            const { img } = this.cards.find(item => item.name === card.name);
            card.img = img;
        }

        this.screen.updateImgs(hiddenCards);
    }

    startGame() {
        this.shuffle();
    }
}