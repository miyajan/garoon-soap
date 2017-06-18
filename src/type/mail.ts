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

export interface NewArrivingEmailAccountsResponse {
    account?: NewArrivingEmailXMLObject[]
}

export interface MoveMailsOperationType {
    folderId: string
    mailId: string
}

export interface AddFolderOperationType {
    accountId: string
    parentFolderId?: string
    name: string
    description?: string
}

export interface FolderType {
    id: string
    description: string
    subscribe: boolean
    mailIds: string[]
    name: string
    order: string
}

export interface FolderMailXMLObject {
    $: any
}

export interface FolderXMLObject {
    $: any
    mail?: FolderMailXMLObject[]
}

export interface FoldersResponse {
    folder?: FolderXMLObject[]
}

export interface ModifyFolderOperationType {
    accountId: string
    parentFolderId?: string
    folderId: string
    name: string
    description?: string
}

export interface AccountItemVersionsResponse {
    account_item?: base.ItemVersionResultXMLObject[]
}

export interface SizeConditionType {
    content: number
    method: string
}

export interface ExprConditionType {
    target: string
    content?: string
    method: string
}

export interface FilterType {
    name: string
    folder: string
    operation: string
    status?: string
    sizeConditions?: SizeConditionType[]
    exprConditions?: ExprConditionType[]
}

export interface BuiltinFolderType {
    id: string
    description: string
    subscribe: boolean
    mailIds: string[]
}

export interface MailboxType {
    filters: FilterType[]
    inbox?: BuiltinFolderType
    sent?: BuiltinFolderType
    draft?: BuiltinFolderType
    trash?: BuiltinFolderType
    folders: FolderType[]
}

export interface AccountSignatureType {
    name: string
    signature: string
}

export interface AccountType {
    id: string
    version: string
    userId: string
    serverId: string
    email: string
    username: string
    password: string
    mailboxes: MailboxType[]
    signatures: AccountSignatureType[]
}

export interface SizeConditionXMLObject {
    $: any
}

export interface ExprConditionXMLObject {
    $: any
}

export interface FiltersXMLObject {
    filter?: FilterXMLObject[]
}

export interface FilterXMLObject {
    $: any
    size?: SizeConditionXMLObject[]
    expr?: ExprConditionXMLObject[]
}

export interface MailIdXMLObject {
    $: any
}

export interface BuiltinFolderXMLObject {
    $: any
    mail?: MailIdXMLObject[]
}

export interface MailboxXMLObject {
    filters?: FiltersXMLObject[]
    inbox?: BuiltinFolderXMLObject[]
    sent?: BuiltinFolderXMLObject[]
    draft?: BuiltinFolderXMLObject[]
    trash?: BuiltinFolderXMLObject[]
    folder?: FolderXMLObject[]
}

export interface AccountSignatureXMLObject {
    $: any
    _: string
}

export interface AccountSignaturesXMLObject {
    signature?: AccountSignatureXMLObject[]
}

export interface AccountXMLObject {
    $: any
    mailbox?: MailboxXMLObject[]
    signatures?: AccountSignaturesXMLObject[]
}

export interface AccountsResponse {
    account?: AccountXMLObject[]
}

export interface CreateUserAccountType {
    userId: string
    userAccountCode: string
    userAccountName?: string
    mailServerId: string
    email: string
    accountName: string
    password?: string
    leaveServerMail?: boolean
    deactivateUserAccount?: boolean
}

export interface UserAccountType {
    accountId: string
    userId: string
    userAccountCode: string
    userAccountName: string
    mailServerId: string
    email: string
    accountName: string
    leaveServerMail: boolean
    deactivateUserAccount: boolean
}

export interface AccountInfoXMLObject {
    $: any
}

export interface MailSettingXMLObject {
    $: any
}

export interface UserAccountXMLObject {
    account_info: AccountInfoXMLObject[]
    mail_setting: MailSettingXMLObject[]
}

