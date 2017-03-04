import * as base from "./base";

export interface StarItemsResponse {
    star_item: base.ItemVersionResultXMLObject[]
}

export interface StarDataType {
    id: string
    moduleId: string
    item: string
    subject: string
    version: string
}

export interface StarDataXMLObject {
    $: any
}

export interface StarDataResponse {
    star_data: StarDataXMLObject[]
}
