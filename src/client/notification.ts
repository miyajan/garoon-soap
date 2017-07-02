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

    public getNotificationHistoryVersions(historyItems: notification.NotificationItemVersionType[], start: Date, end?: Date, moduleId?: string): Promise<notification.NotificationItemVersionResultType[]> {
        const parameters: Object[] = [];
        historyItems.forEach(historyItem => {
            parameters.push({
                notification_history_item: [
                    {
                        notification_id: {
                            _attr: {
                                module_id: historyItem.notificationId.moduleId,
                                item: historyItem.notificationId.item
                            }
                        }
                    },
                    {
                        _attr: {
                            version: historyItem.version
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
        return this.client.post(this.path, 'NotificationGetNotificationHistoryVersions', parameters).then((res: notification.NotificationHistoryItemsResponse) => {
            const versions: notification.NotificationItemVersionResultType[] = [];
            if (res.notification_history_item !== undefined) {
                res.notification_history_item.forEach(obj => {
                    versions.push(NotificationConverter.NotificationItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getNotificationHistoriesById(historyIds: notification.NotificationIdType[]): Promise<notification.NotificationType[]> {
        const parameters: Object[] = [];
        historyIds.forEach(historyId => {
            parameters.push({
                notification_history_id: {
                    _attr: {
                        module_id: historyId.moduleId,
                        item: historyId.item
                    }
                }
            });
        });
        return this.client.post(this.path, 'NotificationGetNotificationHistoriesById', parameters).then((res: notification.NotificationHistoriesResponse) => {
            const notifications: notification.NotificationType[] = [];
            if (res.notification_history !== undefined) {
                res.notification_history.forEach(obj => {
                    notifications.push(NotificationConverter.Notification.toObject(obj));
                });
            }
            return notifications;
        });
    }

    public confirmNotifications(notificationIds: notification.NotificationIdType[]): Promise<notification.NotificationType[]> {
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
        return this.client.post(this.path, 'NotificationConfirmNotification', parameters).then((res: notification.NotificationsResponse) => {
            const notifications: notification.NotificationType[] = [];
            if (res.notification !== undefined) {
                res.notification.forEach(obj => {
                    notifications.push(NotificationConverter.Notification.toObject(obj));
                });
            }
            return notifications;
        });
    }

    public getProfiles(): Promise<notification.PersonalProfileType> {
        return this.client.post(this.path, 'NotificationGetProfiles', []).then((res: notification.PersonalProfileResponse) => {
            return NotificationConverter.PersonalProfile.toObject(res.personal_profile[0]);
        });
    }
}
