import * as workflow from "../type/workflow";
import {BlankItemType} from "../type/workflow";
import * as datetime from "../util/datetime";
import * as base from "../type/base";
import * as Util from "../util";

export class Application {
    static toObject(obj: workflow.ApplicationXMLObject): workflow.ApplicationType {
        const children = obj.$$;

        const applicantObj = children.filter(obj => {
            return obj['#name'] === 'applicant';
        })[0];
        const applicant = Applicant.toObject(applicantObj);

        const items: workflow.ItemType[] = [];
        const itemsObj = children.filter(obj => {
            return obj['#name'] === 'items';
        })[0];
        if (itemsObj.$$ !== undefined) {
            itemsObj.$$.forEach(obj => {
                items.push(Item.toObject(obj));
            });
        }

        const steps: workflow.StepType[] = [];
        const stepsObj = children.filter(obj => {
            return obj['#name'] === 'steps';
        })[0];
        stepsObj.$$!.forEach(obj => {
            steps.push(Step.toObject(obj));
        });

        const operations: workflow.OperationType[] = [];
        const operationObjList = children.filter(obj => {
            return obj['#name'] === 'operation';
        });
        operationObjList.forEach(obj => {
            operations.push(Operation.toObject(obj));
        });

        const folders: workflow.FolderType[] = [];
        const folderObjList = children.filter(obj => {
            return obj['#name'] === 'folder';
        });
        const folderTypeObjList = children.filter(obj => {
            return obj['#name'] === 'folder_type';
        });
        folderObjList.forEach((obj, index) => {
            const type = folderTypeObjList[index]._;
            folders.push(Folder.toObject(obj, type));
        });

        const attr = obj.$;
        const application: workflow.ApplicationType = {
            id: attr.id,
            version: attr.version,
            status: attr.status,
            date: datetime.toDate(attr.date),
            processingStep: attr.processing_step,
            applicant: applicant,
            items: items,
            steps: steps,
            operations: operations,
            folders: folders
        };

        if (attr.name !== undefined) {
            application.name = attr.name;
        }
        if (attr.number !== undefined) {
            application.number = attr.number;
        }
        if (attr.urgent !== undefined) {
            application.urgent = Util.toBoolean(attr.urgent);
        }
        if (attr.status_type !== undefined) {
            application.statusType = attr.status_type;
        }

        return application;
    }
}

export class Applicant {
    static toObject(obj: base.XMLObject): workflow.ApplicantType {
        const attr = obj.$;
        const applicant: workflow.ApplicantType = {
            name: attr.name
        };

        if (attr.id !== undefined) {
            applicant.id = attr.id;
        }

        let proxies: base.XMLObject[] = [];
        if (obj.$$ !== undefined) {
            proxies = obj.$$.filter(obj => {
                return obj['#name'] === 'proxy';
            });
        }
        if (proxies.length > 0) {
            const proxyObj = proxies[0];
            applicant.proxy = Proxy.fromApplicantToObject(proxyObj);
        }

        return applicant;
    }
}

export class Proxy {
    static fromApplicantToObject(obj: base.XMLObject): workflow.ProxyType {
        const attr = obj.$;
        const proxy: workflow.ProxyType = {
            name: attr.name
        };

        if (attr.id !== undefined) {
            proxy.id = attr.id;
        }

        return proxy;
    }

    static fromProcessorToObject(obj: base.XMLObject): workflow.ProxyType {
        const attr = obj.$;
        const proxy: workflow.ProxyType = {
            name: attr.processor_name
        };
        if (attr.id !== undefined) {
            proxy.id = attr.id;
        }
        return proxy;
    }
}

export class Item {
    static toObject(obj: base.XMLObject): workflow.ItemType {
        const tagName = obj['#name'];
        if (tagName === 'item') {
            return ValueItem.toObject(obj);
        } else if (tagName === 'files_item') {
            return FilesItem.toObject(obj);
        } else if (tagName === 'blank_item') {
            return new BlankItemType();
        }
        throw new Error(`Unknown item: ${tagName}`);
    }
}

export class ValueItem {
    static toObject(obj: base.XMLObject): workflow.ValueItemType {
        const attr = obj.$;
        const rightAlign = attr.right_align === undefined ? false : Util.toBoolean(attr.right_align);
        return new workflow.ValueItemType(attr.name, attr.value, rightAlign);
    }
}

