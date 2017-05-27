import * as base from "./base";

export interface MailItemsResponse {
    mail_item?: base.ItemVersionResultXMLObject[]
}

export interface MailAddressType {
    name?: string
    address: string
}

export interface FileType {
    id: string
    name: string
    size: number
    mimeType: string
}

export interface MailSourceType {
    id: string
    size?: number
}

export interface MailType {
    id: string
    version: string
    subject: string
    body: string
    htmlBody?: string
    date?: Date
    read?: Date
    size?: number
    isSent?: boolean
    isDraft?: boolean
    folderId: string
    from?: MailAddressType
    sender?: MailAddressType
    to?: MailAddressType[]
    cc?: MailAddressType[]
    bcc?: MailAddressType[]
    replyTo?: MailAddressType
    dispositionNotificationTo?: MailAddressType
    files: FileType[]
    source?: MailSourceType
}

export interface MailAddressXMLObject {
    $: any
}

export interface FileXMLObject {
    $: any
}

export interface MailSourceXMLObject {
    $: any
}

export interface MailXMLObject {
    $: any
    from?: MailAddressXMLObject[]
    sender?: MailAddressXMLObject[]
    to?: MailAddressXMLObject[]
    cc?: MailAddressXMLObject[]
    bcc?: MailAddressXMLObject[]
    reply_to?: MailAddressXMLObject[]
    disposition_notification_to?: MailAddressXMLObject[]
    file?: FileXMLObject[]
    source?: MailSourceXMLObject[]
}

export interface MailsResponse {
    mail?: MailXMLObject[]
}

export interface SourceResponse {
    source: base.FileXMLObject[]
}

export interface NewArrivingEmailType {
    id: string
    name: string
    email: string
    newMails: number
    disabled: boolean
    deleted: boolean
}

export interface NewArrivingEmailXMLObject {
    $: any
}

export interface AccountsResponse {
    account?: NewArrivingEmailXMLObject[]
}
