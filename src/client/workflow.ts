import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as workflow from "../type/workflow";
import * as BaseConverter from "../converter/base";
import * as WorkflowConverter from "../converter/workflow";
import * as datetime from "../util/datetime";

export default class Workflow {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/workflow/api.csp' : '/cbpapi/workflow/api';
    }

    public getUnprocessedApplicationVersions(items: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        items.forEach(item => {
            parameters.push({
                application_item: {
                    _attr: {
                        id: item.id,
                        version: item.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'WorkflowGetUnprocessedApplicationVersions', parameters).then((res: workflow.ApplicationItemsResponse) => {
            const items: base.ItemVersionResultType[] = [];
            if (res.application_item !== undefined) {
                res.application_item.forEach(obj => {
                    items.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return items;
        });
    }

    public getUnprocessedApplicationsById(applicationIds: string[]): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        applicationIds.forEach(applicationId => {
            parameters.push({
                application_id: applicationId
            });
        });
        return this.client.post(this.path, 'WorkflowGetUnprocessedApplicationsById', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public getSentApplicationVersions(start: Date, end?: Date, items?: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});
        if (items !== undefined) {
            items.forEach(item => {
                parameters.push({
                    application_item: {
                        _attr: {
                            id: item.id,
                            version: item.version
                        }
                    }
                });
            });
        }
        return this.client.post(this.path, 'WorkflowGetSentApplicationVersions', parameters).then((res: workflow.ApplicationItemsResponse) => {
            const items: base.ItemVersionResultType[] = [];
            if (res.application_item !== undefined) {
                res.application_item.forEach(obj => {
                    items.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return items;
        });
    }

    public getSentApplicationsById(applicationIds: string[]): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        applicationIds.forEach(applicationId => {
            parameters.push({
                application_id: applicationId
            });
        });
        return this.client.post(this.path, 'WorkflowGetSentApplicationsById', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public getReceivedApplicationVersions(start: Date, end?: Date, items?: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});
        if (items !== undefined) {
            items.forEach(item => {
                parameters.push({
                    application_item: {
                        _attr: {
                            id: item.id,
                            version: item.version
                        }
                    }
                });
            });
        }
        return this.client.post(this.path, 'WorkflowGetReceivedApplicationVersions', parameters).then((res: workflow.ApplicationItemsResponse) => {
            const items: base.ItemVersionResultType[] = [];
            if (res.application_item !== undefined) {
                res.application_item.forEach(obj => {
                    items.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return items;
        });
    }

    public getReceivedApplicationsById(applicationIds: string[]): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        applicationIds.forEach(applicationId => {
            parameters.push({
                application_id: applicationId
            });
        });
        return this.client.post(this.path, 'WorkflowGetReceivedApplicationsById', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public getProxyApprovalsByDelegatorId(delegatorId: string, start: Date, end?: Date): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            delegator_id: delegatorId,
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});
        return this.client.post(this.path, 'WorkflowGetProxyApprovalsByDelegatorId', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public getPendingApprovals(start: Date, end?: Date): Promise<workflow.ApplicationType[]> {
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        const parameters: Object[] = [{_attr: attr}];
        return this.client.post(this.path, 'WorkflowGetPendingApprovals', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }
}
