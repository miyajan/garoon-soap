import Setting from "./client/setting";
import Base from "./client/base";

export default class GaroonSoap {
    public readonly base: Base;

    public constructor(baseUri: string, username: string, password: string, locale: string, needCsp: boolean) {
        const setting = new Setting(baseUri, username, password, locale, needCsp);
        this.base = new Base(setting);
    }
}
