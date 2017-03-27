import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as MessageConverter from "../converter/message";
import * as base from "./../type/base";
import * as message from "./../type/message";
import * as Util from "./../util";
import * as datetime from "../util/datetime";

export default class Message {
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
        const attr: any = {'start': datetime.toString(start)};
        if (end instanceof Date) {
            attr['end'] = datetime.toString(end);
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
            start: datetime.toString(option.start),
            title_search: option.titleSearch.toString(),
            body_search: option.bodySearch.toString(),
            from_search: option.fromSearch.toString(),
            addressee_search: option.addresseeSearch.toString(),
            follow_search: option.followSearch.toString()
        };
        if (option.end instanceof Date) {
            attr.end = datetime.toString(option.end);
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

    public createThreads(threads: message.CreateThreadType[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        threads.forEach(thread => {
            const createThread: any = [];
            const threadObj: any = [];
            const attrObj: any = {
                '_attr': {
                    'id': 'dummy',
                    'version': 'dummy',
                    'subject': thread.subject,
                    'confirm': thread.confirm.toString()
                }
            };
            if (thread.hasOwnProperty('isDraft')) {
                attrObj['is_draft'] = thread.isDraft!.toString();
            }
            threadObj.push(attrObj);

            thread.addressees.forEach(addressee => {
                const addresseeAttrObj: any = {
                    user_id: addressee,
                    name: 'dummy',
                    deleted: 'false'
                };
                threadObj.push({
                    'addressee': [{
                        '_attr': addresseeAttrObj
                    }]
                });
            });

            const contentAttrObj: any = {
                'body': thread.content.body
            };
            if (thread.content.hasOwnProperty('htmlBody')) {
                contentAttrObj['html_body'] = thread.content.htmlBody;
            }
            threadObj.push({
                'content': [{
                    '_attr': contentAttrObj
                }]
            });

            if (Array.isArray(thread.files)) {
                thread.files.forEach(file => {
                    const fileObj: any = [{'content': file.content.toString('base64')}];
                    threadObj.push({'file': fileObj});
                });
            }

            createThread.push({'thread': threadObj});

            parameters.push({'create_thread': createThread});
        });
        return this.client.post(this.path, 'MessageCreateThreads', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                });
            }
            return threads;
        });
    }

    public modifyThreads(threads: message.ModifyThreadType[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        threads.forEach(thread => {
            const modifyThread: any = [];
            const threadObj: any = [];
            const attrObj: any = {
                '_attr': {
                    'id': thread.id,
                    'version': 'dummy',
                    'subject': thread.subject,
                    'confirm': 'false'
                }
            };
            if (thread.hasOwnProperty('isDraft')) {
                attrObj['is_draft'] = thread.isDraft!.toString();
            }
            threadObj.push(attrObj);

            thread.addressees.forEach(addressee => {
                const addresseeAttrObj: any = {
                    user_id: addressee,
                    name: 'dummy',
                    deleted: 'false'
                };
                threadObj.push({
                    'addressee': [{
                        '_attr': addresseeAttrObj
                    }]
                });
            });

            const contentAttrObj: any = {
                'body': thread.content.body
            };
            if (thread.content.hasOwnProperty('htmlBody')) {
                contentAttrObj['html_body'] = thread.content.htmlBody;
            }
            threadObj.push({
                'content': [{
                    '_attr': contentAttrObj
                }]
            });

            if (Array.isArray(thread.files)) {
                thread.files.forEach(file => {
                    const fileObj: any = [
                        {'content': file.content.toString('base64')},
                        {'_attr': {'id': file.id}}
                    ];
                    threadObj.push({'file': fileObj});
                });
            }

            modifyThread.push({'thread': threadObj});

            parameters.push({'modify_thread': modifyThread});
        });
        return this.client.post(this.path, 'MessageModifyThreads', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                });
            }
            return threads;
        });
    }

    public saveDraftThreads(threads: message.DraftThreadType[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        threads.forEach(thread => {
            const draftThread: any = [];
            const threadObj: any = [];
            const attrObj: any = {
                '_attr': {
                    'id': 'dummy',
                    'version': 'dummy',
                    'subject': thread.subject,
                    'confirm': thread.confirm.toString()
                }
            };
            threadObj.push(attrObj);

            thread.addressees.forEach(addressee => {
                const addresseeAttrObj: any = {
                    user_id: addressee,
                    name: 'dummy',
                    deleted: 'false'
                };
                threadObj.push({
                    'addressee': [{
                        '_attr': addresseeAttrObj
                    }]
                });
            });

            const contentAttrObj: any = {
                'body': thread.content.body
            };
            if (thread.content.hasOwnProperty('htmlBody')) {
                contentAttrObj['html_body'] = thread.content.htmlBody;
            }
            threadObj.push({
                'content': [{
                    '_attr': contentAttrObj
                }]
            });

            if (Array.isArray(thread.files)) {
                thread.files.forEach(file => {
                    const fileObj: any = [{'content': file.content.toString('base64')}];
                    threadObj.push({'file': fileObj});
                });
            }

            draftThread.push({'thread': threadObj});

            parameters.push({'save_draft_thread': draftThread});
        });
        return this.client.post(this.path, 'MessageSaveDraftThreads', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                });
            }
            return threads;
        });
    }

    public removeThreads(threads: message.RemoveThreadType[], deleteAllInbox?: boolean): Promise<void> {
        const parameters: Object[] = [];
        threads.forEach(thread => {
            parameters.push({
                'param': {
                    '_attr': {
                        'folder_id': thread.folderId,
                        'thread_id': thread.threadId
                    }
                }
            })
        });
        if (typeof(deleteAllInbox) === 'boolean') {
            parameters.push({
                '_attr': {'delete_all_inbox': deleteAllInbox.toString()}
            });
        }
        return this.client.post(this.path, 'MessageRemoveThreads', parameters).then(() => {
        });
    }

    public getFollows(threadId: string, offset: number, limit: number): Promise<message.FollowType[]> {
        const parameters: Object[] = [{
            '_attr': {
                'thread_id': threadId,
                'offset': offset,
                'limit': limit
            }
        }];
        return this.client.post(this.path, 'MessageGetFollows', parameters).then((res: message.FollowsResponseType) => {
            const follows: message.FollowType[] = [];
            if (Array.isArray(res.follow)) {
                res.follow!.forEach(obj => {
                    follows.push(MessageConverter.Follow.toObject(obj));
                });
            }
            return follows;
        });
    }

    public addFollows(follows: message.AddFollowType[]): Promise<message.ThreadType[]> {
        const parameters: Object[] = [];
        follows.forEach(follow => {
            const addFollow: any = [{
                '_attr': {
                    'thread_id': follow.threadId
                }
            }];
            const followAttr: any = {
                'id': 'dummy',
                'number': 'dummy',
                'text': follow.text
            };
            if (follow.hasOwnProperty('htmlText')) {
                followAttr['html_text'] = follow.htmlText;
            }
            const followObj: any = [{
                '_attr': followAttr
            }];
            if (Array.isArray(follow.files)) {
                follow.files.forEach((file, i) => {
                    const id = i + 1;
                    followObj.append({
                        'file': {
                            '_attr': {
                                'id': id,
                                'name': file.name
                            }
                        }
                    });
                    addFollow.append({
                        'file': [
                            {
                                '_attr': {
                                    'id': id
                                }
                            },
                            {
                                'content': file.content.toString('base64')
                            }
                        ]
                    })
                });
            }
            addFollow.push({'follow': followObj});
            parameters.push({
                'add_follow': addFollow
            });
        });
        return this.client.post(this.path, 'MessageAddFollows', parameters).then((res: message.ThreadsResponse) => {
            const threads: message.ThreadType[] = [];
            if (Array.isArray(res.thread)) {
                res.thread!.forEach(obj => {
                    threads.push(MessageConverter.Thread.toObject(obj));
                });
            }
            return threads;
        });
    }

    public removeFollows(followIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        followIds.forEach(followId => {
            parameters.push({'follow_id': followId});
        });
        return this.client.post(this.path, 'MessageRemoveFollows', parameters).then(() => {
        });
    }

    public getFolderVersions(folderItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        folderItems.forEach(folderItem => {
            parameters.push({
                'folder_item': {
                    '_attr': {
                        id: folderItem.id,
                        version: folderItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'MessageGetFolderVersions', parameters).then((res: message.FolderItemsResponse) => {
            const folderVersions: base.ItemVersionResultType[] = [];
            if (Array.isArray(res['folder_item'])) {
                res['folder_item']!.forEach(obj => {
                    folderVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return folderVersions;
        });
    }

    public getFoldersById(folderIds: string[]): Promise<message.FolderType[]> {
        const parameters: Object[] = [];
        folderIds.forEach(folderId => {
            parameters.push({'folder_id': folderId});
        });
        return this.client.post(this.path, 'MessageGetFoldersById', parameters).then((res: message.FoldersResponse) => {
            const folders: message.FolderType[] = [];
            if (Array.isArray(res.folder)) {
                res.folder!.forEach(obj => {
                    folders.push(MessageConverter.Folder.toObject(obj));
                });
            }
            return folders;
        });
    }

    public getProfiles(includeSystemProfile?: boolean): Promise<message.ProfileType> {
        const parameters: Object[] = [];
        if (typeof includeSystemProfile === 'boolean') {
            parameters.push({'_attr': {'include_system_profile': includeSystemProfile}});
        }
        return this.client.post(this.path, 'MessageGetProfiles', parameters).then((res: message.ProfilesResponse) => {
            const personalAttr = res.personal_profile[0]['$'];
            const profile: any = {
                useTrash: Util.toBoolean(personalAttr['use_trash']),
                trashDuration: Number(personalAttr['trash_duration'])
            };
            if (res.hasOwnProperty('system_profile')) {
                const systemAttr = res.system_profile[0]['$'];
                profile.checkSendConfirm = Util.toBoolean(systemAttr['check_send_confirm']);
                profile.confirmAction = systemAttr['confirm_action'];
            }
            return profile;
        });
    }

    public setProfiles(useTrash: boolean, trashDuration: number): Promise<message.ProfileType> {
        const parameters: Object[] = [];
        parameters.push({
            'personal_profile': {
                '_attr': {
                    'use_trash': useTrash,
                    'trash_duration': trashDuration
                }
            }
        });
        return this.client.post(this.path, 'MessageSetProfiles', parameters).then((res: message.ProfilesResponse) => {
            const personalAttr = res.personal_profile[0]['$'];
            const profile: any = {
                useTrash: Util.toBoolean(personalAttr['use_trash']),
                trashDuration: Number(personalAttr['trash_duration'])
            };
            return profile;
        });
    }
}
