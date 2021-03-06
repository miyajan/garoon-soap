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

    public countNoGroupUsers(): Promise<number> {
        return this.client.post(this.path, 'AdminCountNoGroupUsers', []).then((res: any) => {
            return Number(res.number_users[0]);
        });
    }

    public getNoGroupUserIds(offset?: number, limit?: number): Promise<string[]> {
        const parameters: Object[] = [];
        if (offset) {
            parameters.push({'offset': offset});
        }
        if (limit) {
            parameters.push({'limit': limit});
        }
        return this.client.post(this.path, 'AdminGetNoGroupUserIds', parameters).then((res: admin.UserIdsResponse) => {
            const userIds: string[] = [];
            if (Array.isArray(res['userId'])) {
                res['userId']!.forEach((userId: string) => {
                    userIds.push(userId);
                });
            }
            return userIds;
        });
    }

    public countOrgsOfUser(userId: string): Promise<number> {
        const parameters: Object[] = [{'userId': userId}];
        return this.client.post(this.path, 'AdminCountOrgsOfUser', parameters).then((res: any) => {
            return Number(res.number_orgs[0]);
        });
    }

    public getOrgIdsOfUser(userId: string): Promise<string[]> {
        const parameters: Object[] = [{'userId': userId}];
        return this.client.post(this.path, 'AdminGetOrgIdsOfUser', parameters).then((res: any) => {
            const orgIds: string[] = [];
            if (Array.isArray(res['orgId'])) {
                res['orgId'].forEach((orgId: string) => {
                    orgIds.push(orgId);
                });
            }
            return orgIds;
        });
    }

    public getUserIdByLoginName(loginName: string): Promise<number> {
        const parameters: Object[] = [{'login_name': loginName}];
        return this.client.post(this.path, 'AdminGetUserIdByLoginName', parameters).then((res: any) => {
            return res['userId'][0];
        });
    }

    public countOrgs(): Promise<number> {
        return this.client.post(this.path, 'AdminCountOrgs', []).then((res: any) => {
            return Number(res['number_orgs'][0]);
        });
    }

    public getOrgIds(offset?: number, limit?: number): Promise<string[]> {
        const parameters: Object[] = [];
        if (offset) {
            parameters.push({'offset': offset});
        }
        if (limit) {
            parameters.push({'limit': limit});
        }
        return this.client.post(this.path, 'AdminGetOrgIds', parameters).then((res: any) => {
            const orgIds: string[] = [];
            if (Array.isArray(res['orgId'])) {
                res['orgId'].forEach((orgId: string) => {
                    orgIds.push(orgId);
                });
            }
            return orgIds;
        });
    }

    public getOrgDetailByIds(orgIds: string[]): Promise<admin.OrgDetail[]> {
        const parameters: Object[] = [];
        orgIds.forEach(orgId => {
            parameters.push({'orgId': orgId});
        });
        return this.client.post(this.path, 'AdminGetOrgDetailByIds', parameters).then((res: admin.OrgDetailsResponse) => {
            const orgDetails: admin.OrgDetail[] = [];
            if (Array.isArray(res['OrgDetail'])) {
                res['OrgDetail'].forEach(orgDetail => {
                    orgDetails.push(AdminConverter.OrgDetail.toObject(orgDetail));
                });
            }
            return orgDetails;
        });
    }

    public countChildOrgs(orgId: string): Promise<number> {
        const parameters: Object[] = [{'parent_orgId': orgId}];
        return this.client.post(this.path, 'AdminCountChildOrgs', parameters).then((res: any) => {
            return Number(res['number_child_orgs'][0]);
        });
    }

    public getChildOrgs(orgId: string, offset?: number, limit?: number): Promise<string[]> {
        const parameters: Object[] = [{'parent_orgId': orgId}];
        if (offset) {
            parameters.push({'offset': offset});
        }
        if (limit) {
            parameters.push({'limit': limit});
        }
        return this.client.post(this.path, 'AdminGetChildOrgs', parameters).then((res: any) => {
            const orgIds: string[] = [];
            if (Array.isArray(res['orgId'])) {
                res['orgId'].forEach((orgId: string) => {
                    orgIds.push(orgId);
                });
            }
            return orgIds;
        });
    }

    public getParentOrgId(orgId: string): Promise<string> {
        const parameters: Object[] = [{'child_orgId': orgId}];
        return this.client.post(this.path, 'AdminGetParentOrgId', parameters).then((res: any) => {
            return res['parent_orgId'][0];
        });
    }

    public getOrgIdByOrgCode(orgCode: string): Promise<string> {
        const parameters: Object[] = [{'org_code': orgCode}];
        return this.client.post(this.path, 'AdminGetOrgIdByOrgCode', parameters).then((res: any) => {
            return res['orgId'][0];
        });
    }
}
