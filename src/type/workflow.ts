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

export abstract class OperationType {
    protected tag: string;

    public getXMLObj(): Object {
        const obj: any = {};
        obj[this.tag] = '';
        return obj;
    }
}

export class SentBackType extends OperationType {
    constructor() {
        super();
        this.tag = 'send_back';
    }
}

export class ApproveType extends OperationType {
    constructor() {
        super();
        this.tag = 'approve';
    }
}

export class RejectType extends OperationType {
    constructor() {
        super();
        this.tag = 'reject';
    }
}

export class WithdrawType extends OperationType {
    constructor() {
        super();
        this.tag = 'withdraw';
    }
}

export class CancelType extends OperationType {
    constructor() {
        super();
        this.tag = 'cancel';
    }
}

export class ConfirmType extends OperationType {
    constructor() {
        super();
        this.tag = 'confirm';
    }
}

export class AcknowledgeType extends OperationType {
    constructor() {
        super();
        this.tag = 'acknowledge';
    }
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
    statusType?: string
    applicant: ApplicantType
    items: ItemType[]
    steps: StepType[]
    operations: OperationType[]
    folders: FolderType[]
}

export interface ApplicationXMLObject {
    $: any
    $$: base.XMLObject[]
}

export interface ApplicationsResponse {
    $$?: ApplicationXMLObject[]
}

export interface GetRequestType {
    requestFormId: string
    filter?: string
    startRequestDate?: Date
    endRequestDate?: Date
    startApprovalDate?: Date
    endApprovalDate?: Date
    applicant?: string
    lastApproval?: string
    startToGetInformationFrom?: string
    maximumRequestAmountToGet?: string
}

export interface ManageItemDetailType {
    pid: string
    number: string
    priority: string
    subject: string
    status: string
    applicant: string
    lastApprover: string
    requestDate: Date
}

export interface ManageFormType {
    manageItemDetail?: ManageItemDetailType
    idRequestForm?: string
    nameRequestForm?: string
}

export interface RequestManageFormType {
    manageRequestForm?: ManageFormType
    idCategory?: string
    nameCategory?: string
}

export interface ManageItemDetailXMLObject {
    $: any
}

export interface ManageFormXMLObject {
    $: any
    manage_item_detail?: ManageItemDetailXMLObject[]
}

export interface RequestManageFormXMLObject {
    $: any
    manage_request_form?: ManageFormXMLObject[]
}

export interface CategoriesResponse {
    category?: RequestManageFormXMLObject[]
}

export interface HandleApplicationOperationType {
    applicationId: string
    delegatorId?: string
    comment?: string
    operation: OperationType
}
