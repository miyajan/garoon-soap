import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as base from "../type/base";

export default class Base {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/base/api.csp' : '/cbpapi/base/api';
    }

    public getUsersById(userIds: number[]): Promise<Array<base.UserType>> {
        const parameters: Array<Object> = [];
        userIds.forEach(userId => {
            parameters.push({'user_id': userId});
        });
        return this.client.post(this.path, 'BaseGetUsersById', parameters).then(res => {
            const users: Array<base.UserType> = [];
            res[0]['base:BaseGetUsersByIdResponse'][0]['returns'][0]['user'].forEach((obj: base.UserXMLObject) => {
                users.push(BaseConverter.User.toObject(obj));
            });
            return users;
        });
    }

    public getUsersByLoginName(loginNames: string[]): Promise<Array<base.UserType>> {
        const parameters: Array<Object> = [];
        loginNames.forEach(loginName => {
            parameters.push({'login_name': loginName});
        });
        return this.client.post(this.path, 'BaseGetUsersByLoginName', parameters).then(res => {
            const users: Array<base.UserType> = [];
            res[0]['base:BaseGetUsersByLoginNameResponse'][0]['returns'][0]['user'].forEach((obj: base.UserXMLObject) => {
                users.push(BaseConverter.User.toObject(obj));
            });
            return users;
        });
    }

    public getUserVersions(userItems: base.ItemVersionType[]) {
        const parameters: Array<Object> = [];
        userItems.forEach(userItem => {
            parameters.push({
                'user_item': {
                    '_attr': {
                        id: userItem.id,
                        version: userItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'BaseGetUserVersions', parameters).then(res => {
            const userVersions: Array<base.ItemVersionResultType> = [];
            res[0]['base:BaseGetUserVersionsResponse'][0]['returns'][0]['user_item'].forEach((obj: base.ItemVersionResultXMLObject) => {
                userVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
            });
            return userVersions;
        });
    }
}
