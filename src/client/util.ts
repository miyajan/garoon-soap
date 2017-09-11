import Client from "./client";
import Setting from "./setting";
import * as util from "../type/util";

export default class Util {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/util_api/util/api.csp' : '/util_api/util/api';
    }

    public login(loginName: string, password: string): Promise<string> {
        const parameters: Object[] = [
            {login_name: loginName},
            {password: password}
        ];
        return this.client.post(this.path, 'UtilLogin', parameters).then((res: util.CookieResponse) => {
            return res.cookie[0];
        });
    }

    public logout(): Promise<string> {
        return this.client.post(this.path, 'UtilLogout', []).then((res: util.LogoutResponse) => {
            return res.login_name[0];
        });
    }
}
