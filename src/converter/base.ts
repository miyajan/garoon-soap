import * as base from "../type/base";
import * as Util from "../util";

export default class User {
    static toObject(xmlObj: base.UserXMLObject): base.UserType {
        const user: any = {};

        const attrs: Object = xmlObj['$'];
        Util.copyProps(attrs, user);

        if (Array.isArray(xmlObj['organization']) && xmlObj['organization']!.length > 0) {
            user['organization'] = [];
            xmlObj['organization']!.forEach(orgObj => {
                const org = {};
                const attrs = orgObj['$'];
                Util.copyProps(attrs, org);
                user['organization'].push(org);
            });
        }
        if (Array.isArray(xmlObj['photo']) && xmlObj['photo']!.length > 0) {
            user['photo'] = [];
            xmlObj['photo']!.forEach(photoObj => {
                const photo = {};
                const attrs = photoObj['$'];
                Util.copyProps(attrs, photo);
                user['photo'].push(photo);
            });
        }
        return user;
    }
}
