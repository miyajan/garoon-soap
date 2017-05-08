import * as bulletin from "../type/bulletin";
import * as date from "../util/date";

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