export class FilesItem {
    static toObject(obj: base.XMLObject): workflow.FilesItemType {
        const attr = obj.$;
        const files: workflow.FileType[] = [];
        if (obj.$$ !== undefined) {
            obj.$$.forEach(obj => {
                const attr = obj.$;
                const file: workflow.FileType = {
                    name: attr.name,
                    fileId: attr.file_id
                };
                if (attr.size !== undefined) {
                    file.size = attr.size;
                }
                if (attr.mime_type !== undefined) {
                    file.mimeType = attr.mime_type;
                }
                files.push(file);
            });
        }
        return new workflow.FilesItemType(attr.name, Util.toBoolean(attr.inline), files);
    }
}

export class Step {
    static toObject(obj: base.XMLObject): workflow.StepType {
        const processors: workflow.ProcessorType[] = [];
        obj.$$!.forEach(obj => {
            processors.push(Processor.toObject(obj));
        });

        const attr = obj.$;
        return {
            id: attr.id,
            name: attr.name,
            type: attr.type,
            isApprovalStep: attr.is_approval_step === '-1',
            processors: processors
        };
    }
}

export class Processor {
    static toObject(obj: base.XMLObject): workflow.ProcessorType {
        const attr = obj.$;
        const processor: workflow.ProcessorType = {};
        if (attr.id !== undefined) {
            processor.id = attr.id;
        }
        if (attr.processor_name !== undefined) {
            processor.name = attr.processor_name;
        }
        if (attr.date !== undefined) {
            processor.date = datetime.toDate(attr.processor_name);
        }
        if (attr.comment !== undefined) {
            processor.comment = attr.comment;
        }
        if (attr.result !== undefined) {
            processor.result = attr.result;
        }

        if (obj.$$ !== undefined) {
            const proxyObj = obj.$$[0];
            processor.proxy = Proxy.fromProcessorToObject(proxyObj);
        }

        return processor;
    }
}

export class Operation {
    static toObject(obj: base.XMLObject): workflow.OperationType {
        const operationObj = obj.$$![0];
        const tagName = operationObj['#name'];
        if (tagName === 'sent_back') {
            return new workflow.SentBackType()
        } else if (tagName === 'approve') {
            return new workflow.ApproveType();
        } else if (tagName === 'reject') {
            return new workflow.RejectType();
        } else if (tagName === 'withdraw') {
            return new workflow.WithdrawType();
        } else if (tagName === 'cancel') {
            return new workflow.CancelType();
        } else if (tagName === 'confirm') {
            return new workflow.ConfirmType();
        } else if (tagName === 'acknowledge') {
            return new workflow.AcknowledgeType();
        }
        throw new Error(`Unknown operation: ${tagName}`);
    }
}

export class Folder {
    static toObject(obj: base.XMLObject, type: string): workflow.FolderType {
        const attr = obj.$;
        return {
            id: attr.id,
            type: type
        };
    }
}

export class RequestManageForm {
    static toObject(obj: workflow.RequestManageFormXMLObject): workflow.RequestManageFormType {
        const form: workflow.RequestManageFormType = {};

        if (obj.manage_request_form !== undefined) {
            form.manageRequestForm = ManageForm.toObject(obj.manage_request_form[0]);
        }

        const attr = obj.$;
        if (attr.id_category !== undefined) {
            form.idCategory = attr.id_category;
        }
        if (attr.name_request_form !== undefined) {
            form.nameCategory = attr.name_category;
        }

        return form;
    }
}

export class ManageForm {
    static toObject(obj: workflow.ManageFormXMLObject): workflow.ManageFormType {
        const form: workflow.ManageFormType = {};

        if (obj.manage_item_detail !== undefined) {
            form.manageItemDetail = ManageItemDetail.toObject(obj.manage_item_detail[0]);
        }

        const attr = obj.$;
        if (attr.id_request_form !== undefined) {
            form.idRequestForm = attr.id_request_form;
        }
        if (attr.name_request_form !== undefined) {
            form.nameRequestForm = attr.name_request_form;
        }

        return form;
    }
}

