import * as mail from "../type/mail";
import * as datetime from "../util/datetime";
import * as time from "../util/time";
import * as duration from "../util/duration";
import * as Util from "../util";

export class Mail {
    static toObject(xmlObj: mail.MailXMLObject): mail.MailType {
        const files: mail.FileType[] = [];
        if (xmlObj.file !== undefined) {
            xmlObj.file.forEach(obj => {
                files.push(File.toObject(obj));
            });
        }

        const attrs = xmlObj.$;
        const mail: mail.MailType = {
            id: attrs.key,
            version: attrs.version,
            subject: attrs.subject,
            body: attrs.body,
            folderId: attrs.folder_key,
            files: files
        };

        if (attrs.html_body !== undefined) {
            mail.htmlBody = attrs.html_body;
        }
        if (attrs.date !== undefined) {
            mail.date = datetime.toDate(attrs.date);
        }
        if (attrs.read !== undefined) {
            mail.read = datetime.toDate(attrs.read);
        }
        if (attrs.size !== undefined) {
            mail.size = Number(attrs.size);
        }
        if (attrs.is_sent !== undefined) {
            mail.isSent = Util.toBoolean(attrs.is_sent);
        }
        if (attrs.is_draft !== undefined) {
            mail.isDraft = Util.toBoolean(attrs.is_draft);
        }

        if (xmlObj.from !== undefined) {
            mail.from = MailAddress.toObject(xmlObj.from[0]);
        }
        if (xmlObj.sender !== undefined) {
            mail.sender = MailAddress.toObject(xmlObj.sender[0]);
        }
        if (xmlObj.to !== undefined) {
            const to: mail.MailAddressType[] = [];
            xmlObj.to.forEach(obj => {
                to.push(MailAddress.toObject(obj));
            });
            mail.to = to;
        }
        if (xmlObj.cc !== undefined) {
            const cc: mail.MailAddressType[] = [];
            xmlObj.cc.forEach(obj => {
                cc.push(MailAddress.toObject(obj));
            });
            mail.cc = cc;
        }
        if (xmlObj.bcc !== undefined) {
            const bcc: mail.MailAddressType[] = [];
            xmlObj.bcc.forEach(obj => {
                bcc.push(MailAddress.toObject(obj));
            });
            mail.bcc = bcc;
        }
        if (xmlObj.reply_to !== undefined) {
            mail.replyTo = MailAddress.toObject(xmlObj.reply_to[0]);
        }
        if (xmlObj.disposition_notification_to !== undefined) {
            mail.dispositionNotificationTo = MailAddress.toObject(xmlObj.disposition_notification_to[0]);
        }

        if (xmlObj.source !== undefined) {
            mail.source = MailSource.toObject(xmlObj.source[0]);
        }

        return mail;
    }
}

export class MailAddress {
    static toObject(xmlObj: mail.MailAddressXMLObject): mail.MailAddressType {
        const attrs = xmlObj.$;
        const address: mail.MailAddressType = {
            address: attrs.address
        };
        if (attrs.name !== undefined) {
            address.name = attrs.name;
        }
        return address;
    }
}

export class File {
    static toObject(xmlObj: mail.FileXMLObject): mail.FileType {
        const attrs = xmlObj.$;
        return {
            id: attrs.id,
            name: attrs.name,
            size: attrs.size,
            mimeType: attrs.mime_type
        };
    }
}

export class MailSource {
    static toObject(xmlObj: mail.MailSourceXMLObject): mail.MailSourceType {
        const attrs = xmlObj.$;
        const source: mail.MailSourceType = {
            id: attrs.id
        };
        if (attrs.size !== undefined) {
            source.size = Number(attrs.size);
        }
        return source;
    }
}

export class NewArrivingEmail {
    static toObject(xmlObj: mail.NewArrivingEmailXMLObject): mail.NewArrivingEmailType {
        const attrs = xmlObj.$;
        const disabled = attrs.disabled === 'Inactivate';
        const deleted = attrs.deleted === 'Deleted';
        return {
            id: attrs.id,
            name: attrs.name,
            email: attrs.email,
            newMails: Number(attrs.new_mails),
            disabled: disabled,
            deleted: deleted
        };
    }
}

