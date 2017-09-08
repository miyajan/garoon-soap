import * as base from "./base";

export interface ThreadItemsResponse {
    thread_item?: base.ItemVersionResultXMLObject[]
}

export class ItemType {
}

export class ValueItemType extends ItemType {
    readonly name: string;
    readonly value: string;
    readonly front?: string;
    readonly back?: string;

    constructor(name: string, value: string, front?: string, back?: string) {
        super();
        this.name = name;
        this.value = value;
        this.front = front;
        this.back = back;
    }
}

export interface FileType {
    name: string
    fileId: string
    size?: string
    mimeType?: string
}

export class FilesItemType extends ItemType {
    readonly name: string;
    readonly inline: boolean;
    readonly files: FileType[];

    constructor(name: string, inline: boolean, files: FileType[]) {
        super();
        this.name = name;
        this.inline = inline;
        this.files = files;
    }
}

export class BlankItemType extends ItemType {
}

export interface UserType {
    id: string
    name: string
}

export interface ReportType {
    id: string
    subject: string
    isDraft: boolean
    items: ItemType[]
    members: UserType[]
    notifyUsers: UserType[]
    maintainers: UserType[]
    creator: base.ChangeLogType
    modifier: base.ChangeLogType
}

export interface ReportXMLObject {
    $: any
    $$: base.XMLObject[]
}

export interface ReportsResponse {
    $$?: ReportXMLObject[]
}

export interface FollowType {
    id: string
    number: string
    text: string
    htmlText?: string
    creator: base.ChangeLogType
    files: FileType[]
}

export interface FileXMLObject {
    $: any
}

export interface FollowXMLObject {
    $: any
    creator: base.ChangeLogXMLObject[]
    file?: FileXMLObject[]
}

export interface FollowsResponse {
    follow: FollowXMLObject[]
}

export interface AddFileType {
    name: string
    content: Buffer
}

export interface AddFollowType {
    reportId: string
    text: string
    htmlText?: string
    files?: AddFileType[]
}
