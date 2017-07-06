import * as base from "./base";

export interface ApplicationItemsResponse {
    application_item?: base.ItemVersionResultXMLObject[]
}

export interface ProxyType {
    id?: string
    name: string
}

export interface ApplicantType {
    id?: string
    name: string
    proxy?: ProxyType
}

export class ItemType {
}

export class ValueItemType extends ItemType {
    readonly name: string;
    readonly value: string;
    readonly rightAlign: boolean;

    constructor(name: string, value: string, rightAlign: boolean) {
        super();
        this.name = name;
        this.value = value;
        this.rightAlign = rightAlign;
    }
}

export interface FileType {
    name: string
    fileId: string
    size?: string
    mimeType?: string
}

export class FileItemType extends ItemType {
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

export interface ProcessorType {
    id?: string
    name?: string
    date?: Date
    comment?: string
    result?: string
    proxy?: ProxyType
}

export interface StepType {
    id: string
    name: string
    type: string
    isApprovalStep: boolean
    processors: ProcessorType[]
}

export class OperationType {
}

export class SentBackType extends OperationType {
}

export class ApproveType extends OperationType {
}

export class RejectType extends OperationType {
}

export class WithdrawType extends OperationType {
}

export class CancelType extends OperationType {
}

export class ConfirmType extends OperationType {
}

export class AcknowledgeType extends OperationType {
}

export interface FolderType {
    id: string
    type: string
}

export interface ApplicationType {
    id: string
    version: string
    status: string
    date: Date
    processingStep: string
    name?: string
    number?: string
    urgent?: boolean
    statusType: string
    applicant: ApplicantType
    items: ItemType[]
    steps: StepType[]
    operations: OperationType[]
    folders: FolderType[]
}
