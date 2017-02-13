import Client from "./client";
import Setting from "./setting";
import * as admin from "../type/admin";

export default class Admin {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/sysapi/admin/api.csp' : '/sysapi/admin/api';
    }

    public getUserIds(offset?: number, limit?: number): Promise<string[]> {
        const parameters: Object[] = [];
        if (offset) {
            parameters.push({'offset': offset});
        }
        if (limit) {
            parameters.push({'limit': limit});
        }
        return this.client.post(this.path, 'AdminGetUserIds', parameters).then((res: admin.UserIdsResponse) => {
            const userIds: string[] = [];
            if (Array.isArray(res['userId'])) {
                res['userId']!.forEach((userId: string) => {
                    userIds.push(userId);
                });
            }
            return userIds;
        });
    }
}
