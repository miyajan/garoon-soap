export interface NotificationIdType {
    moduleId: string
    item: string
}

export interface NotificationItemVersionType {
    notificationId: NotificationIdType
    version: string
}

export interface NotificationItemVersionResultType {
    notificationId: NotificationIdType
    version: string
    operation: string
}

export interface NotificationIdXMLObject {
    $: any
}

export interface NotificationItemVersionResultXMLObject {
    notification_id: NotificationIdXMLObject[]
    $: any
}

export interface NotificationItemsResponse {
    notification_item?: NotificationItemVersionResultXMLObject[]
}

export interface NotificationType {
    moduleId: string
    item: string
    status: string
    isHistory: boolean
    readDatetime?: Date
    receiveDatetime?: Date
    subject?: string
    subjectUrl?: string
    subjectIcon?: string
    abstract?: string
    abstractUrl?: string
    abstractIcon?: string
    senderName?: string
    senderId?: string
    senderUrl?: string
    attached?: boolean
    version?: string
}

export interface NotificationXMLObject {
    $: any
}

export interface NotificationsResponse {
    notification?: NotificationXMLObject[]
}

export interface NotificationHistoryItemsResponse {
    notification_history_item?: NotificationItemVersionResultXMLObject[]
}
