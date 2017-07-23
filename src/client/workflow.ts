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

    public getRequests(manageRequestParameter: workflow.GetRequestType): Promise<workflow.RequestManageFormType[]> {
        const parameters: Object[] = [];
        if (manageRequestParameter !== undefined) {
            const attr: any = {
                request_form_id: manageRequestParameter.requestFormId
            };
            if (manageRequestParameter.filter !== undefined) {
                attr.filter = manageRequestParameter.filter;
            }
            if (manageRequestParameter.startRequestDate !== undefined) {
                attr.start_request_date = datetime.toString(manageRequestParameter.startRequestDate);
            }
            if (manageRequestParameter.endRequestDate !== undefined) {
                attr.end_request_date = datetime.toString(manageRequestParameter.endRequestDate);
            }
            if (manageRequestParameter.startApprovalDate !== undefined) {
                attr.start_approval_date = datetime.toString(manageRequestParameter.startApprovalDate);
            }
            if (manageRequestParameter.endApprovalDate !== undefined) {
                attr.end_approval_date = datetime.toString(manageRequestParameter.endApprovalDate);
            }
            if (manageRequestParameter.applicant !== undefined) {
                attr.applicant = manageRequestParameter.applicant;
            }
            if (manageRequestParameter.lastApproval !== undefined) {
                attr.last_approval = manageRequestParameter.lastApproval;
            }
            if (manageRequestParameter.startToGetInformationFrom !== undefined) {
                attr.start_to_get_information_from = manageRequestParameter.startToGetInformationFrom;
            }
            if (manageRequestParameter.maximumRequestAmountToGet !== undefined) {
                attr.maximum_request_amount_to_get = manageRequestParameter.maximumRequestAmountToGet;
            }
            parameters.push({
                manage_request_parameter: {
                    _attr: attr
                }
            });
        }
        return this.client.post(this.path, 'WorkflowGetRequests', parameters).then((res: workflow.CategoriesResponse) => {
            const categories: workflow.RequestManageFormType[] = [];
            if (res.category !== undefined) {
                res.category.forEach(obj => {
                    categories.push(WorkflowConverter.RequestManageForm.toObject(obj));
                });
            }
            return categories;
        });
    }

    public getRequestById(requestIds: string[]): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        requestIds.forEach(requestId => {
            parameters.push({request_id: requestId});
        });
        return this.client.post(this.path, 'WorkflowGetRequestById', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public handleApplications(handles: workflow.HandleApplicationOperationType[]): Promise<workflow.ApplicationType[]> {
        const parameters: Object[] = [];
        handles.forEach(handle => {
            const attr: any = {
                application_id: handle.applicationId
            };
            if (handle.delegatorId !== undefined) {
                attr.delegator_id = handle.delegatorId;
            }
            if (handle.comment !== undefined) {
                attr.comment = handle.comment;
            }
            parameters.push({
                handle: [
                    {
                        _attr: attr
                    },
                    {
                        operation: [
                            handle.operation.getXMLObj()
                        ]
                    }
                ]
            });
        });
        return this.client.post(this.path, 'WorkflowHandleApplications', parameters, true).then((res: workflow.ApplicationsResponse) => {
            const applications: workflow.ApplicationType[] = [];
            if (res.$$ !== undefined) {
                res.$$.forEach(obj => {
                    applications.push(WorkflowConverter.Application.toObject(obj));
                });
            }
            return applications;
        });
    }

    public getCategories(): Promise<workflow.CategoryType> {
        return this.client.post(this.path, 'WorkflowGetCategories', []).then((res: workflow.RootResponse) => {
            return WorkflowConverter.Category.toObject(res.root[0]);
        });
    }

    public getRequestFormByCategoryIds(categoryIds: string[]): Promise<workflow.RequestFormType[]> {
        const parameters: Object[] = [];
        categoryIds.forEach(categoryId => {
            parameters.push({
                category_id: categoryId
            });
        });
        return this.client.post(this.path, 'WorkflowGetRequestFormByCategoryIds', parameters).then((res: workflow.CategoryRequestFormsResponse) => {
            const forms: workflow.RequestFormType[] = [];
            res.category.forEach(obj => {
                const categoryId = obj.$.category_id;
                obj.requestForm.forEach(obj => {
                    forms.push(WorkflowConverter.RequestForm.toObject(categoryId, obj));
                });
            });
            return forms;
        });
    }

    public getApprovalDelegators(): Promise<string[]> {
        return this.client.post(this.path, 'WorkflowGetApprovalDelegators', []).then((res: workflow.DelegatorIdsResponse) => {
            const delegatorIds: string[] = [];
            if (res.delegator_id !== undefined) {
                res.delegator_id.forEach(delegatorId => {
                    delegatorIds.push(delegatorId);
                });
            }
            return delegatorIds;
        });
    }

    public getProxies(): Promise<workflow.UserProxyType[]> {
        return this.client.post(this.path, 'WorkflowGetProxies', []).then((res: workflow.ProxiesResponse) => {
            const proxies: workflow.UserProxyType[] = [];
            const proxiesObj = res.proxies[0];
            if (proxiesObj.user_proxy !== undefined) {
                proxiesObj.user_proxy.forEach(obj => {
                    proxies.push(WorkflowConverter.UserProxy.toObject(obj));
                });
            }
            return proxies;
        });
    }

    public setProxies(proxies: workflow.UserProxyType[]): Promise<workflow.UserProxyType[]> {
        const parameters: Object[] = [];
        const proxiesParam: Object[] = [];
        proxies.forEach(proxy => {
            const userProxy: any = [
                {
                    _attr: {
                        user_id: proxy.userId
                    }
                }
            ];
            proxy.approverIds.forEach(approverId => {
                userProxy.push({
                    proxy_approver: [{
                        _attr: {
                            approver_id: approverId
                        }
                    }]
                });
            });
            proxy.applicantIds.forEach(applicantId => {
                userProxy.push({
                    proxy_applicant: [{
                        _attr: {
                            applicant_id: applicantId
                        }
                    }]
                })
            });
            proxiesParam.push({
                user_proxy: userProxy
            });
        });
        parameters.push({
            proxies: proxiesParam
        });
        return this.client.post(this.path, 'WorkflowSetProxies', parameters).then((res: workflow.ProxiesResponse) => {
            const proxies: workflow.UserProxyType[] = [];
            const proxiesObj = res.proxies[0];
            if (proxiesObj.user_proxy !== undefined) {
                proxiesObj.user_proxy.forEach(obj => {
                    proxies.push(WorkflowConverter.UserProxy.toObject(obj));
                });
            }
            return proxies;
        });
    }

    public downloadFile(fileId: string): Promise<Buffer> {
        const parameters = [{_attr: {file_id: fileId}}];
        return this.client.post(this.path, 'WorkflowFileDownload', parameters).then((res: base.FileResponse) => {
            return BaseConverter.File.toBuffer(res['file'][0]);
        });
    }

    public getAttachedFileBody(params: workflow.GetAttachedFileBodyType[]): Promise<workflow.FileAttachedDetailType[]> {
        const parameters: Object[] = [];
        params.forEach(param => {
            parameters.push({
                parameter: {
                    _attr: {
                        request_form_id: param.requestFormId,
                        file_id: param.fileId
                    }
                }
            });
        });
        return this.client.post(this.path, 'WorkflowGetAttachedFileBody', parameters).then((res: workflow.AttachmentDetailsResponse) => {
            const details: workflow.FileAttachedDetailType[] = [];
            res.attachment_details.forEach(obj => {
                details.push(WorkflowConverter.FileAttachedDetail.toObject(obj));
            });
            return details;
        });
    }
}
