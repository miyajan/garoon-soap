import * as notification from "../type/notification";

export class NotificationItemVersionResult {
    static toObject(xmlObj: notification.NotificationItemVersionResultXMLObject): notification.NotificationItemVersionResultType {
        const attr = xmlObj.$;
        return {
            notificationId: NotificationId.toObject(xmlObj.notification_id[0]),
            version: attr.version,
            operation: attr.operation
        };
    }
}

export class NotificationId {
    static toObject(xmlObj: notification.NotificationIdXMLObject): notification.NotificationIdType {
        const attr = xmlObj.$;
        return {
            moduleId: attr.module_id,
            item: attr.item
        };
    }
}
