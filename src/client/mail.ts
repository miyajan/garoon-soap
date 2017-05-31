import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as mail from "../type/mail";
import * as BaseConverter from "../converter/base";
import * as MailConverter from "../converter/mail";
import * as datetime from "../util/datetime";

export default class Mail {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/mail/api.csp' : '/cbpapi/mail/api';
    }

    public getMailVersions(start: Date, end?: Date, mailItems?: base.ItemVersionType[], folderIds?: string[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];

        const attr: any = {start: datetime.toString(start)};
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});

        if (mailItems !== undefined) {
            mailItems.forEach(mailItem => {
                parameters.push({
                    mail_item: {
                        _attr: {
                            id: mailItem.id,
                            version: mailItem.version
                        }
                    }
                });
            });
        }

        if (folderIds !== undefined) {
            folderIds.forEach(folderId => {
                parameters.push({folder_id: folderId});
            });
        }

        return this.client.post(this.path, 'MailGetMailVersions', parameters).then((res: mail.MailItemsResponse) => {
            const mailItems: base.ItemVersionResultType[] = [];
            if (res.mail_item !== undefined) {
                res.mail_item.forEach(mailItem => {
                    mailItems.push(BaseConverter.ItemVersionResult.toObject(mailItem));
                });
            }
            return mailItems;
        });
    }

    public getMailsById(mailIds: string[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [];
        mailIds.forEach(mailId => {
            parameters.push({mail_id: mailId});
        });
        return this.client.post(this.path, 'MailGetMailsById', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public downloadSource(mailId: string): Promise<Buffer> {
        const parameters = [{_attr: {mail_id: mailId}}];
        return this.client.post(this.path, 'MailSourceDownload', parameters).then((res: mail.SourceResponse) => {
            return BaseConverter.File.toBuffer(res.source[0]);
        });
    }

    public getNewArrivingEmail(): Promise<mail.NewArrivingEmailType[]> {
        return this.client.post(this.path, 'MailGetNewArrivingEmail', []).then((res: mail.AccountsResponse) => {
            const mails: mail.NewArrivingEmailType[] = [];
            if (res.account !== undefined) {
                res.account.forEach(obj => {
                    mails.push(MailConverter.NewArrivingEmail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public moveMailsToOtherFolder(operations: mail.MoveMailsOperationType[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            parameters.push({
                operation: {
                    _attr: {
                        folder_id: operation.folderId,
                        mail_id: operation.mailId
                    }
                }
            })
        });
        return this.client.post(this.path, 'MailMoveMailsToOtherFolder', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public downloadFile(mailId: string, fileId: string): Promise<Buffer> {
        const parameters = [{
            _attr: {
                mail_id: mailId,
                file_id: fileId
            }
        }];
        return this.client.post(this.path, 'MailFileDownload', parameters).then((res: base.FileResponse) => {
            return BaseConverter.File.toBuffer(res.file[0]);
        });
    }

    public addFolders(operations: mail.AddFolderOperationType[]): Promise<mail.FolderType[]> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attr: any = {account_id: operation.accountId};
            if (operation.parentFolderId !== undefined) {
                attr.parent_folder_id = operation.parentFolderId;
            }
            const folderAttr: any = {
                key: 'dummy',
                name: operation.name
            };
            if (operation.description !== undefined) {
                folderAttr.description = operation.description;
            }
            parameters.push({
                add_folder: [
                    {
                        _attr: attr
                    },
                    {
                        folder: {
                            _attr: folderAttr
                        }
                    }
                ]
            });
        });
        return this.client.post(this.path, 'MailAddFolders', parameters).then((res: mail.FoldersResponse) => {
            const folders: mail.FolderType[] = [];
            if (res.folder !== undefined) {
                res.folder.forEach(obj => {
                    folders.push(MailConverter.Folder.toObject(obj));
                });
            }
            return folders;
        });
    }

    public modifyFolders(operations: mail.ModifyFolderOperationType[]): Promise<mail.FolderType[]> {
        const parameters: Object[] = [];
        operations.forEach(operation => {
            const attr: any = {account_id: operation.accountId};
            if (operation.parentFolderId !== undefined) {
                attr.parent_folder_id = operation.parentFolderId;
            }
            const folderAttr: any = {
                key: operation.folderId,
                name: operation.name
            };
            if (operation.description !== undefined) {
                folderAttr.description = operation.description;
            }
            parameters.push({
                modify_folder: [
                    {
                        _attr: attr
                    },
                    {
                        folder: {
                            _attr: folderAttr
                        }
                    }
                ]
            });
        });
        return this.client.post(this.path, 'MailModifyFolders', parameters).then((res: mail.FoldersResponse) => {
            const folders: mail.FolderType[] = [];
            if (res.folder !== undefined) {
                res.folder.forEach(obj => {
                    folders.push(MailConverter.Folder.toObject(obj));
                });
            }
            return folders;
        });
    }
}
