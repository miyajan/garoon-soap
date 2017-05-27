import * as mail from "../type/mail";
import * as datetime from "../util/datetime";
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
