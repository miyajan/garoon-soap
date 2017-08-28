import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as cabinet from "../type/cabinet";
import * as BaseConverter from "../converter/base";
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

    public downloadFile(fileId: string): Promise<Buffer> {
        const parameters: Object[] = [{
            _attr: {
                file_id: fileId
            }
        }];
        return this.client.post(this.path, 'CabinetFileDownload', parameters).then((res: base.FileResponse) => {
            return BaseConverter.File.toBuffer(res['file'][0]);
        });
    }

    public addFile(content: Buffer, folderId: string, name: string, title?: string, version?: string, description?: string): Promise<cabinet.SimpleFileType> {
        const attr: any = {
            hid: folderId,
            name: name,
        };
        if (title !== undefined) {
            attr.title = title;
        }
        if (version !== undefined) {
            attr.version = version;
        }
        if (description !== undefined) {
            attr.description = description;
        }
        const parameters: Object[] = [
            {
                _attr: attr
            },
            {
                content: content.toString('base64')
            }
        ];
        return this.client.post(this.path, 'CabinetAddFile', parameters).then((res: cabinet.SimpleFileResponse) => {
            return CabinetConverter.SimpleFile.toObject(res.file[0]);
        });
    }

    public updateFile(content: Buffer, fileId: string, name: string, comment?: string): Promise<cabinet.SimpleFileType> {
        const attr: any = {
            file_id: fileId,
            name: name
        };
        if (comment !== undefined) {
            attr.comment = comment;
        }
        const parameters: Object[] = [
            {
                _attr: attr
            },
            {
                content: content.toString('base64')
            }
        ];
        return this.client.post(this.path, 'CabinetUpdateFile', parameters).then((res: cabinet.SimpleFileResponse) => {
            return CabinetConverter.SimpleFile.toObject(res.file[0]);
        });
    }

    public updateFileInformation(fileId: string, title?: string, version?: string, description?: string): Promise<cabinet.SimpleFileType> {
        const attr: any = {
            file_id: fileId
        };
        if (title !== undefined) {
            attr.title = title;
        }
        if (version !== undefined) {
            attr.version = version;
        }
        if (description !== undefined) {
            attr.description = description;
        }
        const parameters: Object[] = [{
            _attr: attr
        }];
        return this.client.post(this.path, 'CabinetUpdateFileInformation', parameters).then((res: cabinet.SimpleFileResponse) => {
            return CabinetConverter.SimpleFile.toObject(res.file[0]);
        });
    }

    public deleteFile(fileId: string): Promise<void> {
        const parameters: Object[] = [{
            file_id: fileId
        }];
        return this.client.post(this.path, 'CabinetDeleteFiles', parameters).then(() => {
        });
    }
}
