import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as workflow from "../type/workflow";
import * as BaseConverter from "../converter/base";

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
}
