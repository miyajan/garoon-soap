import * as bulletin from "../type/bulletin";
import * as date from "../util/date";
import * as datetime from "../util/datetime";
import * as Util from "../util";
import * as BaseConverter from "../converter/base";

export class Category {
    static toObject(xmlObj: bulletin.CategoryXMLObject): bulletin.CategoryType {
        const categories: bulletin.CategoryType[] = [];
        if (xmlObj.categories !== undefined) {
            xmlObj.categories.forEach(obj => {
                if (obj.category !== undefined) {
                    const attrs = obj.$;
                    obj.category.forEach(categoryObj => {
                        const category = Category.toObject(categoryObj);
                        category.parentId = attrs.parent_id;
                        category.parentCode = attrs.parent_code;
                        categories.push(category);
                    });
                }
            });
        }

        const attrs = xmlObj.$;
        return {
            name: xmlObj.name[0],
            description: xmlObj.description[0],
            creatorId: xmlObj.creator_id[0],
            creatorLoginName: xmlObj.creator_login_name[0],
            creatorDisplayName: xmlObj.creator_display_name[0],
            createTime: date.toDate(xmlObj.create_time[0]),
            modifierId: xmlObj.modifier_id[0],
            modifierLoginName: xmlObj.modifier_login_name[0],
            modifierDisplayName: xmlObj.modifier_display_name[0],
            modifyTime: date.toDate(xmlObj.modify_time[0]),
            categories: categories,
            id: attrs.id,
            code: attrs.code,
            listIndex: attrs.list_index
        };
    }
}

export class Topic {
    static toObject(xmlObj: bulletin.TopicXMLObject): bulletin.TopicType {
        const contentObj = xmlObj.content[0];
        const files: bulletin.FileType[] = [];
        if (contentObj.file !== undefined) {
            contentObj.file.forEach(obj => {
                files.push({
                    id: obj.$.id,
                    name: obj.$.name,
                    size: obj.$.size,
                    mimeType: obj.$.mime_type
                });
            });
        }

        const attrs = xmlObj.$;
        const topic: bulletin.TopicType = {
            id: attrs.id,
            version: attrs.version,
            subject: attrs.subject,
            isDraft: Util.toBoolean(attrs.is_draft),
            canFollow: attrs.can_follow,
            categoryId: attrs.category_id,
            body: contentObj.$.body,
            files: files,
            creator: BaseConverter.ChangeLog.toObject(xmlObj.creator[0]),
            modifier: BaseConverter.ChangeLog.toObject(xmlObj.modifier[0])
        };

        if (attrs.start_datetime !== undefined) {
            topic.startDatetime = datetime.toDate(attrs.start_datetime);
        }
        if (attrs.end_datetime !== undefined) {
            topic.endDatetime = datetime.toDate(attrs.end_datetime);
        }
        if (attrs.start_is_datetime !== undefined) {
            topic.startIsDatetime = Util.toBoolean(attrs.start_is_datetime);
        }
        if (attrs.end_is_datetime !== undefined) {
            topic.endIsDatetime = Util.toBoolean(attrs.end_is_datetime);
        }
        if (attrs.published !== undefined) {
            topic.published = Util.toBoolean(attrs.published);
        }
        if (attrs.unread !== undefined) {
            topic.unread = Util.toBoolean(attrs.unread);
        }
        if (attrs.expired !== undefined) {
            topic.expired = Util.toBoolean(attrs.expired);
        }
        if (contentObj.$.html_body !== undefined) {
            topic.htmlBody = contentObj.$.html_body;
        }

        if (xmlObj.follow !== undefined) {
            const followObj = xmlObj.follow[0];
            topic.followId = followObj.$.id;
            topic.followNumber = followObj.$.number;
        }

        return topic;
    }
}
