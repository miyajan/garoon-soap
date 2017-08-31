import * as base from "../type/base";
import * as Util from "../util";
import * as datetime from "../util/datetime";

export class ItemVersionResult {
    static toObject(xmlObj: base.ItemVersionResultXMLObject): base.ItemVersionResultType {
        const itemVersionResult: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, itemVersionResult);

        return itemVersionResult;
    }
}

export class User {
    static toObject(xmlObj: base.UserXMLObject): base.UserType {
        const user: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, user);

        if (Array.isArray(xmlObj['organization'])) {
            user['organization'] = [];
            xmlObj['organization']!.forEach(orgObj => {
                const org = {};
                const attrs = orgObj['$'];
                Util.copyProps(attrs, org);
                user['organization'].push(org);
            });
        }
        if (Array.isArray(xmlObj['photo'])) {
            user['photo'] = [];
            xmlObj['photo']!.forEach(photoObj => {
                const photo = {};
                const attrs = photoObj['$'];
                Util.copyProps(attrs, photo);
                user['photo'].push(photo);
            });
        }
        return user;
    }
}

export class BaseGetCalendarEvent {
    static toObject(xmlObj: base.BaseGetCalendarEventXMLObject): base.BaseGetCalendarEventType {
        const calendarEvent: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, calendarEvent);

        return calendarEvent;
    }
}

export class Region {
    static toObject(xmlObj: base.RegionXMLObject): base.RegionType {
        const region: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, region);

        region['cities'] = [];
        if (Array.isArray(xmlObj['city'])) {
            xmlObj['city']!.forEach(cityObj => {
                const city = {};
                const attrs = cityObj['$'];
                Util.copyProps(attrs, city);
                region['cities'].push(city);
            });
        }

        return region;
    }
}

export class Application {
    static toObject(xmlObj: base.ApplicationXMLObject): base.BaseApplicationType {
        const application: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, application);

        return application;
    }
}

export class ApplicationInformation {
    static toObject(xmlObj: base.ApplicationInformationXMLObject): base.BaseApplicationInformationType {
        const application: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, application);

        application['available_client'] = [];
        if (Array.isArray(xmlObj['available_client'])) {
            xmlObj['available_client']!.forEach(client => {
                const attrs: any = client['$'];
                const name = attrs['name'];
                application['available_client'].push(attrs['name']);
            });
        }

        return application;
    }
}

export class Organization {
    static toObject(xmlObj: base.OrganizationXMLObject): base.OrganizationType {
        const org: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, org);

        org['organization'] = [];
        if (Array.isArray(xmlObj['organization'])) {
            xmlObj['organization']!.forEach(childOrg => {
                const attrs: any = childOrg['$'];
                const childOrgId = attrs['key'];
                org['organization'].push(childOrgId);
            });
        }

        org['members'] = [];
        if (Array.isArray(xmlObj['members'])) {
            xmlObj['members']!.forEach(member => {
                if (Array.isArray(member['user'])) {
                    member['user'].forEach(user => {
                        const attrs: any = user['$'];
                        const userId = attrs['id'];
                        org['members'].push(userId);
                    });
                }
            });
        }

        return org;
    }
}

export class MyGroup {
    static toObject(xmlObj: base.MyGroupXMLObject): base.MyGroupType {
        const myGroup: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, myGroup);

        myGroup['belong_member'] = [];
        if (Array.isArray(xmlObj['belong_member'])) {
            xmlObj['belong_member']!.forEach(member => {
                myGroup['belong_member'].push(member);
            });
        }

        myGroup['belong_facility'] = [];
        if (Array.isArray(xmlObj['belong_facility'])) {
            xmlObj['belong_facility']!.forEach(facility => {
                myGroup['belong_facility'].push(facility);
            });
        }

        return myGroup;
    }
}

export class File {
    static toBuffer(xmlObj: base.FileXMLObject): Buffer {
        const content = xmlObj['content']![0];
        return Buffer.from(content, 'base64');
    }
}

export class ChangeLog {
    static toObject(xmlObj: base.ChangeLogXMLObject): base.ChangeLogType {
        const attrs = xmlObj['$'];
        return {
            userId: attrs.user_id,
            name: attrs.name,
            date: datetime.toDate(attrs.date)
        }
    }

    static toObjectFromXMLObject(xmlObj: base.XMLObject): base.ChangeLogType {
        const attr = xmlObj.$;
        return {
            userId: attr.user_id,
            name: attr.name,
            date: datetime.toDate(attr.date)
        }
    }
}
