export interface ItemVersionType {
    id: string,
    version: string
}

export interface ItemVersionResultXMLObject {
    $: Object
}

export interface UserItemsResponse {
    user_item: Array<ItemVersionResultXMLObject>
}

export interface ItemVersionResultType {
    id: string,
    version: string,
    operation: string
}

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

export interface UsersResponse {
    user: Array<UserXMLObject>
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

export interface BaseGetCalendarEventXMLObject {
    $: Object
}

export interface CalendarEventsResponse {
    calendar_event: Array<BaseGetCalendarEventXMLObject>
}

export interface BaseGetCalendarEventType {
    date: Date,
    content: string,
    type: string
}

export interface CityXMLObject {
    $: Object
}

export interface RegionXMLObject {
    $: Object
    city?: Array<CityXMLObject>
}

export interface RegionsResponse {
    region: Array<RegionXMLObject>
}

export interface CityType {
    name?: string
    timezone?: string
}

export interface RegionType {
    name?: string
    cities: Array<CityType>
}

export interface TimezoneVersionResponse {
    timezone_version: Array<string>
}
