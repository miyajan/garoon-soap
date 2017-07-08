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
