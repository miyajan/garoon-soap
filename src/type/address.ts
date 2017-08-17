import * as base from "./base";

export interface NameFieldValueType {
    family: string
    given: string
}

export interface RouteFieldValueType {
    path?: string
    time?: string
    fare?: string
}

export interface FileFieldValueType {
    name: string
    fileId: string
    size: string
    mimeType: string
}

export interface CardType {
    bookId: string
    id: string
    version: string
    creator: base.ChangeLogType
    modifier?: base.ChangeLogType
    subject: string
    personalName?: NameFieldValueType
    personalReading?: NameFieldValueType
    companyName?: string
    companyReading?: string
    section?: string
    zipCode?: string
    physicalAddress?: string
    map?: string
    route?: RouteFieldValueType
    companyTel?: string
    companyFax?: string
    url?: string
    post?: string
    personalTel?: string
    email?: string
    image?: FileFieldValueType
    description?: string
}

export interface NameFieldValueXMLObject {
    part: string[]
}

export interface RouteFieldValueXMLObject {
    path?: string[]
    time?: string[]
    fare?: string[]
}

export interface FileFieldValueXMLObject {
    $: any
}

export interface CardXMLObject {
    $: any
    creator: base.ChangeLogXMLObject[]
    modifier?: base.ChangeLogXMLObject[]
    subject: string[]
    personal_name?: NameFieldValueXMLObject[]
    personal_reading?: NameFieldValueXMLObject[]
    company_name?: string[]
    company_reading?: string[]
    section?: string[]
    zip_code?: string[]
    physical_address?: string[]
    map?: string[]
    route?: RouteFieldValueXMLObject[]
    company_tel?: string[]
    company_fax?: string[]
    url?: string[]
    post?: string[]
    personal_tel?: string[]
    email?: string[]
    image?: FileFieldValueXMLObject[]
    description?: string[]
}

export interface CardsResponse {
    card: CardXMLObject[]
}

export interface BookType {
    cardIds: string[]
    key: string
    bookId: string
    name: string
    type: string
    version: string
}

export interface CardXMLObject {
    $: any
}

export interface CardsXMLObject {
    card?: CardXMLObject[]
}

export interface BookXMLObject {
    $: any
    cards: CardsXMLObject[]
}

export interface BooksResponse {
    book?: BookXMLObject[]
}

export interface BookItemsResponse {
    book_item?: base.ItemVersionResultXMLObject[]
}

export interface CardItemsResponse {
    card_item?: base.ItemVersionResultXMLObject[]
}

export interface BookIdsResponse {
    book_id?: string[]
}

export interface MyAddressGroupItemsResponse {
    my_address_group_item?: base.ItemVersionResultXMLObject[]
}

export interface MyAddressGroupCardType {
    id: string
    type: string
}

export interface MyAddressGroupType {
    id: string
    version: string
    name: string
    description?: string
    userIds: string[]
    cards: MyAddressGroupCardType[]
}

export interface MyAddressGroupUserXMLObject {
    $: any
}

export interface MyAddressGroupCardXMLObject {
    $: any
}

export interface MyAddressGroupXMLObject {
    $: any
    user?: MyAddressGroupUserXMLObject[]
    card?: MyAddressGroupCardXMLObject[]
}

export interface MyAddressGroupsResponse {
    my_address_group?: MyAddressGroupXMLObject[]
}

export interface AddMyAddressGroupType {
    name: string
    description?: string
}

export interface ModifyMyAddressGroupType {
    id: string
    name: string
    description?: string
}

export interface ModifyCardsInMyAddressGroupType {
    id: string
    userIds?: string[]
    cards?: MyAddressGroupCardType[]
}

export interface AddCardType {
    bookId: string
    subject: string
    personalName?: NameFieldValueType
    personalReading?: NameFieldValueType
    companyName?: string
    companyReading?: string
    section?: string
    zipCode?: string
    physicalAddress?: string
    map?: string
    route?: RouteFieldValueType
    companyTel?: string
    companyFax?: string
    url?: string
    post?: string
    personalTel?: string
    email?: string
    image?: FileFieldValueType
    description?: string
}

export interface FileType {
    id: string
    content: Buffer
}

export interface CardContainsFileType {
    card: AddCardType
    files?: FileType[]
}

export interface ModifyCardType {
    bookId: string
    id: string
    subject: string
    personalName?: NameFieldValueType
    personalReading?: NameFieldValueType
    companyName?: string
    companyReading?: string
    section?: string
    zipCode?: string
    physicalAddress?: string
    map?: string
    route?: RouteFieldValueType
    companyTel?: string
    companyFax?: string
    url?: string
    post?: string
    personalTel?: string
    email?: string
    image?: FileFieldValueType
    description?: string
}

export interface ModifyCardContainsFileType {
    card: ModifyCardType
    files?: FileType[]
}
