import Client from "./client";
import Setting from "./setting";
import * as address from "../type/address";
import * as AddressConverter from "../converter/address";

export default class Address {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/address/api.csp' : '/cbpapi/address/api';
    }

    public getSharedCardsById(bookId: string, cardIds: string[]): Promise<address.CardType[]> {
        const parameters: Object[] = [{
            _attr: {
                book_id: bookId
            }
        }];
        cardIds.forEach(cardId => {
            parameters.push({
                card_id: cardId
            })
        });
        return this.client.post(this.path, 'AddressGetSharedCardsById', parameters).then((res: address.CardsResponse) => {
            const cards: address.CardType[] = [];
            res.card.forEach(obj => {
                cards.push(AddressConverter.Card.toObject(obj));
            });
            return cards;
        });
    }
}
