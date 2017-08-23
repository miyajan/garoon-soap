import Client from "./client";
import Setting from "./setting";
import * as cabinet from "../type/cabinet";
import * as CabinetConverter from "../converter/cabinet";

export default class Cabinet {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/cabinet/api.csp' : '/cbpapi/cabinet/api';
    }

    public getFileInfo(hid: string): Promise<cabinet.FileInformationType> {
        const parameters: Object[] = [{
            _attr: {
                hid: hid
            }
        }];
        return this.client.post(this.path, 'CabinetGetFileInfo', parameters).then((res: cabinet.FileInformationResponse) => {
            return CabinetConverter.FileInformation.toObject(res.file_information[0]);
        });
    }
}
