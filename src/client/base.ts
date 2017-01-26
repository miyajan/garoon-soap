import Client from "./client";
import Setting from "./setting";
import User from "../converter/base";
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
                users.push(User.toObject(obj));
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
                users.push(User.toObject(obj));
            });
            return users;
        });
    }
}
