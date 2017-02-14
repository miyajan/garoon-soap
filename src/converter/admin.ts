import * as admin from "../type/admin";

export class UserDetail {
    static toObject(xmlObj: admin.UserDetailXMLObject): admin.UserDetail {
        return {
            userId: xmlObj.userId[0],
            loginName: xmlObj.login_name[0],
            displayName: xmlObj.display_name[0]
        };
    }
}
