import * as star from "../type/star";

export class StarData {
    static toObject(xmlObj: star.StarDataXMLObject): star.StarDataType {
        const attrs = xmlObj['$'];
        return {
            id: attrs['id'],
            moduleId: attrs['module_id'],
            item: attrs['item'],
            subject: attrs['subject'],
            version: attrs['version']
        };
    }
}
