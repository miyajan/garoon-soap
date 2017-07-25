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

export interface CategoryType {
    id: string
    code: string
    name: string
    parentCategory?: string
    memo?: string
    created?: Date
    lastUpdate?: Date
    children: CategoryType[]
}

export interface CategoryXMLObject {
    $: any
    child_category?: CategoryXMLObject[]
}

export interface RootResponse {
    root: CategoryXMLObject[]
}

export interface RequestFormType {
    fid: string
    type: string
    name: string
    active: boolean
    iconType: string
    iconId?: string
    iconUrl?: string
    categoryId: string
}

export interface RequestFormXMLObject {
    $: any
}

export interface CategoryRequestFormXMLObject {
    $: any
    requestForm: RequestFormXMLObject[]
}

export interface CategoryRequestFormsResponse {
    category: CategoryRequestFormXMLObject[]
}

export interface DelegatorIdsResponse {
    delegator_id?: string[]
}

export interface UserProxyType {
    userId: string
    approverIds: string[]
    applicantIds: string[]
}

export interface ProxyApproverXMLObject {
    $: any
}

export interface ProxyApplicantXMLObject {
    $: any
}

export interface UserProxyXMLObject {
    $: any
    proxy_approver?: ProxyApproverXMLObject[]
    proxy_applicant?: ProxyApplicantXMLObject[]
}

export interface ProxiesXMLObject {
    user_proxy?: UserProxyXMLObject[]
}

export interface ProxiesResponse {
    proxies: ProxiesXMLObject[]
}

export interface GetAttachedFileBodyType {
    requestFormId: string
    fileId: string
}

export interface FileHeaderType {
    fileId: string
    requestFormId: string
    name: string
    size: string
}

export interface FileInformationType {
    subject: string
    versioning: string
    createTime: Date
    modifyTime: Date
    description?: string
}

export interface FileAttachedDetailType {
    fileHeader: FileHeaderType
    fileInformation: FileInformationType
}

export interface FileHeaderXMLObject {
    $: any
}

export interface FileInformationXMLObject {
    $: any
}

export interface FileAttachedDetailXMLObject {
    file_header: FileHeaderXMLObject[]
    file_information: FileInformationXMLObject[]
}

export interface AttachmentDetailsResponse {
    attachment_details: FileAttachedDetailXMLObject[]
}

export interface AvailabilityUserType {
    id: string
    workflow: boolean
    keitai: boolean
}

export interface AvailabilityUserXMLObject {
    $: any
}

export interface UsersResponse {
    user: AvailabilityUserXMLObject[]
}

export interface ProfilesType {
    usePendingApprovals: boolean
    useProxyApprovals: boolean
    modifyProxies: boolean
}

export interface ProfilesXMLObject {
    $: any
}
