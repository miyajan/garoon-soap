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

export class FreeTime {
    static toObject(xmlObj: schedule.CandidateXMLObject): schedule.FreeTimeType {
        const attrs = xmlObj.$;
        const freeTime: schedule.FreeTimeType = {
            start: datetime.toDate(attrs.start),
            end: datetime.toDate(attrs.end)
        };
        if (attrs.facility_id !== undefined) {
            freeTime.facilityId = attrs.facility_id;
        }
        return freeTime;
    }
}

export class Facility {
    static toObject(xmlObj: schedule.FacilityXMLObject): schedule.FacilityType {
        const attrs = xmlObj.$;
        const facility: any = {
            key: attrs.key,
            name: attrs.name,
            facilityCode: attrs.facility_code,
            version: attrs.version
        };
        if (attrs.order !== undefined) {
            facility.order = Number(attrs.order);
        }
        if (attrs.description !== undefined) {
            facility.description = attrs.description;
        }
        if (attrs.belong_facility_group !== undefined) {
            facility.belongFacilityGroup = attrs.belong_facility_group;
        }
        return facility;
    }
}

export class FacilityGroup {
    static toObject(xmlObj: schedule.FacilityGroupXMLObject): schedule.FacilityGroupType {
        const attrs = xmlObj.$;
        const facilityGroup: any = {
            id: attrs.id,
            name: attrs.name,
            version: attrs.version,
        };
        if (attrs.order !== undefined) {
            facilityGroup.order = Number(attrs.order);
        }
        if (attrs.parent_facility_group !== undefined) {
            facilityGroup.parentFacilityGroup = attrs.parent_facility_group;
        }

        facilityGroup.children = [];
        if (xmlObj.facility_group !== undefined) {
            xmlObj.facility_group.forEach(obj => {
                facilityGroup.children.push(obj.$.id);
            });
        }

        facilityGroup.facilities = [];
        if (xmlObj.facility !== undefined) {
            xmlObj.facility.forEach(obj => {
                facilityGroup.facilities.push(obj.$.id);
            });
        }

        return facilityGroup;
    }
}

export class FacilityProfile {
    static toObject(xmlObj: schedule.FacilityProfileXMLObject): schedule.FacilityProfileType {
        const attrs = xmlObj.$;
        return {
            key: attrs.key,
            approvalRequired: Util.toBoolean(attrs.approval_required)
        }
    }
}

export class PersonalProfile {
    static toObject(xmlObj: schedule.PersonalProfileXMLObject): schedule.PersonalProfileType {
        const attrs = xmlObj.$;
        const profile: schedule.PersonalProfileType = {};
        if (attrs.start_time_in_dayview !== undefined) {
            profile.startTimeInDayView = Number(attrs.start_time_in_dayview);
        }
        if (attrs.end_time_in_dayview !== undefined) {
            profile.endTimeInDayView = Number(attrs.end_time_in_dayview);
        }
        if (attrs.show_sunday !== undefined) {
            profile.showSunday = Util.toBoolean(attrs.show_sunday);
        }
        if (attrs.show_end_time !== undefined) {
            profile.showEndTime = Util.toBoolean(attrs.show_end_time);
        }
        if (attrs.plan_menu !== undefined) {
            profile.planMenu = attrs.plan_menu;
        }
        if (attrs.notify_mail !== undefined) {
            profile.notifyMail = Util.toBoolean(attrs.notify_mail);
        }
        if (attrs.is_user_address_mail !== undefined) {
            profile.isUserAddressMail = Util.toBoolean(attrs.is_user_address_mail);
        }
        if (attrs.notify_mail_address !== undefined) {
            profile.notifyMailAddress = attrs.notify_mail_address;
        }
        return profile;
    }
}

