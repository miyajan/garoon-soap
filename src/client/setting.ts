export default class Setting {
    public baseUrl: string;
    public username?: string;
    public password?: string;
    public locale?: string;
    public needCsp: boolean;

    constructor(baseUrl: string, username?: string, password?: string, locale?: string, needCsp?: boolean) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
        this.locale = locale;
        this.needCsp = needCsp === undefined ? false : needCsp;
    }
}
