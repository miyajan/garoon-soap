import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as bulletin from "../type/bulletin";
import * as BaseConverter from "../converter/base";

export default class Bulletin {
    private client: Client;
    private readonly path: string;

    constructor(setting: Setting) {
        this.client = new Client(setting);
        this.path = setting.needCsp ? '/cbpapi/bulletin/api.csp' : '/cbpapi/bulletin/api';
    }

    public getCategoryVersions(categoryItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        categoryItems.forEach(categoryItem => {
            parameters.push({
                'category_item': {
                    '_attr': {
                        id: categoryItem.id,
                        version: categoryItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'BulletinGetCategoryVersions', parameters).then((res: bulletin.CategoryItemsResponse) => {
            const categoryVersions: base.ItemVersionResultType[] = [];
            if (res.category_item !== undefined) {
                res.category_item.forEach(obj => {
                    categoryVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return categoryVersions;
        });
    }
}
