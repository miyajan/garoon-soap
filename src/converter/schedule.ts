import * as schedule from "../type/schedule";
import * as Util from "../util";
import * as BaseConverter from "./base";

export class Event {
    static toObject(xmlObj: schedule.EventTypeXMLObject): schedule.EventType {
        const attrs = xmlObj.$;
        const event: any = {
            id: attrs.id,
            eventType: attrs.event_type,
            version: attrs.version,
            publicType: attrs.public_type,
            plan: attrs.plan,
            detail: attrs.detail,
            description: attrs.description,
            timezone: attrs.timezone,
            endTimezone: attrs.end_timezone,
        };
        if (attrs.allday !== undefined) {
            event.allday = Util.toBoolean(attrs.allday);
        }
        if (attrs.start_only !== undefined) {
            event.startOnly = Util.toBoolean(attrs.start_only);
        }
        if (attrs.hidden_private !== undefined) {
            event.hiddenPrivate = Util.toBoolean(attrs.hidden_private);
        }
        if (attrs.facility_using_purpose !== undefined) {
            event.facilityUsingPurpose = Util.toBoolean(attrs.facility_using_purpose);
        }

        event.members = {
            users: [],
            organizations: [],
            facilities: []
        };
        if (xmlObj.members !== undefined) {
            const members = xmlObj.members[0];
            if (members.member !== undefined) {
                members.member.forEach(obj => {
                    if (obj.user !== undefined) {
                        const user = obj.user[0];
                        event.members.users.push({
                            id: user.$.id,
                            order: user.$.order
                        });
                    }
                    if (obj.organization !== undefined) {
                        const organization = obj.organization[0];
                        event.members.organizations.push({
                            id: organization.$.id,
                            order: organization.$.order
                        });
                    }
                    if (obj.facility !== undefined) {
                        const facility = obj.facility[0];
                        event.members.facilities.push({
                            id: facility.$.id,
                            order: facility.$.order
                        });
                    }
                });
            }
        }

        event.observers = {
            users: [],
            organizations: [],
            roles: []
        };
        if (xmlObj.observers !== undefined) {
            const observers = xmlObj.observers[0];
            if (observers.observer !== undefined) {
                observers.observer.forEach(obj => {
                    if (obj.user !== undefined) {
                        const user = obj.user[0];
                        event.observers.users.push({
                            id: user.$.id,
                            order: user.$.order
                        });
                    }
                    if (obj.organization !== undefined) {
                        const organization = obj.organization[0];
                        event.observers.organizations.push({
                            id: organization.$.id,
                            order: organization.$.order
                        });
                    }
                    if (obj.role !== undefined) {
                        const role = obj.role[0];
                        event.observers.roles.push({
                            id: role.$.id,
                            order: role.$.order
                        });
                    }
                });
            }
        }

        if (xmlObj.customer !== undefined) {
            const customerAttrs = xmlObj.customer[0].$;
            event.customer = {
                name: customerAttrs.name,
                zipcode: customerAttrs.zipcode,
                address: customerAttrs.address,
                map: customerAttrs.map,
                route: customerAttrs.route,
                routeTime: customerAttrs.route_time,
                routeFare: customerAttrs.route_fare,
                phone: customerAttrs.phone
            };
        }

        if (xmlObj.repeat_info !== undefined) {
            const repeatInfoObj = xmlObj.repeat_info[0];
            const conditionObj = repeatInfoObj.condition[0];
            const condition: any = {
                type: conditionObj.$.type,
                startDate: Util.toDate(conditionObj.$.start_date)
            };
            if (conditionObj.$.end_date !== undefined) {
                condition.endDate = Util.toDate(conditionObj.$.end_date);
            }
            if (conditionObj.$.start_time !== undefined) {

            }
        }

        return event;
    }
}