export class SystemProfile {
    static toObject(xmlObj: schedule.SystemProfileXMLObject): schedule.SystemProfileType {
        const attrs = xmlObj.$;
        const profile: schedule.SystemProfileType = {};
        if (attrs.plan_menu !== undefined) {
            profile.planMenu = attrs.plan_menu;
        }
        if (attrs.event_reserve_unit !== undefined) {
            profile.eventReserveUnit = Number(attrs.event_reserve_unit);
        }
        if (attrs.event_repeat_max_time !== undefined) {
            profile.eventRepeatMaxTime = Number(attrs.event_repeat_max_time);
        }
        if (attrs.register_private_event !== undefined) {
            profile.registerPrivateEvent = Util.toBoolean(attrs.register_private_event);
        }
        if (attrs.show_memo !== undefined) {
            profile.showMemo = Util.toBoolean(attrs.show_memo);
        }
        if (attrs.show_private_event !== undefined) {
            profile.showPrivateEvent = Util.toBoolean(attrs.show_private_event);
        }
        if (attrs.managed_notify !== undefined) {
            profile.managedNotify = Util.toBoolean(attrs.managed_notify);
        }
        if (attrs.show_group_event !== undefined) {
            profile.showGroupEvent = Util.toBoolean(attrs.show_group_event);
        }
        if (attrs.show_holiday !== undefined) {
            profile.showHoliday = Util.toBoolean(attrs.show_holiday);
        }
        if (attrs.allow_file_attachment !== undefined) {
            profile.allowFileAttachment = Util.toBoolean(attrs.allow_file_attachment);
        }
        if (attrs.allow_attendance_check !== undefined) {
            profile.allowAttendanceCheck = Util.toBoolean(attrs.allow_attendance_check);
        }
        if (attrs.visibility_default !== undefined) {
            profile.visibilityDefault = Number(attrs.visibility_default);
        }
        return profile;
    }
}

