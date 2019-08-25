export class UserModel {
    public name: string;
    public email: string;
    public password: string;
    public city: string;
    public district: string;
    public favorites = [];
    public messagingTokens = [];
    public isAuthorized: boolean;
    public loginType: number;
    public insert: number;
    public update: number;

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
            insert: this.insert,
            update: this.update,
        };
    }
}
