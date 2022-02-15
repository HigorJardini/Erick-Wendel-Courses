
export default class SuffleCards {

    static showCards(cards) {
        const copy = cards
            .concat(cards)
            .map(item => {
                return Object.assign({}, item, { id: Math.random() / 0.5})
            })
            .sort(() => Math.random() - 0.5);

        return copy;
    }

    static showCard(card, cards) {
        return cards.find(({name}) => card === name);
    }

    static hiddenCards(img, cards) {
        return cards.map(({id, name}) => ({
            id,
            name,
            img: img
        }));
    }
}