export class ManageItemDetail {
    static toObject(obj: workflow.ManageItemDetailXMLObject): workflow.ManageItemDetailType {
        const attr = obj.$;
        return {
            pid: attr.pid,
            number: attr.number,
            priority: attr.priority,
            subject: attr.subject,
            status: attr.status,
            applicant: attr.applicant,
            lastApprover: attr.last_approver,
            requestDate: datetime.toDate(attr.request_date)
        };
    }
}

export class Category {
    static toObject(obj: workflow.CategoryXMLObject): workflow.CategoryType {
        const children: workflow.CategoryType[] = [];
        if (obj.child_category !== undefined) {
            obj.child_category.forEach(obj => {
                children.push(Category.toObject(obj));
            });
        }

        const attr = obj.$;
        const category: workflow.CategoryType = {
            id: attr.id,
            code: attr.code,
            name: attr.name,
            children: children
        };

        if (attr.parent_category !== undefined) {
            category.parentCategory = attr.parent_category;
        }
        if (attr.memo !== undefined) {
            category.memo = attr.memo;
        }
        if (attr.created !== undefined) {
            category.created = datetime.fromTimestamp(attr.created);
        }
        if (attr.last_update !== undefined) {
            category.lastUpdate = datetime.fromTimestamp(attr.last_update);
        }

        return category;
    }
}

export class RequestForm {
    static toObject(categoryId: string, obj: workflow.RequestFormXMLObject): workflow.RequestFormType {
        const attr = obj.$;
        const form: workflow.RequestFormType = {
            fid: attr.fid,
            type: attr.type,
            name: attr.name,
            active: attr.active === '1',
            iconType: attr.icon_type,
            categoryId: categoryId
        };

        if (attr.icon_id !== undefined) {
            form.iconId = attr.icon_id;
        }
        if (attr.icon_url !== undefined) {
            form.iconUrl = attr.icon_url;
        }

        return form;
    }
}

export class UserProxy {
    static toObject(obj: workflow.UserProxyXMLObject): workflow.UserProxyType {
        const approverIds: string[] = [];
        if (obj.proxy_approver !== undefined) {
            obj.proxy_approver.forEach(obj => {
                approverIds.push(obj.$.approver_id);
            });
        }

        const applicantIds: string[] = [];
        if (obj.proxy_applicant !== undefined) {
            obj.proxy_applicant.forEach(obj => {
                applicantIds.push(obj.$.applicant_id);
            });
        }

        const attr = obj.$;
        return {
            userId: attr.user_id,
            approverIds: approverIds,
            applicantIds: applicantIds
        };
    }
}

export class FileAttachedDetail {
    static toObject(obj: workflow.FileAttachedDetailXMLObject): workflow.FileAttachedDetailType {
        return {
            fileHeader: FileHeader.toObject(obj.file_header[0]),
            fileInformation: FileInformation.toObject(obj.file_information[0])
        };
    }
}

export class FileHeader {
    static toObject(obj: workflow.FileHeaderXMLObject): workflow.FileHeaderType {
        const attr = obj.$;
        return {
            fileId: attr.file_id,
            requestFormId: attr.request_form_id,
            name: attr.name,
            size: attr.size
        };
    }
}

export class FileInformation {
    static toObject(obj: workflow.FileInformationXMLObject): workflow.FileInformationType {
        const attr = obj.$;
        const information: workflow.FileInformationType = {
            subject: attr.subject,
            versioning: attr.versioning,
            createTime: datetime.fromTimestamp(attr.create_time),
            modifyTime: datetime.fromTimestamp(attr.modify_time)
        };

        if (attr.description !== undefined) {
            information.description = attr.description;
        }

        return information;
    }
}

export class AvailabilityUser {
    static toObject(obj: workflow.AvailabilityUserXMLObject): workflow.AvailabilityUserType {
        const attr = obj.$;
        return {
            id: attr.id,
            workflow: Util.toBoolean(attr.workflow),
            keitai: Util.toBoolean(attr.keitai)
        };
    }
}

export class Profiles {
    static toObject(obj: workflow.ProfilesXMLObject): workflow.ProfilesType {
        const attr = obj.$;
        return {
            usePendingApprovals: Util.toBoolean(attr.use_pending_approvals),
            useProxyApprovals: Util.toBoolean(attr.use_proxy_approvals),
            modifyProxies: Util.toBoolean(attr.modify_proxies)
        };
    }
}
