import * as base from "../type/base";
import * as Util from "../util";

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

        if (Array.isArray(xmlObj['organization']) && xmlObj['organization']!.length > 0) {
            user['organization'] = [];
            xmlObj['organization']!.forEach(orgObj => {
                const org = {};
                const attrs = orgObj['$'];
                Util.copyProps(attrs, org);
                user['organization'].push(org);
            });
        }
        if (Array.isArray(xmlObj['photo']) && xmlObj['photo']!.length > 0) {
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
        if (Array.isArray(xmlObj['city']) && xmlObj['city']!.length > 0) {
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
