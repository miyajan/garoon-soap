import * as base from "./base";

export interface CategoryItemsResponse {
    category_item?: base.ItemVersionResultXMLObject[]
}

export interface CategoryType {
    name: string
    description: string
    creatorId: string
    creatorLoginName: string
    creatorDisplayName: string
    createTime: Date
    modifierId: string
    modifierLoginName: string
    modifierDisplayName: string
    modifyTime: Date
    categories: CategoryType[]
    id: string
    code: string
    listIndex: number
    parentId?: string
    parentCode?: string
}

export interface CategoriesXMLObject {
    $: any
    category?: CategoryXMLObject[]
}

export interface CategoryXMLObject {
    $: any
    name: string[]
    description: string[]
    creator_id: string[]
    creator_login_name: string[]
    creator_display_name: string[]
    create_time: string[]
    modifier_id: string[]
    modifier_login_name: string[]
    modifier_display_name: string[]
    modify_time: string[]
    categories?: CategoriesXMLObject[]
}

export interface CategoryInformationXMLObject {
    root: CategoryXMLObject[]
}

export interface CategoriesResponse {
    categories?: CategoryInformationXMLObject[]
}
