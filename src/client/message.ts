import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as base from "./../type/base";
import * as message from "./../type/message";
import * as Util from "./../util";

export default class Admin {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/message/api.csp' : '/cbpapi/message/api';
    }

    public getThreadVersions(threadItems: base.ItemVersionType[], folderIds: string[], start: Date, end?: Date): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        threadItems.forEach(threadItem => {
            parameters.push({
                'thread_item': {
                    '_attr': {
                        id: threadItem.id,
                        version: threadItem.version
                    }
                }
            });
        });
        folderIds.forEach(folderId => {
            parameters.push({'folder_id': folderId});
        });
        const attr: any = {'start': Util.formatDateTime(start)};
        if (end instanceof Date) {
            attr['end'] = Util.formatDateTime(end);
        }
        parameters.push({'_attr': attr});
        return this.client.post(this.path, 'MessageGetThreadVersions', parameters).then((res: message.ThreadItemsResponse) => {
            const threadVersions: base.ItemVersionResultType[] = [];
            res['thread_item'].forEach(obj => {
                threadVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
            });
            return threadVersions;
        });
    }
}
