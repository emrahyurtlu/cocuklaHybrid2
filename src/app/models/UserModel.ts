export class UserModel {
    public name: string;
    public email: string;
    public password: string;
    public city: string;
    public district: string;
    public favorites: Array<string> = [];
    public messagingTokens: Array<string> = [];
    public isAuthorized: boolean;
    public loginType: number;

    toObject(): object {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            city: this.city,
            district: this.district,
            favorites: this.favorites,
            messagingTokens: this.messagingTokens,
            isAuthorized: this.isAuthorized,
            loginType: this.loginType,
        };
    }
}