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
}
