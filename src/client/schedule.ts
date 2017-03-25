import Client from "./client";
import Setting from "./setting";
import * as schedule from "../type/schedule";
import * as Util from "../util";
import * as ScheduleConverter from "../converter/schedule";

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
            attrs['start'] = Util.formatDateTime(options.start);
        }
        if (options.end !== undefined) {
            attrs['end'] = Util.formatDateTime(options.end!);
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
}