export interface UserAccountsResponse {
    user_accounts: UserAccountXMLObject[]
}

export interface EditUserAccountType {
    accountId: string
    userId: string
    userAccountCode: string
    userAccountName?: string
    mailServerId: string
    email: string
    accountName: string
    password?: string
    leaveServerMail?: boolean
    deactivateUserAccount?: boolean
}

export interface DeleteUserAccountType {
    accountId: string
    deleteAllEmail?: boolean
}

export interface SignatureType {
    accountId: string
    name: string
    content: string
}

export interface SignatureXMLObject {
    $: any
}

export interface SignaturesResponse {
    signature?: SignatureXMLObject[]
}

export interface FiltersResponse {
    filter?: FilterXMLObject[]
}

export interface FromNameType {
    accountId: string
    name: string
}

export interface PersonalProfileType {
    showPreview: boolean
    sendCharset: string
    useTrash: boolean
    useMessageDispositionNotification: boolean
    useStatus?: boolean
    replyMessageDispositionNotification: string
    fromNames: FromNameType[]
}

export interface MailSizeLimitsType {
    totalKb?: number
    receiveKb?: number
    sendKb?: number
}

export interface UserAuthoritiesType {
    allowAccountAllPermission: boolean
    allowAccountModification: boolean
    allowStoreOnServer: boolean
    allowNewMailCheck: boolean
    allowCollectiveReception: boolean
    allowSendMarkupBody: boolean
    allowDisplayMarkupImage: boolean
    allowMessageDispositionNotification: boolean
    allowStatus: boolean
    allowHistory: boolean
}

export interface AutoReceiveType {
    interval?: Date
    receiveTimes: Date[]
}

export interface SystemProfileType {
    disableClient: boolean
    checkNewMailAtLogin: boolean
    limit: MailSizeLimitsType
    authority: UserAuthoritiesType
    autoReceive?: AutoReceiveType
}

export interface ProfilesType {
    personalProfile: PersonalProfileType
    systemProfile?: SystemProfileType
}

export interface FromNameXMLObject {
    $: any
}

export interface PersonalProfileXMLObject {
    $: any
    from_name?: FromNameXMLObject[]
}

export interface MailSizeLimitsXMLObject {
    $: any
}

export interface UserAuthoritiesXMLObject {
    $: any
}

export interface AutoReceiveXMLObject {
    $: any
    receive_time?: string[]
}

export interface SystemProfileXMLObject {
    $: any
    limit: MailSizeLimitsXMLObject[]
    authority: UserAuthoritiesXMLObject[]
    auto_receive?: AutoReceiveXMLObject[]
}

export interface ProfilesResponse {
    personal_profile: PersonalProfileXMLObject[]
    system_profile?: SystemProfileXMLObject[]
}

export interface PersonalProfileResponse {
    personal_profile: PersonalProfileXMLObject[]
}

export interface SendFileType {
    content: Buffer
    name: string
}

export interface SendMailType {
    accountId: string
    from?: string
    sender?: string
    to?: string
    cc?: string
    bcc?: string
    replyTo?: string
    draftId?: string
    subject: string
    body: string
    htmlBody?: string
    files?: SendFileType[]
    removeFileIds?: string[]
}

export interface ReplyMailType {
    accountId: string
    from?: string
    sender?: string
    to?: string
    cc?: string
    bcc?: string
    replyTo?: string
    draftId?: string
    id: string
    subject: string
    body: string
    htmlBody?: string
    files?: SendFileType[]
    removeFileIds?: string[]
}

export interface ForwardMailType {
    accountId: string
    mailId: string
    from?: string
    sender?: string
    to?: string
    cc?: string
    bcc?: string
    replyTo?: string
    draftId?: string
    subject: string
    body: string
    htmlBody?: string
    files?: SendFileType[]
    removeFileIds?: string[]
}