export class Folder {
    static toObject(xmlObj: mail.FolderXMLObject): mail.FolderType {
        const mailIds: string[] = [];
        if (xmlObj.mail !== undefined) {
            xmlObj.mail.forEach(obj => {
                mailIds.push(obj.$.id);
            });
        }

        const attrs = xmlObj.$;
        const description = attrs.description === undefined ? '' : attrs.description;
        const subscribe = attrs.subscribe === undefined ? false : Util.toBoolean(attrs.subscribe);
        return {
            id: attrs.key,
            description: description,
            subscribe: subscribe,
            name: attrs.name,
            order: attrs.order,
            mailIds: mailIds
        };
    }
}

export class Account {
    static toObject(xmlObj: mail.AccountXMLObject): mail.AccountType {
        const mailboxes: mail.MailboxType[] = [];
        if (xmlObj.mailbox !== undefined) {
            xmlObj.mailbox.forEach(obj => {
                mailboxes.push(Mailbox.toObject(obj));
            });
        }

        const signatures: mail.AccountSignatureType[] = [];
        if (xmlObj.signatures !== undefined) {
            const signaturesObj = xmlObj.signatures[0];
            if (signaturesObj.signature !== undefined) {
                signaturesObj.signature.forEach(obj => {
                    signatures.push({
                        name: obj.$.name,
                        signature: obj._
                    });
                });
            }
        }

        const attr = xmlObj.$;
        return {
            id: attr.key,
            version: attr.version,
            userId: attr.user_id,
            serverId: attr.server_id,
            email: attr.email,
            username: attr.usermame,
            password: attr.password,
            mailboxes: mailboxes,
            signatures: signatures
        };
    }
}

export class Mailbox {
    static toObject(xmlObj: mail.MailboxXMLObject): mail.MailboxType {
        const filters: mail.FilterType[] = [];
        if (xmlObj.filters !== undefined) {
            const filtersObj = xmlObj.filters[0];
            if (filtersObj.filter !== undefined) {
                filtersObj.filter.forEach(obj => {
                    filters.push(Filter.toObject(obj));
                });
            }
        }

        const folders: mail.FolderType[] = [];
        if (xmlObj.folder !== undefined) {
            xmlObj.folder.forEach(obj => {
                folders.push(Folder.toObject(obj));
            });
        }

        const mailbox: mail.MailboxType = {
            filters: filters,
            folders: folders
        };

        if (xmlObj.inbox !== undefined) {
            mailbox.inbox = BuiltinFolder.toObject(xmlObj.inbox[0]);
        }
        if (xmlObj.sent !== undefined) {
            mailbox.sent = BuiltinFolder.toObject(xmlObj.sent[0]);
        }
        if (xmlObj.draft !== undefined) {
            mailbox.draft = BuiltinFolder.toObject(xmlObj.draft[0]);
        }
        if (xmlObj.trash !== undefined) {
            mailbox.trash = BuiltinFolder.toObject(xmlObj.trash[0]);
        }

        return mailbox;
    }
}

export class Filter {
    static toObject(xmlObj: mail.FilterXMLObject): mail.FilterType {
        const sizeConditions: mail.SizeConditionType[] = [];
        if (xmlObj.size !== undefined) {
            xmlObj.size.forEach(obj => {
                sizeConditions.push(SizeCondition.toObject(obj));
            });
        }

        const exprConditions: mail.ExprConditionType[] = [];
        if (xmlObj.expr !== undefined) {
            xmlObj.expr.forEach(obj => {
                exprConditions.push(ExprCondition.toObject(obj));
            });
        }

        const attr = xmlObj.$;
        const filter: mail.FilterType = {
            name: attr.name,
            folder: attr.folder,
            operation: attr.operation,
            sizeConditions: sizeConditions,
            exprConditions: exprConditions
        };

        if (attr.status !== undefined) {
            filter.status = attr.status;
        }

        return filter;
    }
}

