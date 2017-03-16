import * as message from "../type/message";
import * as Util from "../util";
import * as BaseConverter from "./base";

class File {
    static toObject(xmlObj: message.FileXMLObject): message.File {
        const attrs = xmlObj['$'];
        const file: any = {};
        file.id = attrs.id;
        file.name = attrs.name;
        if (attrs.hasOwnProperty('size')) {
            file.size = Number(attrs.size);
        }
        if (attrs.hasOwnProperty('mime_type')) {
            file.mimeType = attrs.mime_type;
        }
        return file;
    }
}

export class Thread {
    static toObject(xmlObj: message.ThreadXMLObject): message.ThreadType {
        const thread: any = {};

        const attrs = xmlObj['$'];
        thread.id = attrs.id;
        thread.version = attrs.version;
        thread.subject = attrs.subject;
        thread.confirm = Util.toBoolean(attrs.confirm);
        if (attrs.hasOwnProperty('snapshot')) {
            thread.snapshot = Util.toDate(attrs.snapshot);
        }
        if (attrs.hasOwnProperty('is_draft')) {
            thread.isDraft = Util.toBoolean(attrs.is_draft);
        }

        thread.addressees = [];
        if (Array.isArray(xmlObj.addressee)) {
            xmlObj.addressee!.forEach(obj => {
                const attrs = obj['$'];
                const addressee: any = {};
                if (attrs.hasOwnProperty('user_id')) {
                    addressee.userId = attrs.user_id;
                }
                addressee.name = attrs.name;
                addressee.deleted = Util.toBoolean(attrs.deleted);
                if (attrs.hasOwnProperty('confirmed')) {
                    addressee.confirmed = Util.toBoolean(attrs.confirmed);
                }
                thread.addressees.push(addressee);
            });
        }

        thread.content = {};
        const contentObj = xmlObj.content[0];
        const contentAttrs = contentObj['$'];
        thread.content.body = contentAttrs.body;
        if (contentAttrs.hasOwnProperty('html_body')) {
            thread.content.htmlBody = contentAttrs.html_body;
        }
        thread.content.files = [];
        if (Array.isArray(contentObj.file)) {
            contentObj.file!.forEach(obj => {
                thread.content.files.push(File.toObject(obj));
            });
        }

        thread.follows = [];
        if (Array.isArray(xmlObj.follow)) {
            xmlObj.follow!.forEach(obj => {
                const attrs = obj['$'];
                thread.follows.push({
                    id: attrs.id,
                    number: attrs.number
                });
            });
        }

        thread.folders = [];
        xmlObj.folder.forEach(obj => {
            const attrs = obj['$'];
            thread.folders.push(attrs.id);
        });

        if (Array.isArray(xmlObj.creator)) {
            thread.creator = BaseConverter.ChangeLog.toObject(xmlObj.creator[0]);
        }
        if (Array.isArray(xmlObj.modifier)) {
            thread.modifier = BaseConverter.ChangeLog.toObject(xmlObj.modifier[0]);
        }

        return thread;
    }
}

export class Follow {
    static toObject(xmlObj: message.FollowTypeXMLObject): message.FollowType {
        const follow: any = {};

        const attrs = xmlObj['$'];
        follow.id = attrs.id;
        follow.number = attrs.number;
        follow.text = attrs.text;
        if (attrs.hasOwnProperty('html_text')) {
            follow.htmlText = attrs.html_text;
        }

        if (Array.isArray(xmlObj.creator)) {
            follow.creator = BaseConverter.ChangeLog.toObject(xmlObj.creator[0]);
        }

        follow.files = [];
        if (Array.isArray(xmlObj.file)) {
            xmlObj.file!.forEach(obj => {
                follow.files.push(File.toObject(obj));
            });
        }

        return follow;
    }
}
