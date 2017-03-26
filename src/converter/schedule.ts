import * as schedule from "../type/schedule";
import * as Util from "../util";
import * as date from "../util/date";
import * as time from "../util/time";
import * as datetime from "../util/datetime";
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
                startDate: date.toDate(conditionObj.$.start_date)
            };
            if (conditionObj.$.end_date !== undefined) {
                condition.endDate = date.toDate(conditionObj.$.end_date);
            }
            if (conditionObj.$.start_time !== undefined) {
                condition.startTime = time.toDate(conditionObj.$.start_time);
            }
            if (conditionObj.$.end_time !== undefined) {
                condition.endTime = time.toDate(conditionObj.$.end_time);
            }
            if (conditionObj.$.day !== undefined) {
                condition.day = Number(conditionObj.$.day);
            }
            if (conditionObj.$.week !== undefined) {
                condition.week = Number(conditionObj.$.week);
            }

            const exclusiveDatetimes: schedule.RepeatExclusiveDatetimeType[] = [];
            if (repeatInfoObj.exclusive_datetimes !== undefined) {
                const exclusiveDatetimesObj = repeatInfoObj.exclusive_datetimes[0];
                if (exclusiveDatetimesObj.exclusive_datetime !== undefined) {
                    exclusiveDatetimesObj.exclusive_datetime.forEach(obj => {
                        exclusiveDatetimes.push({
                            start: datetime.toDate(obj.$.start),
                            end: datetime.toDate(obj.$.end)
                        });
                    });
                }
            }

            event.repeatInfo = {
                condition: condition,
                exclusiveDatetimes: exclusiveDatetimes
            }
        }

        if (xmlObj.when !== undefined) {
            const whenObj = xmlObj.when[0];

            const datetimes: schedule.EventDateTimeType[] = [];
            if (whenObj.datetime !== undefined) {
                whenObj.datetime.forEach(obj => {
                    const eventDateTime: schedule.EventDateTimeType = {
                        start: datetime.toDate(obj.$.start),
                        facilityCode: obj.$.facility_code
                    };
                    if (obj.$.end !== undefined) {
                        eventDateTime.end = datetime.toDate(obj.$.end);
                    }
                    datetimes.push(eventDateTime);
                });
            }

            const dates: schedule.EventDateType[] = [];
            if (whenObj.date !== undefined) {
                whenObj.date.forEach(obj => {
                    const eventDate: schedule.EventDateType = {
                        start: datetime.toDate(obj.$.start)
                    };
                    if (obj.$.end !== undefined) {
                        eventDate.end = datetime.toDate(obj.$.end);
                    }
                    dates.push(eventDate);
                });
            }

            event.when = {
                datetimes: datetimes,
                dates: dates
            }
        }

        event.follows = [];
        if (xmlObj.follows !== undefined) {
            const followsObj = xmlObj.follows[0];
            followsObj.follow.forEach(obj => {
                const creator = BaseConverter.ChangeLog.toObject(obj.creator[0]);
                event.follows.push({
                    id: obj.$.id,
                    version: obj.$.version,
                    text: obj.$.text,
                    creator: creator
                });
            });
        }

        event.files = [];
        if (xmlObj.file !== undefined) {
            xmlObj.file.forEach(obj => {
                event.files.push({
                    id: obj.$.id,
                    name: obj.$.name,
                    size: obj.$.size,
                    mimeType: obj.$.mime_type
                });
            });
        }

        event.removeFileIds = [];
        if (xmlObj.remove_file_id !== undefined) {
            xmlObj.remove_file_id.forEach(id => {
                event.removeFileIds.push(id);
            });
        }

        return event;
    }
}
