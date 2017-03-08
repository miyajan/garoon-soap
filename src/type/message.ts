import * as base from "./base";

export interface ThreadItemsResponse {
    thread_item?: base.ItemVersionResultXMLObject[]
}

export interface Addressee {
    userId?: string
    name: string
    deleted: boolean
    confirmed: boolean
}

export interface File {
    id: string
    name: string
    size?: number
    mimeType?: string
}

export interface Content {
    files: File[]
    body: string
    htmlBody?: string
}

export interface Follow {
    id: string
    number: string
}

export interface ThreadType {
    addressees: Addressee[]
    content: Content
    follows: Follow[]
    folders: string[]
    creator?: base.ChangeLogType
    modifier?: base.ChangeLogType
    id: string
    version: string
    subject: string
    confirm: boolean
    snapshot?: Date
    isDraft?: boolean
}

export interface AddresseeXMLObject {
    $: any
}

export interface FileXMLObject {
    $: any
}

export interface ContentXMLObject {
    $: any
    file: FileXMLObject[]
}

export interface FollowXMLObject {
    $: any
}

export interface FolderXMLObject {
    $: any
}

export interface ThreadXMLObject {
    $: any
    addressee?: AddresseeXMLObject[]
    content: ContentXMLObject[]
    follow?: FollowXMLObject[]
    folder: FolderXMLObject[]
    creator?: base.ChangeLogXMLObject[]
    modifier?: base.ChangeLogXMLObject[]
}

export interface ThreadsResponse {
    thread?: ThreadXMLObject[]
}
