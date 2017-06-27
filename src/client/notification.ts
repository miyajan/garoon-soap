import Client from "./client";
import Setting from "./setting";
import * as notification from "../type/notification";
import * as NotificationConverter from "../converter/notification";
import * as datetime from "../util/datetime";

export default class Mail {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/notification/api.csp' : '/cbpapi/notification/api';
    }

    public getNotificationVersions(notificationItems: notification.NotificationItemVersionType[], start: Date, end?: Date, moduleId?: string): Promise<notification.NotificationItemVersionResultType[]> {
        const parameters: Object[] = [];
        notificationItems.forEach(notificationItem => {
            parameters.push({
                notification_item: [
                    {
                        notification_id: {
                            _attr: {
                                module_id: notificationItem.notificationId.moduleId,
                                item: notificationItem.notificationId.item
                            }
                        }
                    },
                    {
                        _attr: {
                            version: notificationItem.version
                        }
                    }
                ]
            });
        });
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        if (moduleId !== undefined) {
            attr.module_id = moduleId;
        }
        parameters.push({_attr: attr});
        return this.client.post(this.path, 'NotificationGetNotificationVersions', parameters).then((res: notification.NotificationItemsResponse) => {
            const versions: notification.NotificationItemVersionResultType[] = [];
            if (res.notification_item !== undefined) {
                res.notification_item.forEach(obj => {
                    versions.push(NotificationConverter.NotificationItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getNotificationsById(notificationIds: notification.NotificationIdType[]): Promise<notification.NotificationType[]> {
        const parameters: Object[] = [];
        notificationIds.forEach(notificationId => {
            parameters.push({
                notification_id: {
                    _attr: {
                        module_id: notificationId.moduleId,
                        item: notificationId.item
                    }
                }
            });
        });
        return this.client.post(this.path, 'NotificationGetNotificationsById', parameters).then((res: notification.NotificationsResponse) => {
            const notifications: notification.NotificationType[] = [];
            if (res.notification !== undefined) {
                res.notification.forEach(obj => {
                    notifications.push(NotificationConverter.Notification.toObject(obj));
                });
            }
            return notifications;
        });
    }
}
