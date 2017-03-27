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
