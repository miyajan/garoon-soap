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

export class OrgDetail {
    static toObject(xmlObj: admin.OrgDetailXMLObject): admin.OrgDetail {
        return {
            orgId: xmlObj.orgId[0],
            code: xmlObj.org_code[0],
            name: xmlObj.org_name[0]
        }
    }
}
