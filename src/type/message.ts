import * as base from "./base";

export interface ThreadItemsResponse {
    thread_item?: base.ItemVersionResultXMLObject[]
}

export interface Addressee {
    userId?: string
    name: string
    deleted: boolean
    confirmed?: boolean
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

export interface SearchOption {
    text: string
    start: Date
    end?: Date
    folderId?: string
    searchSubFolders?: boolean
    titleSearch: boolean
    bodySearch: boolean
    fromSearch: boolean
    addresseeSearch: boolean
    followSearch: boolean
}

export interface CreateFile {
    content: Buffer
}

export interface CreateContent {
    body: string
    htmlBody?: string
}

export interface CreateThreadType {
    addressees: string[]
    content: CreateContent
    subject: string
    confirm: boolean
    isDraft?: boolean
    files?: CreateFile[]
}

export interface ModifyContent {
    body: string
    htmlBody?: string
}

export interface ModifyFile {
    content: Buffer
    id: string
}

export interface ModifyThreadType {
    addressees: string[]
    content: ModifyContent
    id: string
    subject: string
    isDraft?: boolean
    files?: ModifyFile[]
}

export interface DraftFile {
    content: Buffer
}

export interface DraftContent {
    body: string
    htmlBody?: string
}

export interface DraftThreadType {
    addressees: string[]
    content: DraftContent
    subject: string
    confirm: boolean
    files?: DraftFile[]
}

export interface RemoveThreadType {
    folderId: string
    threadId: string
}

export interface FollowType {
    files: File[]
    creator?: base.ChangeLogType
    id: string
    number: string
    text: string
    htmlText?: string
}

export interface FollowTypeXMLObject {
    $: any
    file?: FileXMLObject[]
    creator?: base.ChangeLogXMLObject[]
}

export interface FollowsResponseType {
    follow?: FollowTypeXMLObject[]
}

export interface AddFile {
    name: string
    content: Buffer
}

export interface AddFollowType {
    threadId: string
    files?: AddFile[]
    text: string
    htmlText?: string
}

export interface FolderItemsResponse {
    folder_item?: base.ItemVersionResultXMLObject[]
}

export interface FolderType {
    children: string[]
    threads: string[]
    id: string
    version: string
    name: string
    description?: string
    order?: number
    parent?: string
    folderType: string
}

export interface ChildFolderXMLObject {
    $: any
}

export interface FolderThreadXMLObject {
    $: any
}

export interface FolderTypeXMLObject {
    $: any
    folder?: ChildFolderXMLObject[]
    thread?: FolderThreadXMLObject[]
}

export interface FoldersResponse {
    folder?: FolderTypeXMLObject[]
}

export interface ProfileType {
    useTrash: boolean
    trashDuration: number
    checkSendConfirm?: boolean
    confirmAction?: string
}

export interface PersonalProfileXMLObject {
    $: any
}

export interface SystemProfileXMLObject {
    $: any
}

export interface ProfilesResponse {
    personal_profile: PersonalProfileXMLObject[]
    system_profile: SystemProfileXMLObject[]
}
