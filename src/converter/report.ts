import * as report from "../type/report";
import * as base from "../type/base";
import * as Util from "../util";
import * as BaseConverter from "./base";

export class Report {
    static toObject(obj: report.ReportXMLObject): report.ReportType {
        const children = obj.$$;

        const items: report.ItemType[] = [];
        const itemsObj = children.filter(obj => {
            return obj['#name'] === 'items';
        })[0];
        if (itemsObj.$$ !== undefined) {
            itemsObj.$$.forEach(obj => {
                items.push(Item.toObject(obj));
            });
        }

        const members: report.UserType[] = [];
        const membersObj = children.filter(obj => {
            return obj['#name'] === 'members';
        })[0];
        if (membersObj.$$ !== undefined) {
            membersObj.$$.forEach(obj => {
                members.push(User.toObject(obj));
            });
        }

        const notifyUsers: report.UserType[] = [];
        const notifyUsersObj = children.filter(obj => {
            return obj['#name'] === 'notifyusers';
        })[0];
        if (notifyUsersObj.$$ !== undefined) {
            notifyUsersObj.$$.forEach(obj => {
                notifyUsers.push(User.toObject(obj));
            });
        }

        const maintainers: report.UserType[] = [];
        const maintainersObj = children.filter(obj => {
            return obj['#name'] === 'maintainers';
        })[0];
        if (maintainersObj.$$ !== undefined) {
            maintainersObj.$$.forEach(obj => {
                maintainers.push(User.toObject(obj));
            });
        }

        const creatorObj = children.filter(obj => {
            return obj['#name'] === 'creator'
        })[0];
        const creator: base.ChangeLogType = BaseConverter.ChangeLog.toObjectFromXMLObject(creatorObj);

        const modifierObj = children.filter(obj => {
            return obj['#name'] === 'modifier'
        })[0];
        const modifier: base.ChangeLogType = BaseConverter.ChangeLog.toObjectFromXMLObject(modifierObj);

        const attr = obj.$;
        return {
            id: attr.id,
            subject: attr.subject,
            isDraft: attr.is_draft === undefined ? false : Util.toBoolean(attr.is_draft),
            items: items,
            members: members,
            notifyUsers: notifyUsers,
            maintainers: maintainers,
            creator: creator,
            modifier: modifier
        };
    }
}

export class Item {
    static toObject(obj: base.XMLObject): report.ItemType {
        const tagName = obj['#name'];
        if (tagName === 'item') {
            return ValueItem.toObject(obj);
        } else if (tagName === 'files_item') {
            return FilesItem.toObject(obj);
        } else if (tagName === 'blank_item') {
            return new report.BlankItemType();
        }
        throw new Error(`Unknown item: ${tagName}`);
    }
}

export class ValueItem {
    static toObject(obj: base.XMLObject): report.ValueItemType {
        const attr = obj.$;
        return new report.ValueItemType(attr.name, attr.value, attr.front, attr.back);
    }
}

export class FilesItem {
    static toObject(obj: base.XMLObject): report.FilesItemType {
        const attr = obj.$;
        const files: report.FileType[] = [];
        if (obj.$$ !== undefined) {
            obj.$$.forEach(obj => {
                const attr = obj.$;
                const file: report.FileType = {
                    name: attr.name,
                    fileId: attr.file_id
                };
                if (attr.size !== undefined) {
                    file.size = attr.size;
                }
                if (attr.mime_type !== undefined) {
                    file.mimeType = attr.mime_type;
                }
                files.push(file);
            });
        }
        return new report.FilesItemType(attr.name, Util.toBoolean(attr.inline), files);
    }
}

export class User {
    static toObject(obj: base.XMLObject): report.UserType {
        const attr = obj.$;
        return {
            id: attr.id,
            name: attr.name
        };
    }
}

export class Follow {
    static toObject(obj: report.FollowXMLObject): report.FollowType {
        const files: report.FileType[] = [];
        if (obj.file !== undefined) {
            obj.file.forEach(obj => {
                files.push(File.toObject(obj));
            });
        }

        const attr = obj.$;
        const follow: report.FollowType = {
            id: attr.id,
            number: attr.number,
            text: attr.text,
            creator: BaseConverter.ChangeLog.toObject(obj.creator[0]),
            files: files
        };

        if (attr.html_text !== undefined) {
            follow.htmlText = attr.html_text;
        }

        return follow;
    }
}

export class File {
    static toObject(obj: report.FileXMLObject): report.FileType {
        const attr = obj.$;
        const file: report.FileType = {
            name: attr.name,
            fileId: attr.file_id
        };

        if (attr.size !== undefined) {
            file.size = attr.size;
        }
        if (attr.mime_type !== undefined) {
            file.mimeType = attr.mime_type;
        }

        return file;
    }
}
