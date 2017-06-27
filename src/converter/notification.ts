import * as notification from "../type/notification";
import * as util from "../util";
import * as datetime from "../util/datetime";

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

export class Notification {
    static toObject(xmlObj: notification.NotificationXMLObject): notification.NotificationType {
        const attr = xmlObj.$;
        const notification: notification.NotificationType = {
            moduleId: attr.module_id,
            item: attr.item,
            status: attr.status,
            isHistory: util.toBoolean(attr.is_history)
        };

        if (attr.read_datetime !== undefined) {
            notification.readDatetime = datetime.toDate(attr.read_datetime);
        }
        if (attr.receive_datetime !== undefined) {
            notification.receiveDatetime = datetime.toDate(attr.receive_datetime);
        }
        if (attr.subject !== undefined) {
            notification.subject = attr.subject;
        }
        if (attr.subject_url !== undefined) {
            notification.subjectUrl = attr.subject_url;
        }
        if (attr.subject_icon !== undefined) {
            notification.subjectIcon = attr.subject_icon;
        }
        if (attr.abstract !== undefined) {
            notification.abstract = attr.abstract;
        }
        if (attr.abstract_url !== undefined) {
            notification.abstractUrl = attr.abstract_url;
        }
        if (attr.abstract_icon !== undefined) {
            notification.abstractIcon = attr.abstract_icon;
        }
        if (attr.sender_name !== undefined) {
            notification.senderName = attr.sender_name;
        }
        if (attr.sender_id !== undefined) {
            notification.senderId = attr.senderId;
        }
        if (attr.sender_url !== undefined) {
            notification.senderUrl = attr.sender_url;
        }
        if (attr.attached !== undefined) {
            notification.attached = util.toBoolean(attr.attached);
        }
        if (attr.version !== undefined) {
            notification.version = attr.version;
        }

        return notification;
    }
}
