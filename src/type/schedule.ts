import * as base from "./base";

export interface SearchOptions {
    text: string
    start?: Date
    end?: Date
    startForDaily?: Date
    endForDaily?: Date
    titleSearch?: boolean
    customerSearch?: boolean
    memoSearch?: boolean
    followSearch?: boolean
    allRepeatEvents?: boolean
}

export interface EntityType {
    id: string
    order?: string
}

export interface MembersType {
    users: EntityType[]
    organizations: EntityType[]
    facilities: EntityType[]
}

export interface ObserversType {
    users: EntityType[]
    organizations: EntityType[]
    roles: EntityType[]
}

export interface CustomerType {
    name?: string
    zipcode?: string
    address?: string
    map?: string
    route?: string
    routeTime?: string
    routeFare?: string
    phone?: string
}

export interface RepeatConditionType {
    type: string
    startDate: Date
    endDate?: Date
    startTime?: Date
    endTime?: Date
    day?: number
    week?: number
}

export interface RepeatExclusiveDatetimeType {
    start: Date
    end: Date
}

export interface RepeatInfoType {
    condition: RepeatConditionType
    exclusiveDatetimes: RepeatExclusiveDatetimeType[]
}

export interface EventDateTimeType {
    start: Date
    end?: Date
    facilityCode?: string
}

export interface EventDateType {
    start: Date
    end?: Date
}

export interface WhenType {
    datetimes: EventDateTimeType[]
    dates: EventDateType[]
}

export interface FollowType {
    id: string
    version: string
    text: string
    creator: base.ChangeLogType
}

export interface FileType {
    id: string
    name: string
    size?: string
    mimeType?: string
}

export interface EventType {
    id: string
    eventType: string
    version: string
    publicType?: string
    plan?: string
    detail?: string
    description?: string
    timezone?: string
    endTimezone?: string
    allDay?: boolean
    startOnly?: boolean
    hiddenPrivate?: boolean
    facilityUsingPurpose?: string
    members: MembersType
    observers: ObserversType
    customer?: CustomerType
    repeatInfo?: RepeatInfoType
    when?: WhenType
    follows: FollowType[]
    files: FileType[]
    removeFileIds: string[]
}

export interface EntityXMLObject {
    $: any
}

export interface MemberXMLObject {
    user?: EntityXMLObject[]
    organization?: EntityXMLObject[]
    facility?: EntityXMLObject[]
}

export interface MembersXMLObject {
    member?: MemberXMLObject[]
}

export interface ObserverXMLObject {
    user?: EntityXMLObject[]
    organization?: EntityXMLObject[]
    role?: EntityXMLObject[]
}

export interface ObserversXMLObject {
    observer?: ObserverXMLObject[]
}

export interface CustomerXMLObject {
    $: any
}

export interface RepeatConditionXMLObject {
    $: any
}

export interface RepeatExclusiveDatetimeXMLObject {
    $: any
}

export interface RepeatExclusiveDatetimesXMLObject {
    exclusive_datetime?: RepeatExclusiveDatetimeXMLObject[]
}

export interface RepeatInfoXMLObject {
    condition: RepeatConditionXMLObject[]
    exclusive_datetimes?: RepeatExclusiveDatetimesXMLObject[]
}

export interface EventDateTimeXMLObject {
    $: any
}

export interface EventDateXMLObject {
    $: any
}

export interface WhenXMLObject {
    datetime?: EventDateTimeXMLObject[]
    date?: EventDateXMLObject[]
}

export interface FollowXMLObject {
    $: any
    creator: base.ChangeLogXMLObject[]
}

export interface FollowsXMLObject {
    follow: FollowXMLObject[]
}

export interface FileXMLObject {
    $: any
}

export interface EventTypeXMLObject {
    $: any
    members?: MembersXMLObject[]
    observers?: ObserversXMLObject[]
    customer?: CustomerXMLObject[]
    repeat_info?: RepeatInfoXMLObject[]
    when?: WhenXMLObject[]
    follows?: FollowsXMLObject[]
    file?: FileXMLObject[]
    remove_file_id?: string[]
}

export interface EventsResponse {
    schedule_event?: EventTypeXMLObject[]
}

export interface CandidateType {
    start: Date
    end: Date
}

export interface FreeTimeType {
    start: Date
    end: Date
    facilityId?: string
}

