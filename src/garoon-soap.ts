import Setting from "./client/setting";
import Base from "./client/base";
import Admin from "./client/admin";
import Star from "./client/star";
import Message from "./client/message";
import Schedule from "./client/schedule";
import Bulletin from "./client/bulletin";
import Mail from "./client/mail";
import Notification from "./client/notification";
import Workflow from "./client/workflow";
import Address from "./client/address";
import Cabinet from "./client/cabinet";
import Report from "./client/report";
import Util from "./client/util";

export default class GaroonSoap {
    private readonly setting: Setting;
    public readonly base: Base;
    public readonly admin: Admin;
    public readonly star: Star;
    public readonly message: Message;
    public readonly schedule: Schedule;
    public readonly bulletin: Bulletin;
    public readonly mail: Mail;
    public readonly notification: Notification;
    public readonly workflow: Workflow;
    public readonly address: Address;
    public readonly cabinet: Cabinet;
    public readonly report: Report;
    public readonly util: Util;

    public constructor(baseUri: string, username?: string, password?: string, locale?: string, needCsp?: boolean) {
        this.setting = new Setting(baseUri, username, password, locale, needCsp);
        this.base = new Base(this.setting);
        this.admin = new Admin(this.setting);
        this.star = new Star(this.setting);
        this.message = new Message(this.setting);
        this.schedule = new Schedule(this.setting);
        this.bulletin = new Bulletin(this.setting);
        this.mail = new Mail(this.setting);
        this.notification = new Notification(this.setting);
        this.workflow = new Workflow(this.setting);
        this.address = new Address(this.setting);
        this.cabinet = new Cabinet(this.setting);
        this.report = new Report(this.setting);
        this.util = new Util(this.setting);
    }

    public setCookie(cookie?: string): void {
        this.setting.cookie = cookie;
    }
}
