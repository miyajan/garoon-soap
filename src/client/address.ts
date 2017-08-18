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

    public getPersonalBookVersions(bookItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
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
        return this.client.post(this.path, 'AddressGetPersonalBookVersions', parameters).then((res: address.BookItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.book_item !== undefined) {
                res.book_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getSharedCardVersions(bookId: string, cardItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [{
            _attr: {
                book_id: bookId
            }
        }];
        cardItems.forEach(item => {
            parameters.push({
                card_item: {
                    _attr: {
                        id: item.id,
                        version: item.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'AddressGetSharedCardVersions', parameters).then((res: address.CardItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.card_item !== undefined) {
                res.card_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getPersonalCardVersions(cardItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        cardItems.forEach(item => {
            parameters.push({
                card_item: {
                    _attr: {
                        id: item.id,
                        version: item.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'AddressGetPersonalCardVersions', parameters).then((res: address.CardItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.card_item !== undefined) {
                res.card_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getReadAllowBooks(): Promise<string[]> {
        return this.client.post(this.path, 'AddressGetReadAllowBooks', []).then((res: address.BookIdsResponse) => {
            const bookIds: string[] = [];
            if (res.book_id !== undefined) {
                res.book_id.forEach(bookId => {
                    bookIds.push(bookId);
                });
            }
            return bookIds;
        });
    }

    public getModifyAllowBooks(): Promise<string[]> {
        return this.client.post(this.path, 'AddressGetModifyAllowBooks', []).then((res: address.BookIdsResponse) => {
            const bookIds: string[] = [];
            if (res.book_id !== undefined) {
                res.book_id.forEach(bookId => {
                    bookIds.push(bookId);
                });
            }
            return bookIds;
        });
    }

    public getMyAddressGroupVersions(groupItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        groupItems.forEach(item => {
            parameters.push({
                my_address_group_item: {
                    _attr: {
                        id: item.id,
                        version: item.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'AddressGetMyAddressGroupVersions', parameters).then((res: address.MyAddressGroupItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.my_address_group_item !== undefined) {
                res.my_address_group_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getMyAddressGroupsById(groupIds: string[]): Promise<address.MyAddressGroupType[]> {
        const parameters: Object[] = [];
        groupIds.forEach(groupId => {
            parameters.push({
                my_address_group_id: groupId
            });
        });
        return this.client.post(this.path, 'AddressGetMyAddressGroupsById', parameters).then((res: address.MyAddressGroupsResponse) => {
            const groups: address.MyAddressGroupType[] = [];
            if (res.my_address_group !== undefined) {
                res.my_address_group.forEach(obj => {
                    groups.push(AddressConverter.MyAddressGroup.toObject(obj));
                });
            }
            return groups;
        });
    }

    public addMyAddressGroups(groups: address.AddMyAddressGroupType[]): Promise<address.MyAddressGroupType[]> {
        const parameters: Object[] = [];
        groups.forEach(group => {
            const attr: any = {
                id: 'dummy',
                version: 'dummy',
                name: group.name
            };
            if (group.description !== undefined) {
                attr.description = group.description;
            }
            parameters.push({
                my_address_group: [
                    {
                        _attr: attr
                    },
                ]
            });
        });
        return this.client.post(this.path, 'AddressAddMyAddressGroups', parameters).then((res: address.MyAddressGroupsResponse) => {
            const groups: address.MyAddressGroupType[] = [];
            if (res.my_address_group !== undefined) {
                res.my_address_group.forEach(obj => {
                    groups.push(AddressConverter.MyAddressGroup.toObject(obj));
                });
            }
            return groups;
        });
    }

    public modifyMyAddressGroups(groups: address.ModifyMyAddressGroupType[]): Promise<address.MyAddressGroupType[]> {
        const parameters: Object[] = [];
        groups.forEach(group => {
            const attr: any = {
                id: group.id,
                version: 'dummy',
                name: group.name
            };
            if (group.description !== undefined) {
                attr.description = group.description;
            }
            parameters.push({
                my_address_group: [
                    {
                        _attr: attr
                    },
                ]
            });
        });
        return this.client.post(this.path, 'AddressModifyMyAddressGroups', parameters).then((res: address.MyAddressGroupsResponse) => {
            const groups: address.MyAddressGroupType[] = [];
            if (res.my_address_group !== undefined) {
                res.my_address_group.forEach(obj => {
                    groups.push(AddressConverter.MyAddressGroup.toObject(obj));
                });
            }
            return groups;
        });
    }

    public removeMyAddressGroups(groupIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        groupIds.forEach(groupId => {
            parameters.push({
                my_address_group_id: groupId
            });
        });
        return this.client.post(this.path, 'AddressRemoveMyAddressGroups', parameters).then(() => {
        });
    }

    public modifyCardsInMyAddressGroup(groups: address.ModifyCardsInMyAddressGroupType[]): Promise<address.MyAddressGroupType[]> {
        const parameters: Object[] = [];
        groups.forEach(group => {
            const myAddressGroup: any = [{
                _attr: {
                    id: group.id
                }
            }];
            if (group.userIds !== undefined) {
                group.userIds.forEach(userId => {
                    myAddressGroup.push({
                        user: {
                            _attr: {
                                key: userId
                            }
                        }
                    });
                });
            }
            if (group.cards !== undefined) {
                group.cards.forEach(card => {
                    myAddressGroup.push({
                        card: {
                            _attr: {
                                key: card.id,
                                type: card.type
                            }
                        }
                    });
                });
            }
            parameters.push({
                my_address_group: myAddressGroup
            });
        });
        return this.client.post(this.path, 'AddressModifyCardsInMyAddressGroup', parameters).then((res: address.MyAddressGroupsResponse) => {
            const groups: address.MyAddressGroupType[] = [];
            if (res.my_address_group !== undefined) {
                res.my_address_group.forEach(obj => {
                    groups.push(AddressConverter.MyAddressGroup.toObject(obj));
                });
            }
            return groups;
        });
    }

    public addCards(cards: address.CardContainsFileType[]): Promise<address.CardType[]> {
        const parameters: Object[] = [];
        cards.forEach(card => {
            const addCard: any = [];

            const cardParam: any = [];
            cardParam.push({
                _attr: {
                    book_id: card.card.bookId,
                    id: 'dummy',
                    version: 'dummy'
                }
            });
            cardParam.push({
                subject: card.card.subject
            });
            if (card.card.personalName !== undefined) {
                cardParam.push({
                    personal_name: {
                        part: card.card.personalName
                    }
                });
            }
            if (card.card.personalReading !== undefined) {
                cardParam.push({
                    personal_reading: {
                        part: card.card.personalReading
                    }
                });
            }
            if (card.card.companyName !== undefined) {
                cardParam.push({
                    company_name: card.card.companyName
                })
            }
            if (card.card.companyReading !== undefined) {
                cardParam.push({
                    company_reading: card.card.companyReading
                })
            }
            if (card.card.section !== undefined) {
                cardParam.push({
                    section: card.card.section
                });
            }
            if (card.card.zipCode !== undefined) {
                cardParam.push({
                    zipCode: card.card.zipCode
                });
            }
            if (card.card.physicalAddress !== undefined) {
                cardParam.push({
                    physical_address: card.card.physicalAddress
                });
            }
            if (card.card.map !== undefined) {
                cardParam.push({
                    map: card.card.map
                });
            }
            if (card.card.route !== undefined) {
                const route: any = [];
                if (card.card.route.path !== undefined) {
                    route.push({
                        path: card.card.route.path
                    });
                }
                if (card.card.route.time !== undefined) {
                    route.push({
                        time: card.card.route.time
                    });
                }
                if (card.card.route.fare !== undefined) {
                    route.push({
                        fare: card.card.route.fare
                    });
                }
                cardParam.push({
                    route: route
                });
            }
            if (card.card.companyTel !== undefined) {
                cardParam.push({
                    company_tel: card.card.companyTel
                });
            }
            if (card.card.companyFax !== undefined) {
                cardParam.push({
                    company_fax: card.card.companyFax
                });
            }
            if (card.card.url !== undefined) {
                cardParam.push({
                    url: card.card.url
                });
            }
            if (card.card.post !== undefined) {
                cardParam.push({
                    post: card.card.post
                });
            }
            if (card.card.personalTel !== undefined) {
                cardParam.push({
                    personal_tel: card.card.personalTel
                });
            }
            if (card.card.email !== undefined) {
                cardParam.push({
                    email: card.card.email
                });
            }
            if (card.card.image !== undefined) {
                cardParam.push({
                    image: [
                        {
                            _attr: {
                                mime_type: card.card.image.mimeType
                            }
                        },
                        {
                            file: {
                                _attr: {
                                    name: card.card.image.name,
                                    file_id: card.card.image.fileId,
                                    size: card.card.image.size
                                }
                            }
                        }
                    ]
                })
            }
            if (card.card.description !== undefined) {
                cardParam.push({
                    description: card.card.description
                });
            }
            addCard.push({
                card: cardParam
            });

            if (card.files !== undefined) {
                card.files.forEach(file => {
                    addCard.push({
                        file: [
                            {
                                _attr: {
                                    id: file.id
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            parameters.push({
                add_card: addCard
            });
        });
        return this.client.post(this.path, 'AddressAddCards', parameters).then((res: address.CardsResponse) => {
            const cards: address.CardType[] = [];
            res.card.forEach(obj => {
                cards.push(AddressConverter.Card.toObject(obj));
            });
            return cards;
        });
    }

    public modifyCards(cards: address.ModifyCardContainsFileType[]): Promise<address.CardType[]> {
        const parameters: Object[] = [];
        cards.forEach(card => {
            const modifyCard: any = [];

            const cardParam: any = [];
            cardParam.push({
                _attr: {
                    book_id: card.card.bookId,
                    id: card.card.id,
                    version: 'dummy'
                }
            });
            cardParam.push({
                subject: card.card.subject
            });
            if (card.card.personalName !== undefined) {
                cardParam.push({
                    personal_name: {
                        part: card.card.personalName
                    }
                });
            }
            if (card.card.personalReading !== undefined) {
                cardParam.push({
                    personal_reading: {
                        part: card.card.personalReading
                    }
                });
            }
            if (card.card.companyName !== undefined) {
                cardParam.push({
                    company_name: card.card.companyName
                })
            }
            if (card.card.companyReading !== undefined) {
                cardParam.push({
                    company_reading: card.card.companyReading
                })
            }
            if (card.card.section !== undefined) {
                cardParam.push({
                    section: card.card.section
                });
            }
            if (card.card.zipCode !== undefined) {
                cardParam.push({
                    zipCode: card.card.zipCode
                });
            }
            if (card.card.physicalAddress !== undefined) {
                cardParam.push({
                    physical_address: card.card.physicalAddress
                });
            }
            if (card.card.map !== undefined) {
                cardParam.push({
                    map: card.card.map
                });
            }
            if (card.card.route !== undefined) {
                const route: any = [];
                if (card.card.route.path !== undefined) {
                    route.push({
                        path: card.card.route.path
                    });
                }
                if (card.card.route.time !== undefined) {
                    route.push({
                        time: card.card.route.time
                    });
                }
                if (card.card.route.fare !== undefined) {
                    route.push({
                        fare: card.card.route.fare
                    });
                }
                cardParam.push({
                    route: route
                });
            }
            if (card.card.companyTel !== undefined) {
                cardParam.push({
                    company_tel: card.card.companyTel
                });
            }
            if (card.card.companyFax !== undefined) {
                cardParam.push({
                    company_fax: card.card.companyFax
                });
            }
            if (card.card.url !== undefined) {
                cardParam.push({
                    url: card.card.url
                });
            }
            if (card.card.post !== undefined) {
                cardParam.push({
                    post: card.card.post
                });
            }
            if (card.card.personalTel !== undefined) {
                cardParam.push({
                    personal_tel: card.card.personalTel
                });
            }
            if (card.card.email !== undefined) {
                cardParam.push({
                    email: card.card.email
                });
            }
            if (card.card.image !== undefined) {
                cardParam.push({
                    image: [
                        {
                            _attr: {
                                mime_type: card.card.image.mimeType
                            }
                        },
                        {
                            file: {
                                _attr: {
                                    name: card.card.image.name,
                                    file_id: card.card.image.fileId,
                                    size: card.card.image.size
                                }
                            }
                        }
                    ]
                })
            }
            if (card.card.description !== undefined) {
                cardParam.push({
                    description: card.card.description
                });
            }
            modifyCard.push({
                card: cardParam
            });

            if (card.files !== undefined) {
                card.files.forEach(file => {
                    modifyCard.push({
                        file: [
                            {
                                _attr: {
                                    id: file.id
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            parameters.push({
                modify_card: modifyCard
            });
        });
        return this.client.post(this.path, 'AddressModifyCards', parameters).then((res: address.CardsResponse) => {
            const cards: address.CardType[] = [];
            res.card.forEach(obj => {
                cards.push(AddressConverter.Card.toObject(obj));
            });
            return cards;
        });
    }

    public removeShaerdCards(bookId: string, cardIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        parameters.push({
            _attr: {
                book_id: bookId
            }
        });
        cardIds.forEach(cardId => {
            parameters.push({
                card_id: cardId
            });
        });
        return this.client.post(this.path, 'AddressRemoveSharedCards', parameters).then(() => {
        });
    }
}