export interface CandidateXMLObject {
    $: any
}

export interface FreeTimesResponse {
    candidate?: CandidateXMLObject[]
}

export interface FacilityItemsResponse {
    facility_item?: base.ItemVersionResultXMLObject[]
}

export interface FacilityType {
    key: string
    name: string
    facilityCode: string
    version: string
    order?: number
    description?: string
    belongFacilityGroup: string
}

export interface FacilityXMLObject {
    $: any
}

export interface FacilitiesResponse {
    facility?: FacilityXMLObject[]
}

export interface FacilityGroupItemsResponse {
    facility_group_item?: base.ItemVersionResultXMLObject[]
}

export interface FacilityGroupType {
    id: string
    name: string
    version: string
    order?: number
    parentFacilityGroup?: string
    children: string[]
    facilities: string[]
}

export interface IdXMLObject {
    $: any
}

export interface FacilityGroupXMLObject {
    $: any
    facility_group?: IdXMLObject[]
    facility?: IdXMLObject[]
}

export interface FacilityGroupsResponse {
    facility_group?: FacilityGroupXMLObject[]
}

export interface FacilityProfileItemsResponse {
    facility_profile_item?: base.ItemVersionResultXMLObject[]
}

export interface FacilityProfileType {
    key: string
    approvalRequired: boolean
}

export interface FacilityProfileXMLObject {
    $: any
}

export interface FacilityProfilesResponse {
    facility_profile: FacilityProfileXMLObject[]
}

export interface PersonalProfileType {
    startTimeInDayView?: number
    endTimeInDayView?: number
    showSunday?: boolean
    showEndTime?: boolean
    planMenu?: string
    notifyMail?: boolean
    isUserAddressMail?: boolean
    notifyMailAddress?: string
}

export interface SystemProfileType {
    planMenu?: string
    eventReserveUnit?: number
    eventRepeatMaxTime?: number
    registerPrivateEvent?: boolean
    showMemo?: boolean
    showPrivateEvent?: boolean
    managedNotify?: boolean
    showGroupEvent?: boolean
    showHoliday?: boolean
    allowFileAttachment?: boolean
    allowAttendanceCheck?: boolean
    visibilityDefault?: number
}

export interface ProfileType {
    personalProfileType: PersonalProfileType
    systemProfileType?: SystemProfileType
}

export interface PersonalProfileXMLObject {
    $: any
}

export interface SystemProfileXMLObject {
    $: any
}

export interface ProfilesResponse {
    personal_profile: PersonalProfileXMLObject[]
    system_profile?: SystemProfileXMLObject[]
}

export interface PersonalProfileResponse {
    personal_profile: PersonalProfileXMLObject[]
}

export interface EventItemsResponse {
    event_item?: base.ItemVersionResultXMLObject[]
}

export interface AddEventType {
    eventType: string
    publicType?: string
    plan?: string
    detail?: string
    description?: string
    timezone?: string
    endTimezone?: string
    allDay?: boolean
    startOnly?: boolean
    hiddenPrivate?: boolean
    facilityUsingPurpose?: string
    members: MembersType
    observers?: ObserversType
    customer?: CustomerType
    repeatInfo?: RepeatInfoType
    when?: WhenType
}

export interface ModifyEventType {
    id: string
    eventType: string
    publicType?: string
    plan?: string
    detail?: string
    description?: string
    timezone?: string
    endTimezone?: string
    allDay?: boolean
    startOnly?: boolean
    hiddenPrivate?: boolean
    facilityUsingPurpose?: string
    members: MembersType
    observers?: ObserversType
    customer?: CustomerType
    repeatInfo?: RepeatInfoType
    when?: WhenType
}

export interface ModifyRepeatEventsOperationType {
    scheduleEvent: ModifyEventType
    type: string
    date?: Date
}

export interface ModifyRepeatEventsResultType {
    original: EventType
    modified: EventType
}

export interface ModifyRepeatEventsResultXMLObject {
    original: EventTypeXMLObject[]
    modified: EventTypeXMLObject[]
}

export interface ModifyRepeatEventsResultsResponse {
    result: ModifyRepeatEventsResultXMLObject[]
}

export interface RemoveEventsFromRepeatEventOperationType {
    eventId: string
    type: string
    date?: Date
}
