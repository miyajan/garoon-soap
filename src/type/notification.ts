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