export class SizeCondition {
    static toObject(xmlObj: mail.SizeConditionXMLObject): mail.SizeConditionType {
        const attr = xmlObj.$;
        return {
            content: Number(attr.content),
            method: attr.method
        };
    }
}

export class ExprCondition {
    static toObject(xmlObj: mail.ExprConditionXMLObject): mail.ExprConditionType {
        const attr = xmlObj.$;
        const condition: mail.ExprConditionType = {
            target: attr.target,
            method: attr.method
        };

        if (attr.content !== undefined) {
            condition.content = attr.content;
        }

        return condition;
    }
}

export class BuiltinFolder {
    static toObject(xmlObj: mail.BuiltinFolderXMLObject): mail.BuiltinFolderType {
        const mailIds: string[] = [];
        if (xmlObj.mail !== undefined) {
            xmlObj.mail.forEach(obj => {
                mailIds.push(obj.$.id);
            });
        }

        const attr = xmlObj.$;
        return {
            id: attr.key,
            description: attr.description,
            subscribe: attr.subscribe,
            mailIds: mailIds
        };
    }
}

export class UserAccount {
    static toObject(xmlObj: mail.UserAccountXMLObject): mail.UserAccountType {
        const accountInfoAttr = xmlObj.account_info[0].$;
        const mailSettingAttr = xmlObj.mail_setting[0].$;

        return {
            accountId: accountInfoAttr.account_id,
            userId: accountInfoAttr.user_id,
            userAccountCode: accountInfoAttr.user_account_code,
            userAccountName: accountInfoAttr.user_account_name,
            mailServerId: mailSettingAttr.mail_server_id,
            email: mailSettingAttr.email,
            accountName: mailSettingAttr.account_name,
            leaveServerMail: mailSettingAttr.leave_server_mail,
            deactivateUserAccount: mailSettingAttr.deactivate_user_account
        };
    }
}

export class Signature {
    static toObject(xmlObj: mail.SignatureXMLObject): mail.SignatureType {
        const attr = xmlObj.$;
        return {
            accountId: attr.account_id,
            name: attr.name,
            content: attr.content
        };
    }
}

export class PersonalProfile {
    static toObject(xmlObj: mail.PersonalProfileXMLObject): mail.PersonalProfileType {
        const fromNames: mail.FromNameType[] = [];
        if (xmlObj.from_name !== undefined) {
            xmlObj.from_name.forEach(obj => {
                fromNames.push({
                    accountId: obj.$.account_id,
                    name: obj.$.name
                });
            });
        }

        const attr = xmlObj.$;
        const profile: mail.PersonalProfileType = {
            showPreview: attr.show_preview,
            sendCharset: attr.send_charset,
            useTrash: attr.use_trash,
            useMessageDispositionNotification: attr.use_message_disposition_notification,
            replyMessageDispositionNotification: attr.reply_message_disposition_notification,
            fromNames: fromNames
        };

        if (attr.use_status !== undefined) {
            profile.useStatus = attr.use_status;
        }

        return profile;
    }
}

export class SystemProfile {
    static toObject(xmlObj: mail.SystemProfileXMLObject): mail.SystemProfileType {
        const limit = MailSizeLimits.toObject(xmlObj.limit[0]);


        const attr = xmlObj.$;
        const profile: mail.SystemProfileType = {
            disableClient: attr.disable_client,
            checkNewMailAtLogin: attr.check_new_mail_at_login,
            limit: limit,
            authority: UserAuthorities.toObject(xmlObj.authority[0])
        };

        if (xmlObj.auto_receive !== undefined) {
            const autoReceiveObj = xmlObj.auto_receive[0];
            const receiveTimes: Date[] = [];
            if (autoReceiveObj.receive_time !== undefined) {
                autoReceiveObj.receive_time.forEach(obj => {
                    receiveTimes.push(time.toDate(obj));
                });
            }
            const autoReceive: mail.AutoReceiveType = {
                receiveTimes: receiveTimes
            };

            if (autoReceiveObj.$.interval !== undefined) {
                autoReceive.interval = duration.toDate(autoReceiveObj.$.interval);
            }

            profile.autoReceive = autoReceive;
        }

        return profile;
    }
}

