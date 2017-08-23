import * as cabinet from "../type/cabinet";
import * as datetime from "../util/datetime";

export class FileInformation {
    static toObject(obj: cabinet.FileInformationXMLObject): cabinet.FileInformationType {
        const filesObj = obj.files[0];

        const files: cabinet.FileType[] = [];
        if (filesObj.file !== undefined) {
            filesObj.file.forEach(obj => {
                files.push(File.toObject(obj));
            });
        }

        const attr = filesObj.$;
        return {
            parentId: attr.parent_id,
            parentCode: attr.parent_code,
            files: files
        };
    }
}

export class File {
    static toObject(obj: cabinet.FileXMLObject): cabinet.FileType {
        const histories: cabinet.HistoryType[] = [];
        obj.histories[0].history.forEach(obj => {
            histories.push(History.toObject(obj));
        });

        const attr = obj.$;
        const file: cabinet.FileType = {
            id: attr.id,
            folderId: attr.folder_id,
            title: obj.title[0],
            maxVersion: Number(obj.max_version[0]),
            name: obj.name[0],
            size: obj.size[0],
            mimeType: obj.mime_type[0],
            creatorId: obj.creator_id[0],
            creatorLoginName: obj.creator_login_name[0],
            creatorDisplayName: obj.creator_display_name[0],
            createTime: datetime.toDate(obj.create_time[0]),
            histories: histories
        };

        if (obj.description !== undefined) {
            file.description = obj.description[0];
        }

        if (obj.modifier_id !== undefined) {
            file.modifierId = obj.modifier_id[0];
        }

        if (obj.modifier_login_name !== undefined) {
            file.modifierLoginName = obj.modifier_login_name[0];
        }

        if (obj.modifier_display_name !== undefined) {
            file.modifierDisplayName = obj.modifier_display_name[0];
        }

        if (obj.modify_time !== undefined) {
            file.modifyTime = datetime.toDate(obj.modify_time[0]);
        }

        return file;
    }
}

export class History {
    static toObject(obj: cabinet.HistoryXMLObject): cabinet.HistoryType {
        return {
            version: obj.version[0],
            active: obj.active[0] === '1',
            name: obj.name[0],
            action: Number(obj.action[0]),
            comment: obj.comment[0],
            modifierId: obj.modifier_id[0],
            modifierLoginName: obj.modifier_login_name[0],
            modifierDisplayName: obj.modifier_display_name[0],
            modifyTime: datetime.toDate(obj.modify_time[0])
        };
    }
}