export class ModifyEventType {
    static toParameterObject(event: schedule.ModifyEventType): Object[] {
        const attrs: any = {
            id: event.id,
            event_type: event.eventType,
            version: 'dummy',
        };
        if (event.publicType !== undefined) {
            attrs.public_type = event.publicType;
        }
        if (event.plan !== undefined) {
            attrs.plan = event.plan;
        }
        if (event.detail !== undefined) {
            attrs.detail = event.detail;
        }
        if (event.description !== undefined) {
            attrs.description = event.description;
        }
        if (event.timezone !== undefined) {
            attrs.timezone = event.timezone;
        }
        if (event.endTimezone !== undefined) {
            attrs.end_timezone = event.endTimezone;
        }
        if (event.allDay !== undefined) {
            attrs.allday = event.allDay;
        }
        if (event.startOnly !== undefined) {
            attrs.start_only = event.startOnly;
        }
        if (event.hiddenPrivate !== undefined) {
            attrs.hidden_private = event.hiddenPrivate;
        }
        if (event.facilityUsingPurpose !== undefined) {
            attrs.facility_using_purpose = event.facilityUsingPurpose;
        }
        const scheduleEvent: Object[] = [{
            _attr: attrs
        }];
        if (event.members !== undefined) {
            const members: Object[] = [];
            event.members.users.forEach(user => {
                const attrs: any = {
                    id: user.id
                };
                if (user.order !== undefined) {
                    attrs.order = user.order;
                }
                members.push({
                    member: [{
                        user: {
                            _attr: attrs
                        }
                    }]
                });
            });
            event.members.organizations.forEach(organization => {
                const attrs: any = {
                    id: organization.id
                };
                if (organization.order !== undefined) {
                    attrs.order = organization.order;
                }
                members.push({
                    member: [{
                        organization: {
                            _attr: attrs
                        }
                    }]
                });
            });
            event.members.facilities.forEach(facility => {
                const attrs: any = {
                    id: facility.id
                };
                if (facility.order !== undefined) {
                    attrs.order = facility.order;
                }
                members.push({
                    member: [{
                        facility: {
                            _attr: attrs
                        }
                    }]
                });
            });
            scheduleEvent.push({members: members});
        }
        if (event.observers !== undefined) {
            const observers: Object[] = [];
            event.observers.users.forEach(user => {
                const attrs: any = {
                    id: user.id
                };
                if (user.order !== undefined) {
                    attrs.order = user.order;
                }
                observers.push({
                    observer: [{
                        user: {
                            _attr: attrs
                        }
                    }]
                });
            });
            event.observers.organizations.forEach(organization => {
                const attrs: any = {
                    id: organization.id
                };
                if (organization.order !== undefined) {
                    attrs.order = organization.order;
                }
                observers.push({
                    observer: [{
                        organization: {
                            _attr: attrs
                        }
                    }]
                });
            });
            event.observers.roles.forEach(role => {
                const attrs: any = {
                    id: role.id
                };
                if (role.order !== undefined) {
                    attrs.order = role.order;
                }
                observers.push({
                    observer: [{
                        role: {
                            _attr: attrs
                        }
                    }]
                });
            });
            scheduleEvent.push({observers: observers});
        }
        if (event.customer !== undefined) {
            const attrs: any = {};
            if (event.customer.name !== undefined) {
                attrs.name = event.customer.name;
            }
            if (event.customer.zipcode !== undefined) {
                attrs.zipcode = event.customer.zipcode;
            }
            if (event.customer.address !== undefined) {
                attrs.address = event.customer.address;
            }
            if (event.customer.map !== undefined) {
                attrs.map = event.customer.map;
            }
            if (event.customer.route !== undefined) {
                attrs.route = event.customer.route;
            }
            if (event.customer.routeTime !== undefined) {
                attrs.route_time = event.customer.routeTime;
            }
            if (event.customer.routeFare !== undefined) {
                attrs.route_faire = event.customer.routeFare;
            }
            if (event.customer.phone !== undefined) {
                attrs.phone = event.customer.phone;
            }
            scheduleEvent.push({customer: {_attr: attrs}});
        }
        if (event.repeatInfo !== undefined) {
            const attrs: any = {
                type: event.repeatInfo.condition.type,
                start_date: date.toString(event.repeatInfo.condition.startDate)
            };
            if (event.repeatInfo.condition.endDate !== undefined) {
                attrs.end_date = date.toString(event.repeatInfo.condition.endDate);
            }
            if (event.repeatInfo.condition.startTime !== undefined) {
                attrs.start_time = time.toString(event.repeatInfo.condition.startTime);
            }
            if (event.repeatInfo.condition.endTime !== undefined) {
                attrs.end_time = time.toString(event.repeatInfo.condition.endTime);
            }
            if (event.repeatInfo.condition.day !== undefined) {
                attrs.day = event.repeatInfo.condition.day;
            }
            if (event.repeatInfo.condition.week !== undefined) {
                attrs.week = event.repeatInfo.condition.week;
            }
            const condition = {
                _attr: attrs
            };
            const repeatInfo: Object[] = [{
                condition: condition
            }];
            if (event.repeatInfo.exclusiveDatetimes !== undefined) {
                const exclusiveDatetimes: Object[] = [];
                event.repeatInfo.exclusiveDatetimes.forEach(exclusiveDatetime => {
                    exclusiveDatetimes.push({
                        exclusive_datetime: {
                            _attr: {
                                start: datetime.toString(exclusiveDatetime.start),
                                end: datetime.toString(exclusiveDatetime.end)
                            }
                        }
                    });
                });
                repeatInfo.push({exclusive_datetimes: exclusiveDatetimes});
            }
            scheduleEvent.push({repeat_info: repeatInfo});
        }
        if (event.when !== undefined) {
            const when: any = [];
            event.when.datetimes.forEach(dt => {
                const attrs: any = {
                    start: datetime.toString(dt.start)
                };
                if (dt.end !== undefined) {
                    attrs.end = datetime.toString(dt.end);
                }
                if (dt.facilityCode !== undefined) {
                    attrs.facility_code = dt.facilityCode;
                }
                when.push({
                    datetime: {
                        _attr: attrs
                    }
                })
            });
            event.when.dates.forEach(d => {
                const attrs: any = {
                    start: date.toString(d.start)
                };
                if (d.end !== undefined) {
                    attrs.end = date.toString(d.end);
                }
                when.push({
                    date: {
                        _attr: attrs
                    }
                })
            });
            scheduleEvent.push({when: when});
        }
        return scheduleEvent;
    }
}

export class ModifyRepeatEventsResult {
    static toObject(xmlObj: schedule.ModifyRepeatEventsResultXMLObject): schedule.ModifyRepeatEventsResultType {
        const original = Event.toObject(xmlObj.original[0]);
        const modified = Event.toObject(xmlObj.modified[0]);
        return {
            original: original,
            modified: modified
        };
    }
}
