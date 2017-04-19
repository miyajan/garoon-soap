import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as schedule from "../type/schedule";
import * as BaseConverter from "../converter/base";
import * as ScheduleConverter from "../converter/schedule";
import * as datetime from "../util/datetime";
import * as date from "../util/date";
import * as time from "../util/time";

export default class Schedule {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/schedule/api.csp' : '/cbpapi/schedule/api';
    }

    public searchEvents(options: schedule.SearchOptions): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        const attrs: any = {
            'text': options.text,
            'title_search': true,
            'customer_search': true,
            'memo_search': true,
            'follow_search': true,
            'all_repeat_events': false
        };
        if (options.start !== undefined) {
            attrs['start'] = datetime.toString(options.start);
        }
        if (options.end !== undefined) {
            attrs['end'] = datetime.toString(options.end!);
        }
        if (options.startForDaily !== undefined) {
            attrs['start_for_daily'] = date.toString(options.startForDaily);
        }
        if (options.endForDaily !== undefined) {
            attrs['end_for_daily'] = date.toString(options.endForDaily);
        }
        if (options.titleSearch !== undefined) {
            attrs['title_search'] = options.titleSearch;
        }
        if (options.customerSearch !== undefined) {
            attrs['customer_search'] = options.customerSearch;
        }
        if (options.memoSearch !== undefined) {
            attrs['memo_search'] = options.memoSearch;
        }
        if (options.followSearch !== undefined) {
            attrs['follow_search'] = options.followSearch;
        }
        if (options.allRepeatEvents !== undefined) {
            attrs['all_repeat_events'] = options.allRepeatEvents;
        }
        parameters.push({'_attr': attrs});
        return this.client.post(this.path, 'ScheduleSearchEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public searchFreeTimes(candidates: schedule.CandidateType[], userIds: string[], orgIds: string[], facilityIds: string[], searchTimeMinutes: number, needAllFacilities?: boolean): Promise<schedule.FreeTimeType[]> {
        const parameters: Object[] = [];
        candidates.forEach(candidate => {
            parameters.push({
                'candidate': [{
                    '_attr': {
                        'start': datetime.toString(candidate.start),
                        'end': datetime.toString(candidate.end)
                    }
                }]
            });
        });
        userIds.forEach(userId => {
            parameters.push({
                'member': [{
                    'user': [{
                        '_attr': {'id': userId}
                    }]
                }]
            });
        });
        orgIds.forEach(orgId => {
            parameters.push({
                'member': [{
                    'organization': [{
                        '_attr': {'id': orgId}
                    }]
                }]
            });
        });
        facilityIds.forEach(facilityId => {
            parameters.push({
                'member': [{
                    'facility': [{
                        '_attr': {'id': facilityId}
                    }]
                }]
            });
        });
        const searchTime = new Date();
        searchTime.setHours(0);
        searchTime.setMinutes(searchTimeMinutes);
        searchTime.setSeconds(0);
        const searchCondition = needAllFacilities ? 'and' : 'or';
        parameters.push({
            '_attr': {
                search_time: time.toString(new Date(searchTime)),
                search_condition: searchCondition
            }
        });
        return this.client.post(this.path, 'ScheduleSearchFreeTimes', parameters).then((res: schedule.FreeTimesResponse) => {
            const freeTimes: schedule.FreeTimeType[] = [];
            if (res.candidate !== undefined) {
                res.candidate.forEach(obj => {
                    freeTimes.push(ScheduleConverter.FreeTime.toObject(obj));
                });
            }
            return freeTimes;
        });
    }

    public getFacilityVersions(facilityItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        facilityItems.forEach(facilityItem => {
            parameters.push({
                'facility_item': {
                    '_attr': {
                        id: facilityItem.id,
                        version: facilityItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'ScheduleGetFacilityVersions', parameters).then((res: schedule.FacilityItemsResponse) => {
            const facilityVersions: base.ItemVersionResultType[] = [];
            if (res.facility_item !== undefined) {
                res.facility_item.forEach(obj => {
                    facilityVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return facilityVersions;
        });
    }

    public getFacilitiesById(facilityIds: string[]): Promise<schedule.FacilityType[]> {
        const parameters: Object[] = [];
        facilityIds.forEach(facilityId => {
            parameters.push({'facility_id': facilityId});
        });
        return this.client.post(this.path, 'ScheduleGetFacilitiesById', parameters).then((res: schedule.FacilitiesResponse) => {
            const facilities: schedule.FacilityType[] = [];
            if (res.facility !== undefined) {
                res.facility.forEach(obj => {
                    facilities.push(ScheduleConverter.Facility.toObject(obj));
                });
            }
            return facilities;
        });
    }

    public getFacilityGroupsVersions(facilityGroupItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        facilityGroupItems.forEach(facilityGroupItem => {
            parameters.push({
                'facility_group_item': {
                    '_attr': {
                        id: facilityGroupItem.id,
                        version: facilityGroupItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'ScheduleGetFacilityGroupsVersions', parameters).then((res: schedule.FacilityGroupItemsResponse) => {
            const facilityGroupsVersions: base.ItemVersionResultType[] = [];
            if (res.facility_group_item !== undefined) {
                res.facility_group_item.forEach(obj => {
                    facilityGroupsVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return facilityGroupsVersions;
        });
    }

    public getFacilityGroupsById(facilityGroupIds: string[]): Promise<schedule.FacilityGroupType[]> {
        const parameters: Object[] = [];
        facilityGroupIds.forEach(facilityGroupId => {
            parameters.push({'facility_group_id': facilityGroupId});
        });
        return this.client.post(this.path, 'ScheduleGetFacilityGroupsById', parameters).then((res: schedule.FacilityGroupsResponse) => {
            const facilityGroups: schedule.FacilityGroupType[] = [];
            if (res.facility_group !== undefined) {
                res.facility_group.forEach(obj => {
                    facilityGroups.push(ScheduleConverter.FacilityGroup.toObject(obj));
                });
            }
            return facilityGroups;
        });
    }

    public getFacilityProfileVersions(facilityProfileItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        facilityProfileItems.forEach(facilityProfileItem => {
            parameters.push({
                'facility_profile_item': {
                    '_attr': {
                        id: facilityProfileItem.id,
                        version: facilityProfileItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'ScheduleGetFacilityProfileVersions', parameters).then((res: schedule.FacilityProfileItemsResponse) => {
            const facilityProfileVersions: base.ItemVersionResultType[] = [];
            if (res.facility_profile_item !== undefined) {
                res.facility_profile_item.forEach(obj => {
                    facilityProfileVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return facilityProfileVersions;
        });
    }

    public getFacilityProfilesById(facilityIds: string[]): Promise<schedule.FacilityProfileType[]> {
        const parameters: Object[] = [];
        facilityIds.forEach(facilityId => {
            parameters.push({
                'facility_id': facilityId
            });
        });
        return this.client.post(this.path, 'ScheduleGetFacilityProfilesById', parameters).then((res: schedule.FacilityProfilesResponse) => {
            const facilityProfiles: schedule.FacilityProfileType[] = [];
            if (res.facility_profile !== undefined) {
                res.facility_profile.forEach(obj => {
                    facilityProfiles.push(ScheduleConverter.FacilityProfile.toObject(obj));
                });
            }
            return facilityProfiles;
        });
    }

    public getProfiles(includeSystemProfile?: boolean): Promise<schedule.ProfileType> {
        const parameters: Object[] = [];
        if (includeSystemProfile !== undefined) {
            parameters.push({
                '_attr': {
                    'include_system_profile': includeSystemProfile.toString()
                }
            });
        }
        return this.client.post(this.path, 'ScheduleGetProfiles', parameters).then((res: schedule.ProfilesResponse) => {
            const profiles: schedule.ProfileType = {
                personalProfileType: ScheduleConverter.PersonalProfile.toObject(res.personal_profile[0])
            };
            if (res.system_profile !== undefined) {
                profiles.systemProfileType = ScheduleConverter.SystemProfile.toObject(res.system_profile[0]);
            }
            return profiles;
        });
    }

    public setProfiles(profile: schedule.PersonalProfileType): Promise<schedule.PersonalProfileType> {
        const attrs: any = {};
        if (profile.startTimeInDayView !== undefined) {
            attrs['start_time_in_dayview'] = profile.startTimeInDayView;
        }
        if (profile.endTimeInDayView !== undefined) {
            attrs['end_time_in_dayview'] = profile.endTimeInDayView;
        }
        if (profile.showSunday !== undefined) {
            attrs['show_sunday'] = profile.showSunday;
        }
        if (profile.showEndTime !== undefined) {
            attrs['show_end_time'] = profile.showEndTime;
        }
        if (profile.planMenu !== undefined) {
            attrs['plan_menu'] = profile.planMenu;
        }
        if (profile.notifyMail !== undefined) {
            attrs['notify_mail'] = profile.notifyMail;
        }
        if (profile.isUserAddressMail !== undefined) {
            attrs['is_user_address_mail'] = profile.isUserAddressMail;
        }
        if (profile.notifyMailAddress !== undefined) {
            attrs['notify_mail_address'] = profile.notifyMailAddress;
        }
        const parameters: Object[] = [{
            'personal_profile': {
                '_attr': attrs
            }
        }];
        return this.client.post(this.path, 'ScheduleSetProfiles', parameters).then((res: schedule.PersonalProfileResponse) => {
            return ScheduleConverter.PersonalProfile.toObject(res.personal_profile[0]);
        });
    }

    public getEventVersions(eventItems: base.ItemVersionType[], start: Date, end?: Date, startForDaily?: Date, endForDaily?: Date): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        eventItems.forEach(eventItem => {
            parameters.push({
                'event_item': {
                    '_attr': {
                        id: eventItem.id,
                        version: eventItem.version
                    }
                }
            })
        });
        const attrs: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attrs.end = datetime.toString(end);
        }
        if (startForDaily !== undefined) {
            attrs.start_for_daily = date.toString(startForDaily);
        }
        if (endForDaily !== undefined) {
            attrs.end_for_daily = date.toString(endForDaily);
        }
        parameters.push({'_attr': attrs});
        return this.client.post(this.path, 'ScheduleGetEventVersions', parameters).then((res: schedule.EventItemsResponse) => {
            const versions: base.ItemVersionResultType[] = [];
            if (res.event_item !== undefined) {
                res.event_item.forEach(obj => {
                    versions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return versions;
        });
    }

    public getEvents(start: Date, end: Date, startForDaily?: Date, endForDaily?: Date): Promise<schedule.EventType[]> {
        const attrs: any = {
            start: datetime.toString(start),
            end: datetime.toString(end)
        };
        if (startForDaily !== undefined) {
            attrs.start_for_daily = date.toString(startForDaily);
        }
        if (endForDaily !== undefined) {
            attrs.end_for_daily = date.toString(endForDaily);
        }
        const parameters: Object[] = [{'_attr': attrs}];
        return this.client.post(this.path, 'ScheduleGetEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public getEventsById(eventIds: string[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        eventIds.forEach(eventId => {
            parameters.push({'event_id': eventId});
        });
        return this.client.post(this.path, 'ScheduleGetEventsById', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public getEventsByTarget(start: Date, end: Date, startForDaily?: Date, endForDaily?: Date, userIds?: string[], groupIds?: string[], facilityIds?: string[]): Promise<schedule.EventType[]> {
        const attrs: any = {
            start: datetime.toString(start),
            end: datetime.toString(end)
        };
        if (startForDaily !== undefined) {
            attrs.start_for_daily = date.toString(startForDaily);
        }
        if (endForDaily !== undefined) {
            attrs.end_for_daily = date.toString(endForDaily);
        }
        const parameters: Object[] = [{
            '_attr': attrs
        }];
        if (userIds !== undefined) {
            userIds.forEach(userId => {
                parameters.push({
                    'user': {
                        '_attr': {'id': userId}
                    }
                });
            });
        }
        if (groupIds !== undefined) {
            groupIds.forEach(groupId => {
                parameters.push({
                    'group': {
                        '_attr': {'id': groupId}
                    }
                });
            });
        }
        if (facilityIds !== undefined) {
            facilityIds.forEach(facilityId => {
                parameters.push({
                    'facility': {
                        '_attr': {'id': facilityId}
                    }
                });
            });
        }
        return this.client.post(this.path, 'ScheduleGetEventsByTarget', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public addEvents(events: schedule.AddEventType[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        events.forEach(event => {
            const attrs: any = {
                id: 'dummy',
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
            parameters.push({
                schedule_event: scheduleEvent
            });
        });
        return this.client.post(this.path, 'ScheduleAddEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public modifyEvents(events: schedule.ModifyEventType[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        events.forEach(event => {
            const scheduleEvent = ScheduleConverter.ModifyEventType.toParameterObject(event);
            parameters.push({
                schedule_event: scheduleEvent
            });
        });
        return this.client.post(this.path, 'ScheduleAddEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public modifyRepeatEvents(operations: schedule.ModifyRepeatEventsOperationType[]): Promise<schedule.ModifyRepeatEventsResultType[]> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attrs: any = {
                type: operation.type
            };
            if (operation.date !== undefined) {
                attrs.date = date.toString(operation.date);
            }
            const scheduleEvent = ScheduleConverter.ModifyEventType.toParameterObject(operation.scheduleEvent);
            parameters.push({
                operation: [
                    {_attr: attrs},
                    {schedule_event: scheduleEvent}
                ]
            });
        });
        return this.client.post(this.path, 'ScheduleModifyRepeatEvents', parameters).then((res: schedule.ModifyRepeatEventsResultsResponse) => {
            const results: schedule.ModifyRepeatEventsResultType[] = [];
            res.result.forEach(obj => {
                results.push(ScheduleConverter.ModifyRepeatEventsResult.toObject(obj));
            });
            return results;
        });
    }

    public removeEvents(eventIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        eventIds.forEach(eventId => {
            parameters.push({'event_id': eventId});
        });
        return this.client.post(this.path, 'ScheduleRemoveEvents', parameters).then(res => {
        });
    }

    public removeEventsFromRepeatEvent(operations: schedule.RemoveEventsFromRepeatEventOperationType[]): Promise<void> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attrs: any = {
                event_id: operation.eventId,
                type: operation.type
            };
            if (operation.date !== undefined) {
                attrs.date = date.toString(operation.date);
            }
            parameters.push({
                operation: {
                    _attr: attrs
                }
            })
        });
        return this.client.post(this.path, 'ScheduleRemoveEventsFromRepeatEvent', parameters).then(res => {
        });
    }

    public participateEvents(eventIds: string[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        eventIds.forEach(eventId => {
            parameters.push({'event_id': eventId});
        });
        return this.client.post(this.path, 'ScheduleParticipateEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public leaveEvents(eventIds: string[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        eventIds.forEach(eventId => {
            parameters.push({'event_id': eventId});
        });
        return this.client.post(this.path, 'ScheduleLeaveEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public participateEventsToRepeatEvent(operations: schedule.ParticipateEventsToRepeatEventOperationType[]): Promise<schedule.ModifyRepeatEventsResultType[]> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attrs: any = {
                event_id: operation.eventId,
                type: operation.type
            };
            if (operation.date !== undefined) {
                attrs.date = date.toString(operation.date);
            }
            parameters.push({
                operation: {
                    _attr: attrs
                }
            });
        });
        return this.client.post(this.path, 'ScheduleParticipateEventsToRepeatEvent', parameters).then((res: schedule.ModifyRepeatEventsResultsResponse) => {
            const results: schedule.ModifyRepeatEventsResultType[] = [];
            res.result.forEach(obj => {
                results.push(ScheduleConverter.ModifyRepeatEventsResult.toObject(obj));
            });
            return results;
        });
    }

    public leaveEventsFromRepeatEvent(operations: schedule.RemoveEventsFromRepeatEventOperationType[]): Promise<void> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attrs: any = {
                event_id: operation.eventId,
                type: operation.type
            };
            if (operation.date !== undefined) {
                attrs.date = date.toString(operation.date);
            }
            parameters.push({
                operation: {
                    _attr: attrs
                }
            })
        });
        return this.client.post(this.path, 'ScheduleLeaveEventsFromRepeatEvent', parameters).then(res => {
        });
    }

    public determineTemporaryEvents(candidates: schedule.CandidateItemType[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        candidates.forEach(candidate => {
            const attrs: any = {
                event_id: candidate.eventId,
                start: datetime.toString(candidate.start),
                end: datetime.toString(candidate.end)
            };
            if (candidate.facilityId !== undefined) {
                attrs.facility_id = candidate.facilityId;
            }
            parameters.push({candidate: {_attr: attrs}});
        });
        return this.client.post(this.path, 'ScheduleDetermineTemporaryEvents', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }

    public removeTemporaryEventCandidates(candidates: schedule.CandidateItemType[]): Promise<schedule.EventType[]> {
        const parameters: Object[] = [];
        candidates.forEach(candidate => {
            const attrs: any = {
                event_id: candidate.eventId,
                start: datetime.toString(candidate.start),
                end: datetime.toString(candidate.end)
            };
            if (candidate.facilityId !== undefined) {
                attrs.facility_id = candidate.facilityId;
            }
            parameters.push({candidate: {_attr: attrs}});
        });
        return this.client.post(this.path, 'ScheduleRemoveTemporaryEventCandidates', parameters).then((res: schedule.EventsResponse) => {
            const events: schedule.EventType[] = [];
            if (res.schedule_event !== undefined) {
                res.schedule_event.forEach(obj => {
                    events.push(ScheduleConverter.Event.toObject(obj));
                });
            }
            return events;
        });
    }
}
