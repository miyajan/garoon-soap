import Setting from "./client/setting";
import Base from "./client/base";
import Admin from "./client/admin";
import Star from "./client/star";
import Message from "./client/message";
import Schedule from "./client/schedule";
import Bulletin from "./client/bulletin";
import Mail from "./client/mail";

export default class GaroonSoap {
    public readonly base: Base;
    public readonly admin: Admin;
    public readonly star: Star;
    public readonly message: Message;
    public readonly schedule: Schedule;
    public readonly bulletin: Bulletin;
    public readonly mail: Mail;

    public constructor(baseUri: string, username: string, password: string, locale: string, needCsp: boolean) {
        const setting = new Setting(baseUri, username, password, locale, needCsp);
        this.base = new Base(setting);
        this.admin = new Admin(setting);
        this.star = new Star(setting);
        this.message = new Message(setting);
        this.schedule = new Schedule(setting);
        this.bulletin = new Bulletin(setting);
        this.mail = new Mail(setting);
    }
}
