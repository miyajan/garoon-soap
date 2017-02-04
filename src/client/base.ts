import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as base from "../type/base";

export default class Base {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/base/api.csp' : '/cbpapi/base/api';
    }

    public getUsersById(userIds: number[]): Promise<Array<base.UserType>> {
        const parameters: Array<Object> = [];
        userIds.forEach(userId => {
            parameters.push({'user_id': userId});
        });
        return this.client.post(this.path, 'BaseGetUsersById', parameters).then((res: base.UsersResponse) => {
            const users: Array<base.UserType> = [];
            res['user'].forEach((obj: base.UserXMLObject) => {
                users.push(BaseConverter.User.toObject(obj));
            });
            return users;
        });
    }

    public getUsersByLoginName(loginNames: string[]): Promise<Array<base.UserType>> {
        const parameters: Array<Object> = [];
        loginNames.forEach(loginName => {
            parameters.push({'login_name': loginName});
        });
        return this.client.post(this.path, 'BaseGetUsersByLoginName', parameters).then((res: base.UsersResponse) => {
            const users: Array<base.UserType> = [];
            res['user'].forEach(obj => {
                users.push(BaseConverter.User.toObject(obj));
            });
            return users;
        });
    }

    public getUserVersions(userItems: base.ItemVersionType[]): Promise<Array<base.ItemVersionResultType>> {
        const parameters: Array<Object> = [];
        userItems.forEach(userItem => {
            parameters.push({
                'user_item': {
                    '_attr': {
                        id: userItem.id,
                        version: userItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'BaseGetUserVersions', parameters).then((res: base.UserItemsResponse) => {
            const userVersions: Array<base.ItemVersionResultType> = [];
            res['user_item'].forEach(obj => {
                userVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
            });
            return userVersions;
        });
    }

    public getCalendarEvents(): Promise<Array<base.BaseGetCalendarEventType>> {
        return this.client.post(this.path, 'BaseGetCalendarEvents', []).then((res: base.CalendarEventsResponse) => {
            const calendarEvents: Array<base.BaseGetCalendarEventType> = [];
            res['calendar_event'].forEach(obj => {
                calendarEvents.push(BaseConverter.BaseGetCalendarEvent.toObject(obj));
            });
            return calendarEvents;
        });
    }

    public getRegionsList(): Promise<Array<base.RegionType>> {
        return this.client.post(this.path, 'BaseGetRegionsList', []).then((res: base.RegionsResponse) => {
            const regions: Array<base.RegionType> = [];
            res['region'].forEach(obj => {
                regions.push(BaseConverter.Region.toObject(obj));
            });
            return regions;
        });
    }

    public getTimezoneVersion(): Promise<string> {
        return this.client.post(this.path, 'BaseGetTimezoneVersion', []).then((res: base.TimezoneVersionResponse) => {
            return res['timezone_version'][0];
        });
    }

    public getApplicationStatus(): Promise<Array<base.BaseApplicationType>> {
        return this.client.post(this.path, 'BaseGetApplicationStatus', []).then((res: base.ApplicationStatusResponse) => {
            const applications: Array<base.BaseApplicationType> = [];
            res['application'].forEach(obj => {
                applications.push(BaseConverter.Application.toObject(obj));
            });
            return applications;
        });
    }

    public getApplicationInformation(): Promise<Array<base.BaseApplicationInformationType>> {
        return this.client.post(this.path, 'BaseGetApplicationInformation', []).then((res: base.ApplicationInformationResponse) => {
            const applications: Array<base.BaseApplicationInformationType> = [];
            res['application'].forEach(obj => {
                applications.push(BaseConverter.ApplicationInformation.toObject(obj));
            });
            return applications;
        });
    }
}
