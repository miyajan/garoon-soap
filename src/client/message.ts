import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as MessageConverter from "../converter/message";
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
            if (Array.isArray(res['thread_item'])) {
                res['thread_item']!.forEach(obj => {
                    threadVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return threadVersions;
        });
    }

    public getThreadsById(threadIds: string[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        threadIds.forEach(threadId => {
            parameters.push({'thread_id': threadId});
        });
        return this.client.post(this.path, 'MessageGetThreadsById', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                });
            }
            return threads;
        });
    }

    public searchThreads(option: message.SearchOption): Promise<message.ThreadType[]> {
        const attr: any = {
            text: option.text,
            start: Util.formatDateTime(option.start),
            title_search: option.titleSearch.toString(),
            body_search: option.bodySearch.toString(),
            from_search: option.fromSearch.toString(),
            addressee_search: option.addresseeSearch.toString(),
            follow_search: option.followSearch.toString()
        };
        if (option.end instanceof Date) {
            attr.end = Util.formatDateTime(option.end);
        }
        if (option.hasOwnProperty('folderId')) {
            attr.folder_id = option.folderId;
        }
        if (option.hasOwnProperty('searchSubFolders')) {
            attr.search_sub_folders = option.searchSubFolders;
        }
        const parameters: Object[] = [{'_attr': attr}];
        return this.client.post(this.path, 'MessageSearchThreads', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                })
            }
            return threads;
        });
    }

    public confirmThreads(threadIds: string[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        threadIds.forEach(threadId => {
            parameters.push({'thread_id': threadId});
        });
        return this.client.post(this.path, 'MessageConfirmThreads', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                })
            }
            return threads;
        });
    }

    public downloadFile(fileId: string): Promise<Buffer> {
        const parameters = {
            '_attr': {
                file_id: fileId
            }
        };
        return this.client.post(this.path, 'MessageFileDownload', parameters).then((res: base.FileResponse) => {
            return BaseConverter.File.toBuffer(res['file'][0]);
        });
    }
}
