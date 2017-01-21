import Client from "./client";
import Setting from "./setting";
import * as BaseType from "../type/base";

export default class Base {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/base/api.csp' : '/cbpapi/base/api';
    }

    public getUsersById(userIds: number[]): Promise<Object> {
        const parameters: Array<Object> = [];
        userIds.forEach(userId => {
            parameters.push({'user_id': userId});
        });
        return this.client.post(this.path, 'BaseGetUsersById', parameters).then(res => {
            const users: Array<Object> = [];
            res[0]['base:BaseGetUsersByIdResponse'][0]['returns'][0]['user'].forEach(obj => {
                users.push(BaseType.User.toObject(obj));
            });
            return users;
        });
    }
}
