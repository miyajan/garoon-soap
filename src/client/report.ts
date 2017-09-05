import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as report from "../type/report";
import * as BaseConverter from "../converter/base";
import * as ReportConverter from "../converter/report";
import * as datetime from "../util/datetime";

export default class Report {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/report/api.csp' : '/cbpapi/report/api';
    }

    public getReportVersions(start: Date, end?: Date, items?: base.ItemVersionType[], target?: string): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        if (target !== undefined) {
            attr.target = target;
        }
        parameters.push({
            _attr: attr
        });
        if (items !== undefined) {
            items.forEach(item => {
                parameters.push({
                    report_item: {
                        id: item.id,
                        version: item.version
                    }
                });
            });
        }
        return this.client.post(this.path, 'ReportGetReportVersions', parameters).then((res: report.ThreadItemsResponse) => {
            const items: base.ItemVersionResultType[] = [];
            if (res.thread_item !== undefined) {
                res.thread_item.forEach(obj => {
                    items.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return items;
        });
    }

    public getReportById(reportIds: string[]): Promise<report.ReportType[]> {
        const parameters: Object[] = [];
        reportIds.forEach(reportId => {
            parameters.push({
                report_id: reportId
            });
        });
        return this.client.post(this.path, 'ReportGetReportById', parameters, true).then((res: report.ReportsResponse) => {
            const reports: report.ReportType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    reports.push(ReportConverter.Report.toObject(obj));
                });
            }
            return reports;
        });
    }

    public removeReports(reportIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        reportIds.forEach(reportId => {
            parameters.push({
                report_id: reportId
            });
        });
        return this.client.post(this.path, 'ReportRemoveReports', parameters).then(() => {
        });
    }

    public searchReports(target: string, keyword: string): Promise<report.ReportType[]> {
        const parameters: Object[] = [{
            _attr: {
                target: target,
                keyword: keyword
            }
        }];
        return this.client.post(this.path, 'ReportSearchReports', parameters, true).then((res: report.ReportsResponse) => {
            const reports: report.ReportType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    reports.push(ReportConverter.Report.toObject(obj));
                });
            }
            return reports;
        });
    }

    public downloadFile(fileId: string): Promise<Buffer> {
        const parameters: Object[] = [{
            _attr: {
                file_id: fileId
            }
        }];
        return this.client.post(this.path, 'ReportFileDownload', parameters).then((res: base.FileResponse) => {
            return BaseConverter.File.toBuffer(res.file[0]);
        });
    }

    public getFollows(reportId: string, limit: number, offset: number): Promise<report.FollowType[]> {
        const parameters: Object[] = [{
            _attr: {
                report_id: reportId,
                limit: limit,
                offset: offset
            }
        }];
        return this.client.post(this.path, 'ReportGetFollows', parameters).then((res: report.FollowsResponse) => {
            const follows: report.FollowType[] = [];
            if (res.follow !== undefined) {
                res.follow.forEach(obj => {
                    follows.push(ReportConverter.Follow.toObject(obj));
                });
            }
            return follows;
        });
    }
}
