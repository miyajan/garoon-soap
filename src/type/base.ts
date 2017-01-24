export interface UserOrganizationXMLObject {
    $: Object
}

export interface UserPhotoXMLObject {
    $: Object
}

export interface UserXMLObject {
    $: Object
    organization?: Array<UserOrganizationXMLObject>
    photo?: Array<UserPhotoXMLObject>
}

export interface UserType {
    photo?: any
    organization?: any
    key: string
    version: string
    order?: string
    name: string
    login_name?: string
    status: string
    reading?: string
    url?: string
    email?: string
    phone?: string
    title?: string
    description?: string
    primary_organization?: string
}
