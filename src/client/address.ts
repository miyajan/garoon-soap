import Client from "./client";
import Setting from "./setting";
import * as address from "../type/address";
import * as base from "../type/base";
import * as AddressConverter from "../converter/address";
import * as BaseConverter from "../converter/base";

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

    public getSharedBooksById(bookIds: string[]): Promise<address.BookType[]> {
        const parameters: Object[] = [];
        bookIds.forEach(bookId => {
            parameters.push({
                book_id: bookId
            });
        });
        return this.client.post(this.path, 'AddressGetSharedBooksById', parameters).then((res: address.BooksResponse) => {
            const books: address.BookType[] = [];
            if (res.book !== undefined) {
                res.book.forEach(obj => {
                    books.push(AddressConverter.Book.toObject(obj));
                });
            }
            return books;
        });
    }

    public getPersonalCardsById(cardIds: string[]): Promise<address.CardType[]> {
        const parameters: Object[] = [];
        cardIds.forEach(cardId => {
            parameters.push({
                card_id: cardId
            })
        });
        return this.client.post(this.path, 'AddressGetPersonalCardsById', parameters).then((res: address.CardsResponse) => {
            const cards: address.CardType[] = [];
            res.card.forEach(obj => {
                cards.push(AddressConverter.Card.toObject(obj));
            });
            return cards;
        });
    }

    public getPersonalBooksById(bookIds: string[]): Promise<address.BookType[]> {
        const parameters: Object[] = [];
        bookIds.forEach(bookId => {
            parameters.push({
                book_id: bookId
            });
        });
        return this.client.post(this.path, 'AddressGetPersonalBooksById', parameters).then((res: address.BooksResponse) => {
            const books: address.BookType[] = [];
            if (res.book !== undefined) {
                res.book.forEach(obj => {
                    books.push(AddressConverter.Book.toObject(obj));
                });
            }
            return books;
        });
    }

    public getSharedBookVersions(bookItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        bookItems.forEach(item => {
            parameters.push({
                book_item: {
                    _attr: {
                        id: item.id,
                        version: item.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'AddressGetSharedBookVersions', parameters).then((res: address.BookItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.book_item !== undefined) {
                res.book_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }
}
