import Client from "./client";
import Setting from "./setting";

export default class Admin {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/star/api.csp' : '/cbpapi/star/api';
    }

    public getProfiles(): Promise<number> {
        return this.client.post(this.path, 'StarGetProfiles', []).then((res: any) => {
            return Number(res['$']['star_num_allow']);
        });
    }
}
