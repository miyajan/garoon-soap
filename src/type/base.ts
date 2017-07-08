export interface ItemVersionType {
    id: string,
    version: string
}

export interface ItemVersionResultXMLObject {
    $: Object
}

export interface UserItemsResponse {
    user_item: ItemVersionResultXMLObject[]
}

export interface OrgItemsResponse {
    organization_item: ItemVersionResultXMLObject[]
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
    organization?: UserOrganizationXMLObject[]
    photo?: UserPhotoXMLObject[]
}

export interface UsersResponse {
    user: UserXMLObject[]
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
    calendar_event: BaseGetCalendarEventXMLObject[]
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
    city?: CityXMLObject[]
}

export interface RegionsResponse {
    region: RegionXMLObject[]
}

export interface CityType {
    name?: string
    timezone?: string
}

export interface RegionType {
    name?: string
    cities: CityType[]
}

export interface TimezoneVersionResponse {
    timezone_version: string[]
}

export interface ApplicationXMLObject {
    $: Object
}

export interface ApplicationStatusResponse {
    application: ApplicationXMLObject[]
}

export interface BaseApplicationType {
    code: string
    status: string
}

export interface AvailableClientXMLObject {
    $: Object
}

export interface ApplicationInformationXMLObject {
    $: Object
    available_client?: AvailableClientXMLObject[]
}

export interface ApplicationInformationResponse {
    application: ApplicationInformationXMLObject[]
}

export interface BaseApplicationInformationType {
    module_id: string
    name: string
    url?: string
    available_feature: string
    available_client: string[]
}

export interface BaseManagerApplicationType {
    code: string
    active: boolean
}

export interface OrganizationType {
    key: string
    name: string
    version: string
    description?: string
    order?: string
    parent_organization: string
    organization: string[]
    members: string[]
}

export interface MemberXMLObject {
    $: Object
}

export interface MembersXMLObject {
    user: MemberXMLObject[]
}

export interface OrganizationXMLObject {
    $: Object
    organization?: OrganizationXMLObject[]
    members?: MembersXMLObject[]
}

export interface OrganizationsResponse {
    organization: OrganizationXMLObject[]
}

export interface MyGroupItemsResponse {
    my_group_item: ItemVersionResultXMLObject[]
}

export interface MyGroupType {
    key: string
    name: string
    version: string
    description?: string
    order?: string
    belong_member: string[]
    belong_facility: string[]
}

export interface BelongMemberXMLObject {
    $: Object
}

export interface BelongFacilityXMLObject {
    $: Object
}

export interface MyGroupXMLObject {
    $: Object
    belong_member?: BelongMemberXMLObject[]
    belong_facility?: BelongFacilityXMLObject[]
}

export interface MyGroupsResponse {
    my_group: MyGroupXMLObject[]
}

export interface UserIdsResponse {
    user_id: string[]
}

export interface FileXMLObject {
    content?: string[]
}

export interface FileResponse {
    file: FileXMLObject[]
}

export interface ChangeLogType {
    userId: string
    name: string
    date: Date
}

export interface ChangeLogXMLObject {
    $: any
}

export interface XMLObject {
    $: any
    $$?: XMLObject[]
    _: string
    '#name': string
}
