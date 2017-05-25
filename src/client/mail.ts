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
}
