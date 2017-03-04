import Client from "./client";
import Setting from "./setting";
import * as BaseConverter from "../converter/base";
import * as StarConverter from "../converter/star";
import * as base from "./../type/base";
import * as star from "./../type/star";

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

    public getStarVersions(starItems: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        starItems.forEach(starItem => {
            parameters.push({
                'star_item': {
                    '_attr': {
                        id: starItem.id,
                        version: starItem.version
                    }
                }
            });
        });
        return this.client.post(this.path, 'StarGetStarVersions', parameters).then((res: star.StarItemsResponse) => {
            const starVersions: base.ItemVersionResultType[] = [];
            res['star_item'].forEach(obj => {
                starVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
            });
            return starVersions;
        });
    }

    getStarsById(starIds: string[]): Promise<star.StarDataType[]> {
        const parameters: Object[] = [];
        starIds.forEach(starId => {
            parameters.push({'star_id': starId});
        });
        return this.client.post(this.path, 'StarGetStarsById', parameters).then((res: star.StarDataResponse) => {
            const starData: star.StarDataType[] = [];
            if (Array.isArray(res.star_data)) {
                res.star_data.forEach(obj => {
                    starData.push(StarConverter.StarData.toObject(obj));
                });
            }
            return starData;
        });
    }
}
