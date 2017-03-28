import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as schedule from "../type/schedule";
import * as Util from "../util";
import * as BaseConverter from "../converter/base";
import * as ScheduleConverter from "../converter/schedule";
import * as datetime from "../util/datetime";
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
            attrs['start_for_daily'] = Util.formatDate(options.startForDaily);
        }
        if (options.endForDaily !== undefined) {
            attrs['end_for_daily'] = Util.formatDate(options.endForDaily);
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
            if (Array.isArray(res['facility_item'])) {
                res['facility_item'].forEach(obj => {
                    facilityVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return facilityVersions;
        });
    }
}
