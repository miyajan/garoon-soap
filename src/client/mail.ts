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
        return this.client.post(this.path, 'MailGetNewArrivingEmail', []).then((res: mail.NewArrivingEmailAccountsResponse) => {
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

    public removeFolders(folderIds: string[]): Promise<void> {
        const parameters: Object[] = [];
        folderIds.forEach(folderId => {
            parameters.push({folder_id: folderId});
        });
        return this.client.post(this.path, 'MailRemoveFolders', parameters).then(() => {
        });
    }

    public getAccountVersions(accountItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        accountItems.forEach(accountItem => {
            parameters.push({
                account_item: {
                    _attr: {
                        id: accountItem.id,
                        version: accountItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'MailGetAccountVersions', parameters).then((res: mail.AccountItemVersionsResponse) => {
            const accountVersions: base.ItemVersionResultType[] = [];
            if (res.account_item !== undefined) {
                res.account_item.forEach(obj => {
                    accountVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return accountVersions;
        });
    }

    public getAccountsById(accountIds: string[]): Promise<mail.AccountType[]> {
        const parameters: Object[] = [];
        accountIds.forEach(accountId => {
            parameters.push({account_id: accountId});
        });
        return this.client.post(this.path, 'MailGetAccountsById', parameters).then((res: mail.AccountsResponse) => {
            const accounts: mail.AccountType[] = [];
            if (res.account !== undefined) {
                res.account.forEach(obj => {
                    accounts.push(MailConverter.Account.toObject(obj));
                });
            }
            return accounts;
        });
    }

    public createUserAccount(accounts: mail.CreateUserAccountType[]): Promise<mail.UserAccountType[]> {
        const parameters: Object[] = [];
        accounts.forEach(account => {
            const accountAttr: any = {
                account_id: 'dummy',
                user_id: account.userId,
                user_acount_code: account.userAccountCode
            };
            if (account.userAccountName !== undefined) {
                accountAttr.user_account_name = account.userAccountName;
            }

            const mailSettingAttr: any = {
                mail_server_id: account.mailServerId,
                email: account.email,
                acount_name: account.accountName
            };
            if (account.password !== undefined) {
                mailSettingAttr.password = account.password;
            }
            if (account.leaveServerMail !== undefined) {
                mailSettingAttr.leave_server_mail = account.leaveServerMail;
            }
            if (account.deactivateUserAccount !== undefined) {
                mailSettingAttr.deactivate_user_account = account.deactivateUserAccount;
            }

            parameters.push({
                mail_user_accounts: [
                    {
                        account_info: {
                            _attr: accountAttr
                        }
                    },
                    {
                        mail_setting: {
                            _attr: mailSettingAttr
                        }
                    }
                ]
            });
        });
        return this.client.post(this.path, 'MailCreateUserAccount', parameters).then((res: mail.UserAccountsResponse) => {
            const accounts: mail.UserAccountType[] = [];
            res.user_accounts.forEach(obj => {
                accounts.push(MailConverter.UserAccount.toObject(obj));
            });
            return accounts;
        });
    }

    public editUserAccount(accounts: mail.EditUserAccountType[]): Promise<mail.UserAccountType[]> {
        const parameters: Object[] = [];
        accounts.forEach(account => {
            const accountAttr: any = {
                account_id: account.accountId,
                user_id: account.userId,
                user_acount_code: account.userAccountCode
            };
            if (account.userAccountName !== undefined) {
                accountAttr.user_account_name = account.userAccountName;
            }

            const mailSettingAttr: any = {
                mail_server_id: account.mailServerId,
                email: account.email,
                acount_name: account.accountName
            };
            if (account.password !== undefined) {
                mailSettingAttr.password = account.password;
            }
            if (account.leaveServerMail !== undefined) {
                mailSettingAttr.leave_server_mail = account.leaveServerMail;
            }
            if (account.deactivateUserAccount !== undefined) {
                mailSettingAttr.deactivate_user_account = account.deactivateUserAccount;
            }

            parameters.push({
                mail_user_accounts: [
                    {
                        account_info: {
                            _attr: accountAttr
                        }
                    },
                    {
                        mail_setting: {
                            _attr: mailSettingAttr
                        }
                    }
                ]
            });
        });
        return this.client.post(this.path, 'MailEditUserAccount', parameters).then((res: mail.UserAccountsResponse) => {
            const accounts: mail.UserAccountType[] = [];
            res.user_accounts.forEach(obj => {
                accounts.push(MailConverter.UserAccount.toObject(obj));
            });
            return accounts;
        });
    }

    public deleteUserAccount(accounts: mail.DeleteUserAccountType[]): Promise<void> {
        const parameters: Object[] = [];
        accounts.forEach(account => {
            const attr: any = {
                account_id: account.accountId
            };
            if (account.deleteAllEmail !== undefined) {
                attr.delete_all_email = account.deleteAllEmail;
            }
            parameters.push({
                delete_user_accounts: {
                    _attr: attr
                }
            });
        });
        return this.client.post(this.path, 'MailDeleteUserAccount', parameters).then(() => {
        });
    }

    public getSignatures(accountId: string): Promise<mail.SignatureType[]> {
        const parameters = [{
            _attr: {
                account_id: accountId
            }
        }];
        return this.client.post(this.path, 'MailGetSignatures', parameters).then((res: mail.SignaturesResponse) => {
            const signatures: mail.SignatureType[] = [];
            if (res.signature !== undefined) {
                res.signature.forEach(obj => {
                    signatures.push(MailConverter.Signature.toObject(obj));
                });
            }
            return signatures;
        });
    }

    public getFilters(accountId: string): Promise<mail.FilterType[]> {
        const parameters = [{
            _attr: {
                account_id: accountId
            }
        }];
        return this.client.post(this.path, 'MailGetFilters', parameters).then((res: mail.FiltersResponse) => {
            const filters: mail.FilterType[] = [];
            if (res.filter !== undefined) {
                res.filter.forEach(obj => {
                    filters.push(MailConverter.Filter.toObject(obj));
                });
            }
            return filters;
        });
    }

    public getProfiles(includeSystemProfile: boolean): Promise<mail.ProfilesType> {
        const parameters = [{
            _attr: {
                include_system_profile: includeSystemProfile
            }
        }];
        return this.client.post(this.path, 'MailGetProfiles', parameters).then((res: mail.ProfilesResponse) => {
            const profiles: mail.ProfilesType = {
                personalProfile: MailConverter.PersonalProfile.toObject(res.personal_profile[0])
            };
            if (res.system_profile !== undefined) {
                profiles.systemProfile = MailConverter.SystemProfile.toObject(res.system_profile[0]);
            }
            return profiles;
        });
    }

    public setProfiles(profile: mail.PersonalProfileType): Promise<mail.PersonalProfileType> {
        const parameters: Object[] = [];
        const personalProfile: Object[] = [];
        const attr: any = {
            show_preview: profile.showPreview,
            send_charset: profile.sendCharset,
            use_trash: profile.useTrash,
            use_message_disposition_notification: profile.useMessageDispositionNotification,
            reply_message_disposition_notification: profile.replyMessageDispositionNotification
        };
        if (profile.useStatus !== undefined) {
            attr.use_status = profile.useStatus;
        }
        personalProfile.push({
            _attr: attr
        });
        if (profile.fromNames.length > 0) {
            profile.fromNames.forEach(fromName => {
                personalProfile.push({
                    from_name: {
                        _attr: {
                            account_id: fromName.accountId,
                            name: fromName.name
                        }
                    }
                });
            });
        }
        parameters.push({
            personal_profile: personalProfile
        });
        return this.client.post(this.path, 'MailSetProfiles', parameters).then((res: mail.PersonalProfileResponse) => {
            return MailConverter.PersonalProfile.toObject(res.personal_profile[0]);
        });
    }

    public sendMails(mails: mail.SendMailType[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [];
        mails.forEach(mail => {
            const sendMail: Object[] = [];
            const attr: any = {
                account_id: mail.accountId
            };
            if (mail.from !== undefined) {
                attr.from_string = mail.from;
            }
            if (mail.sender !== undefined) {
                attr.sender_string = mail.sender;
            }
            if (mail.to !== undefined) {
                attr.to_string = mail.to;
            }
            if (mail.cc !== undefined) {
                attr.cc_string = mail.cc;
            }
            if (mail.bcc !== undefined) {
                attr.bcc_string = mail.bcc;
            }
            if (mail.replyTo !== undefined) {
                attr.reply_to_string = mail.replyTo;
            }
            if (mail.draftId !== undefined) {
                attr.draft_id = mail.draftId;
            }
            sendMail.push({
                _attr: attr
            });

            const mailAttr: any = {
                key: 'dummy',
                version: 'dummy',
                subject: mail.subject,
                body: mail.body,
                folder_key: 'dummy'
            };
            if (mail.htmlBody !== undefined) {
                mailAttr.html_body = mail.htmlBody;
            }

            const mailObj: Object[] = [];
            mailObj.push({
                _attr: mailAttr
            });

            if (mail.files !== undefined) {
                mail.files.forEach((file, index) => {
                    const fileId = index;
                    mailObj.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    sendMail.push({
                        file: [
                            {
                                _attr: {
                                    id: fileId
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            sendMail.push({
                mail: mailObj
            });

            if (mail.removeFileIds !== undefined) {
                mail.removeFileIds.forEach(removeFileId => {
                    sendMail.push({
                        remove_file_id: removeFileId
                    });
                });
            }

            parameters.push({
                send_mail: sendMail
            });
        });
        return this.client.post(this.path, 'MailSendMails', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public replyMails(replyAll: boolean, mails: mail.ReplyMailType[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [{
            _attr: {
                reply_all: replyAll
            }
        }];
        mails.forEach(mail => {
            const replyMail: Object[] = [];
            const attr: any = {
                account_id: mail.accountId
            };
            if (mail.from !== undefined) {
                attr.from_string = mail.from;
            }
            if (mail.sender !== undefined) {
                attr.sender_string = mail.sender;
            }
            if (mail.to !== undefined) {
                attr.to_string = mail.to;
            }
            if (mail.cc !== undefined) {
                attr.cc_string = mail.cc;
            }
            if (mail.bcc !== undefined) {
                attr.bcc_string = mail.bcc;
            }
            if (mail.replyTo !== undefined) {
                attr.reply_to_string = mail.replyTo;
            }
            if (mail.draftId !== undefined) {
                attr.draft_id = mail.draftId;
            }
            replyMail.push({
                _attr: attr
            });

            const mailAttr: any = {
                key: mail.id,
                version: 'dummy',
                subject: mail.subject,
                body: mail.body,
                folder_key: 'dummy'
            };
            if (mail.htmlBody !== undefined) {
                mailAttr.html_body = mail.htmlBody;
            }

            const mailObj: Object[] = [];
            mailObj.push({
                _attr: mailAttr
            });

            if (mail.files !== undefined) {
                mail.files.forEach((file, index) => {
                    const fileId = index;
                    mailObj.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    replyMail.push({
                        file: [
                            {
                                _attr: {
                                    id: fileId
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            replyMail.push({
                mail: mailObj
            });

            if (mail.removeFileIds !== undefined) {
                mail.removeFileIds.forEach(removeFileId => {
                    replyMail.push({
                        remove_file_id: removeFileId
                    });
                });
            }

            parameters.push({
                reply_mail: replyMail
            });
        });
        return this.client.post(this.path, 'MailReplyMails', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public forwardMails(mails: mail.ForwardMailType[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [];
        mails.forEach(mail => {
            const forwardMail: Object[] = [];
            const attr: any = {
                account_id: mail.accountId,
                mail_id: mail.mailId
            };
            if (mail.from !== undefined) {
                attr.from_string = mail.from;
            }
            if (mail.sender !== undefined) {
                attr.sender_string = mail.sender;
            }
            if (mail.to !== undefined) {
                attr.to_string = mail.to;
            }
            if (mail.cc !== undefined) {
                attr.cc_string = mail.cc;
            }
            if (mail.bcc !== undefined) {
                attr.bcc_string = mail.bcc;
            }
            if (mail.replyTo !== undefined) {
                attr.reply_to_string = mail.replyTo;
            }
            if (mail.draftId !== undefined) {
                attr.draft_id = mail.draftId;
            }
            forwardMail.push({
                _attr: attr
            });

            const mailAttr: any = {
                key: mail.mailId,
                version: 'dummy',
                subject: mail.subject,
                body: mail.body,
                folder_key: 'dummy'
            };
            if (mail.htmlBody !== undefined) {
                mailAttr.html_body = mail.htmlBody;
            }

            const mailObj: Object[] = [];
            mailObj.push({
                _attr: mailAttr
            });

            if (mail.files !== undefined) {
                mail.files.forEach((file, index) => {
                    const fileId = index;
                    mailObj.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    forwardMail.push({
                        file: [
                            {
                                _attr: {
                                    id: fileId
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            forwardMail.push({
                mail: mailObj
            });

            if (mail.removeFileIds !== undefined) {
                mail.removeFileIds.forEach(removeFileId => {
                    forwardMail.push({
                        remove_file_id: removeFileId
                    });
                });
            }

            parameters.push({
                forward_mail: forwardMail
            });
        });
        return this.client.post(this.path, 'MailForwardMails', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }

    public saveDraftMails(mails: mail.DraftMailType[]): Promise<mail.MailType[]> {
        const parameters: Object[] = [];
        mails.forEach(mail => {
            const draftMail: Object[] = [];
            const attr: any = {
                account_id: mail.accountId,
                operation: mail.operation
            };
            if (mail.from !== undefined) {
                attr.from_string = mail.from;
            }
            if (mail.sender !== undefined) {
                attr.sender_string = mail.sender;
            }
            if (mail.to !== undefined) {
                attr.to_string = mail.to;
            }
            if (mail.cc !== undefined) {
                attr.cc_string = mail.cc;
            }
            if (mail.bcc !== undefined) {
                attr.bcc_string = mail.bcc;
            }
            if (mail.replyTo !== undefined) {
                attr.reply_to_string = mail.replyTo;
            }
            if (mail.draftId !== undefined) {
                attr.draft_id = mail.draftId;
            }
            draftMail.push({
                _attr: attr
            });

            const mailAttr: any = {
                key: 'dummy',
                version: 'dummy',
                subject: mail.subject,
                body: mail.body,
                folder_key: 'dummy'
            };
            if (mail.htmlBody !== undefined) {
                mailAttr.html_body = mail.htmlBody;
            }

            const mailObj: Object[] = [];
            mailObj.push({
                _attr: mailAttr
            });

            if (mail.files !== undefined) {
                mail.files.forEach((file, index) => {
                    const fileId = index;
                    mailObj.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    draftMail.push({
                        file: [
                            {
                                _attr: {
                                    id: fileId
                                }
                            },
                            {
                                content: file.content.toString('base64')
                            }
                        ]
                    });
                });
            }

            draftMail.push({
                mail: mailObj
            });

            if (mail.removeFileIds !== undefined) {
                mail.removeFileIds.forEach(removeFileId => {
                    draftMail.push({
                        remove_file_id: removeFileId
                    });
                });
            }

            parameters.push({
                save_mail: draftMail
            });
        });
        return this.client.post(this.path, 'MailSaveDraftMails', parameters).then((res: mail.MailsResponse) => {
            const mails: mail.MailType[] = [];
            if (res.mail !== undefined) {
                res.mail.forEach(obj => {
                    mails.push(MailConverter.Mail.toObject(obj));
                });
            }
            return mails;
        });
    }
}
