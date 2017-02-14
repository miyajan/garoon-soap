export interface UserIdsResponse {
    userId?: string[]
}

export interface UserDetail {
    userId: string
    loginName: string
    displayName: string
}

export interface UserDetailXMLObject {
    userId: string[]
    login_name: string[]
    display_name: string[]
}

export interface UserDetailsResponse {
    userDetail: UserDetailXMLObject[]
}
