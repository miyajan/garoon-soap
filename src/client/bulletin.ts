import Client from "./client";
import Setting from "./setting";
import * as base from "../type/base";
import * as bulletin from "../type/bulletin";
import * as BaseConverter from "../converter/base";
import * as BulletinConverter from "../converter/bulletin";
import * as datetime from "../util/datetime";

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

    public getCategories(): Promise<bulletin.CategoryType | null> {
        return this.client.post(this.path, 'BulletinGetCategories', []).then((res: bulletin.CategoriesResponse) => {
            if (res.categories !== undefined) {
                return BulletinConverter.Category.toObject(res.categories[0].root[0]);
            }
            return null;
        });
    }

    public searchTopics(options: bulletin.SearchOptions): Promise<bulletin.TopicType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            text: options.text,
            start: datetime.toString(options.start),
            category_id: 0,
            search_sub_categories: true,
            title_search: true,
            body_search: true,
            from_search: true,
            follow_search: true
        };
        if (options.sensitive !== undefined) {
            attr.sensitive = options.sensitive;
        }
        if (options.end !== undefined) {
            attr.end = datetime.toString(options.end);
        }
        if (options.categoryId !== undefined) {
            attr.category_id = options.categoryId;
        }
        if (options.searchSubCategories !== undefined) {
            attr.search_sub_categories = options.searchSubCategories;
        }
        if (options.titleSearch !== undefined) {
            attr.title_search = options.titleSearch;
        }
        if (options.bodySearch !== undefined) {
            attr.body_search = options.bodySearch;
        }
        if (options.fromSearch !== undefined) {
            attr.from_search = options.fromSearch;
        }
        if (options.followSearch !== undefined) {
            attr.follow_search = options.followSearch;
        }
        parameters.push({_attr: attr});
        return this.client.post(this.path, 'BulletinSearchTopics', parameters).then((res: bulletin.TopicsResponse) => {
            const topics: bulletin.TopicType[] = [];
            if (res.topic !== undefined) {
                res.topic.forEach(obj => {
                    topics.push(BulletinConverter.Topic.toObject(obj));
                });
            }
            return topics;
        });
    }

    public getTopicVersions(start: Date, end?: Date, topicItems?: base.ItemVersionType[], categoryIds?: string[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});

        if (topicItems !== undefined) {
            topicItems.forEach(topicItem => {
                parameters.push({
                    topic_item: {
                        _attr: {
                            id: topicItem.id,
                            version: topicItem.version
                        }
                    }
                });
            });
        }

        if (categoryIds !== undefined) {
            categoryIds.forEach(categoryId => {
                parameters.push({category_id: categoryId});
            });
        }

        return this.client.post(this.path, 'BulletinGetTopicVersions', parameters).then((res: bulletin.TopicItemsResponse) => {
            const topicVersions: base.ItemVersionResultType[] = [];
            if (res.topic_item !== undefined) {
                res.topic_item.forEach(obj => {
                    topicVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return topicVersions;
        });
    }

    public getDraftTopicVersions(start: Date, end?: Date, topicItems?: base.ItemVersionType[]): Promise<base.ItemVersionResultType[]> {
        const parameters: Object[] = [];
        const attr: any = {
            start: datetime.toString(start)
        };
        if (end !== undefined) {
            attr.end = datetime.toString(end);
        }
        parameters.push({_attr: attr});

        if (topicItems !== undefined) {
            topicItems.forEach(topicItem => {
                parameters.push({
                    topic_item: {
                        _attr: {
                            id: topicItem.id,
                            version: topicItem.version
                        }
                    }
                });
            });
        }

        return this.client.post(this.path, 'BulletinGetDraftTopicVersions', parameters).then((res: bulletin.TopicItemsResponse) => {
            const topicVersions: base.ItemVersionResultType[] = [];
            if (res.topic_item !== undefined) {
                res.topic_item.forEach(obj => {
                    topicVersions.push(BaseConverter.ItemVersionResult.toObject(obj));
                });
            }
            return topicVersions;
        });
    }

    public getTopics(categoryIds: string[]): Promise<bulletin.TopicListType> {
        const parameters: Object[] = [];
        categoryIds.forEach(categoryId => {
            parameters.push({
                category_id: categoryId
            });
        });
        return this.client.post(this.path, 'BulletinGetTopics', parameters).then((res: bulletin.TopicListResponse) => {
            return BulletinConverter.TopicList.toObject(res);
        });
    }

    public getTopicByIds(topics: bulletin.TopicIdType[]): Promise<bulletin.TopicType[]> {
        const parameters: Object[] = [];
        topics.forEach(topic => {
            parameters.push({
                topics: {
                    _attr: {
                        topic_id: topic.topicId,
                        is_draft: topic.isDraft
                    }
                }
            });
        });
        return this.client.post(this.path, 'BulletinGetTopicByIds', parameters).then((res: bulletin.TopicsResponse) => {
            const topics: bulletin.TopicType[] = [];
            if (res.topic !== undefined) {
                res.topic.forEach(obj => {
                    topics.push(BulletinConverter.Topic.toObject(obj));
                });
            }
            return topics;
        });
    }

    public createTopics(topics: bulletin.CreateTopicType[]): Promise<bulletin.TopicType[]> {
        const parameters: Object[] = [];
        topics.forEach(topic => {
            const createTopic: any = [];
            const topicAttr: any = {
                id: 'dummy',
                version: 'dummy',
                subject: topic.subject,
                can_follow: topic.canFollow,
                category_id: topic.categoryId
            };
            const content: any = [];

            if (topic.creatorGroupId !== undefined) {
                topicAttr.creator_group_id = topic.creatorGroupId;
            }
            if (topic.manuallyEnterSender !== undefined) {
                topicAttr.manually_enter_sender = topic.manuallyEnterSender;
            }
            if (topic.startDatetime !== undefined) {
                topicAttr.start_datetime = datetime.toString(topic.startDatetime);
            }
            if (topic.endDatetime !== undefined) {
                topicAttr.end_datetime = datetime.toString(topic.endDatetime);
            }

            const contentAttr: any = {
                body: topic.body
            };
            if (topic.htmlBody !== undefined) {
                contentAttr.html_body = topic.htmlBody;
            }
            content.push({_attr: contentAttr});

            if (topic.files !== undefined) {
                content.file = [];
                createTopic.file = [];
                topic.files.forEach((file, i) => {
                    const fileId = i + 1;
                    content.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    createTopic.push({
                        file: [
                            {_attr: {id: fileId}},
                            {content: file.content.toString('base64')}
                        ]
                    });
                });
            }

            createTopic.push({
                topic: [
                    {_attr: topicAttr},
                    {content: content}
                ]
            });

            parameters.push({
                create_topic: createTopic
            });
        });
        return this.client.post(this.path, 'BulletinCreateTopics', parameters).then((res: bulletin.TopicsResponse) => {
            const topics: bulletin.TopicType[] = [];
            if (res.topic !== undefined) {
                res.topic.forEach(obj => {
                    topics.push(BulletinConverter.Topic.toObject(obj));
                });
            }
            return topics;
        });
    }

    public saveDraftTopics(topics: bulletin.CreateTopicType[]): Promise<bulletin.TopicType[]> {
        const parameters: Object[] = [];
        topics.forEach(topic => {
            const draftTopic: any = [];
            const topicAttr: any = {
                id: 'dummy',
                version: 'dummy',
                subject: topic.subject,
                can_follow: topic.canFollow,
                category_id: topic.categoryId
            };
            const content: any = [];

            if (topic.creatorGroupId !== undefined) {
                topicAttr.creator_group_id = topic.creatorGroupId;
            }
            if (topic.manuallyEnterSender !== undefined) {
                topicAttr.manually_enter_sender = topic.manuallyEnterSender;
            }
            if (topic.startDatetime !== undefined) {
                topicAttr.start_datetime = datetime.toString(topic.startDatetime);
            }
            if (topic.endDatetime !== undefined) {
                topicAttr.end_datetime = datetime.toString(topic.endDatetime);
            }

            const contentAttr: any = {
                body: topic.body
            };
            if (topic.htmlBody !== undefined) {
                contentAttr.html_body = topic.htmlBody;
            }
            content.push({_attr: contentAttr});

            if (topic.files !== undefined) {
                content.file = [];
                draftTopic.file = [];
                topic.files.forEach((file, i) => {
                    const fileId = i + 1;
                    content.push({
                        file: {
                            _attr: {
                                id: fileId,
                                name: file.name
                            }
                        }
                    });
                    draftTopic.push({
                        file: [
                            {_attr: {id: fileId}},
                            {content: file.content.toString('base64')}
                        ]
                    });
                });
            }

            draftTopic.push({
                topic: [
                    {_attr: topicAttr},
                    {content: content}
                ]
            });

            parameters.push({
                save_draft_topic: draftTopic
            });
        });
        return this.client.post(this.path, 'BulletinSaveDraftTopics', parameters).then((res: bulletin.TopicsResponse) => {
            const topics: bulletin.TopicType[] = [];
            if (res.topic !== undefined) {
                res.topic.forEach(obj => {
                    topics.push(BulletinConverter.Topic.toObject(obj));
                });
            }
            return topics;
        });
    }
}
