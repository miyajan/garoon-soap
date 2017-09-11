export default class Setting {
    public readonly baseUrl: string;
    public readonly username?: string;
    public readonly password?: string;
    public readonly locale?: string;
    public readonly needCsp: boolean;
    public cookie?: string;

    constructor(baseUrl: string, username?: string, password?: string, locale?: string, needCsp?: boolean) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
        this.locale = locale;
        this.needCsp = needCsp === undefined ? false : needCsp;
    }
}
