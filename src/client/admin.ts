import Client from "./client";
import Setting from "./setting";
import * as AdminConverter from "../converter/admin";
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

    public getUserDetailByIds(userIds: string[]): Promise<admin.UserDetail[]> {
        const parameters: Object[] = [];
        userIds.forEach(userId => {
            parameters.push({'userId': userId});
        });
        return this.client.post(this.path, 'AdminGetUserDetailByIds', parameters).then((res: admin.UserDetailsResponse) => {
            const userDetails: admin.UserDetail[] = [];
            res.userDetail.forEach(userDetail => {
                userDetails.push(AdminConverter.UserDetail.toObject(userDetail));
            });
            return userDetails;
        });
    }

    public countUsers(): Promise<number> {
        return this.client.post(this.path, 'AdminCountUsers', []).then((res: any) => {
            return Number(res.number_users[0]);
        });
    }

    public countUsersInOrg(orgId: string): Promise<number> {
        const parameters = [
            {'orgId': orgId}
        ];
        return this.client.post(this.path, 'AdminCountUsersInOrg', parameters).then((res: any) => {
            return Number(res.number_users[0]);
        });
    }

    public getUserIdsInOrg(orgId: string, offset?: number, limit?: number): Promise<string[]> {
        const parameters: Object[] = [{'orgId': orgId}];
        if (offset) {
            parameters.push({'offset': offset});
        }
        if (limit) {
            parameters.push({'limit': limit});
        }
        return this.client.post(this.path, 'AdminGetUserIdsInOrg', parameters).then((res: admin.UserIdsResponse) => {
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