export class MailSizeLimits {
    static toObject(xmlObj: mail.MailSizeLimitsXMLObject): mail.MailSizeLimitsType {
        const attr = xmlObj.$;
        const limits: mail.MailSizeLimitsType = {};
        if (attr.total_kb !== undefined) {
            limits.totalKb = attr.total_kb;
        }
        if (attr.receive_kb !== undefined) {
            limits.receiveKb = attr.receive_kb;
        }
        if (attr.send_kb !== undefined) {
            limits.sendKb = attr.send_kb;
        }
        return limits;
    }
}

export class UserAuthorities {
    static toObject(xmlObj: mail.UserAuthoritiesXMLObject): mail.UserAuthoritiesType {
        const attr = xmlObj.$;
        return {
            allowAccountAllPermission: attr.allow_account_all_permission,
            allowAccountModification: attr.allow_account_modification,
            allowStoreOnServer: attr.allow_store_on_server,
            allowNewMailCheck: attr.allow_new_mail_check,
            allowCollectiveReception: attr.allow_collective_reception,
            allowSendMarkupBody: attr.allow_send_markup_body,
            allowDisplayMarkupImage: attr.allow_display_markup_image,
            allowMessageDispositionNotification: attr.allow_message_disposition_notification,
            allowStatus: attr.allow_status,
            allowHistory: attr.allow_history
        };
    }
}

export class MailServerInfo {
    static toObject(xmlObj: mail.MailServerInfoXMLObject): mail.MailServerInfoType {
        const attr = xmlObj.$;
        return {
            id: attr.id,
            serverCode: attr.server_code,
            serverName: attr.server_name,
            outgoing: MailServerOutgoing.toObject(xmlObj.outgoing[0]),
            incoming: MailServerIncoming.toObject(xmlObj.incoming[0])
        };
    }
}

export class MailServerOutgoing {
    static toObject(xmlObj: mail.MailServerOutgoingXMLObject): mail.MailServerOutgoing {
        const attr = xmlObj.$;
        const outgoing: mail.MailServerOutgoing = {
            serverName: attr.server_name,
            portNumber: Number(attr.port_number)
        };
        if (attr.use_ssl !== undefined) {
            outgoing.useSsl = Util.toBoolean(attr.use_ssl);
        }
        if (attr.encrypted_connection !== undefined) {
            outgoing.encryptedConnection = attr.encrypted_connection;
        }
        if (attr.smtp_auth !== undefined) {
            outgoing.smtpAuth = attr.smtp_auth;
        }
        if (attr.account_for_send !== undefined) {
            outgoing.accountForSend = Util.toBoolean(attr.account_for_send);
        }
        if (attr.pop_before_smtp !== undefined) {
            outgoing.popBeforeSmtp = Util.toBoolean(attr.pop_before_smtp);
        }
        if (attr.pop_before_smtp_wait_time !== undefined) {
            outgoing.popBeforeSmtpWaitTime = Number(attr.pop_before_smtp_wait_time);
        }
        if (attr.timeout !== undefined) {
            outgoing.timeout = Number(attr.timeout);
        }
        return outgoing;
    }
}

export class MailServerIncoming {
    static toObject(xmlObj: mail.MailServerIncomingXMLObject): mail.MailServerIncoming {
        const attr = xmlObj.$;
        const incoming: mail.MailServerIncoming = {
            serverName: attr.server_name,
            receiveProtocol: attr.receive_protocol,
            portNumber: Number(attr.port_number)
        };
        if (attr.use_ssl !== undefined) {
            incoming.useSsl = Util.toBoolean(attr.use_ssl);
        }
        if (attr.apop_auth_for_pop3 !== undefined) {
            incoming.apopAuthForPop3 = Util.toBoolean(attr.apop_auth_for_pop3);
        }
        if (attr.timeout !== undefined) {
            incoming.timeout = Number(attr.timeout);
        }
        return incoming;
    }
}
