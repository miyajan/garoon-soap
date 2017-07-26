import * as address from "../type/address";
import * as BaseConverter from "../converter/base";

export class Card {
    static toObject(obj: address.CardXMLObject): address.CardType {
        const attr = obj.$;
        const card: address.CardType = {
            bookId: attr.book_id,
            id: attr.id,
            version: attr.version,
            creator: BaseConverter.ChangeLog.toObject(obj.creator[0]),
            subject: obj.subject[0],
        };

        if (obj.modifier !== undefined) {
            card.modifier = BaseConverter.ChangeLog.toObject(obj.modifier[0]);
        }

        if (obj.personal_name !== undefined) {
            card.personalName = NameFieldValue.toObject(obj.personal_name[0]);
        }

        if (obj.personal_reading !== undefined) {
            card.personalReading = NameFieldValue.toObject(obj.personal_reading[0]);
        }

        if (obj.company_name !== undefined) {
            card.companyName = obj.company_name[0];
        }

        if (obj.company_reading !== undefined) {
            card.companyReading = obj.company_reading[0];
        }

        if (obj.section !== undefined) {
            card.section = obj.section[0];
        }

        if (obj.zip_code !== undefined) {
            card.zipCode = obj.zip_code[0];
        }

        if (obj.physical_address !== undefined) {
            card.physicalAddress = obj.physical_address[0];
        }

        if (obj.map !== undefined) {
            card.map = obj.map[0];
        }

        if (obj.route !== undefined) {
            card.route = RouteFieldValue.toObject(obj.route[0]);
        }

        if (obj.company_tel !== undefined) {
            card.companyTel = obj.company_tel[0];
        }

        if (obj.company_fax !== undefined) {
            card.companyFax = obj.company_fax[0];
        }

        if (obj.url !== undefined) {
            card.url = obj.url[0];
        }

        if (obj.post !== undefined) {
            card.post = obj.post[0];
        }

        if (obj.personal_tel !== undefined) {
            card.personalTel = obj.personal_tel[0];
        }

        if (obj.email !== undefined) {
            card.email = obj.email[0];
        }

        if (obj.image !== undefined) {
            card.image = FileFieldValue.toObject(obj.image[0]);
        }

        if (obj.description !== undefined) {
            card.description = obj.description[0];
        }

        return card;
    }
}

export class NameFieldValue {
    static toObject(obj: address.NameFieldValueXMLObject): address.NameFieldValueType {
        return {
            family: obj.part[0],
            given: obj.part[1]
        };
    }
}

export class RouteFieldValue {
    static toObject(obj: address.RouteFieldValueXMLObject): address.RouteFieldValueType {
        const route: address.RouteFieldValueType = {};

        if (obj.path !== undefined) {
            route.path = obj.path[0];
        }

        if (obj.time !== undefined) {
            route.time = obj.time[0];
        }

        if (obj.fare !== undefined) {
            route.fare = obj.fare[0];
        }

        return route;
    }
}

export class FileFieldValue {
    static toObject(obj: address.FileFieldValueXMLObject): address.FileFieldValueType {
        const attr = obj.$;
        return {
            name: attr.name,
            fileId: attr.file_id,
            size: attr.size,
            mimeType: attr.mime_type
        };
    }
}
