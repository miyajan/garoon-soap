export interface HistoryType {
    version: string
    active: boolean
    name: string
    action: number
    comment: string
    modifierId: string
    modifierLoginName: string
    modifierDisplayName: string
    modifyTime: Date
}

export interface FileType {
    id: string
    folderId: string
    title: string
    maxVersion: number
    name: string
    size: string
    mimeType: string
    description?: string
    creatorId: string
    creatorLoginName: string
    creatorDisplayName: string
    createTime: Date
    modifierId?: string
    modifierLoginName?: string
    modifierDisplayName?: string
    modifyTime?: Date
    histories: HistoryType[]
}

export interface FileInformationType {
    parentId: string
    parentCode: string
    files: FileType[]
}

export interface HistoryXMLObject {
    version: string[]
    active: string[]
    name: string[]
    action: string[]
    comment: string[]
    modifier_id: string[]
    modifier_login_name: string[]
    modifier_display_name: string[]
    modify_time: string[]
}

export interface HistoriesXMLObject {
    history: HistoryXMLObject[]
}

export interface FileXMLObject {
    $: any
    title: string[]
    max_version: string[]
    name: string[]
    size: string[]
    mime_type: string[]
    description?: string[]
    creator_id: string[]
    creator_login_name: string[]
    creator_display_name: string[]
    create_time: string[]
    modifier_id?: string[]
    modifier_login_name?: string[]
    modifier_display_name?: string[]
    modify_time?: string[]
    histories: HistoriesXMLObject[]
}

export interface FilesXMLObject {
    $: any
    file?: FileXMLObject[]
}

export interface FileInformationXMLObject {
    files: FilesXMLObject[]
}

export interface FileInformationResponse {
    file_information: FileInformationXMLObject[]
}

export interface SimpleFileType {
    id: string
    folderId: string
    title: string
    maxVersion: number
    name: string
    size: string
    mimeType: string
    description?: string
    creatorId: string
    creatorLoginName: string
    creatorDisplayName: string
    createTime: Date
    modifierId?: string
    modifierLoginName?: string
    modifierDisplayName?: string
    modifyTime?: Date
}

export interface SimpleFileXMLObject {
    $: any
    title: string[]
    max_version: string[]
    name: string[]
    size: string[]
    mime_type: string[]
    description?: string[]
    creator_id: string[]
    creator_login_name: string[]
    creator_display_name: string[]
    create_time: string[]
    modifier_id?: string[]
    modifier_login_name?: string[]
    modifier_display_name?: string[]
    modify_time?: string[]
}

export interface SimpleFileResponse {
    file: SimpleFileXMLObject[]
}
