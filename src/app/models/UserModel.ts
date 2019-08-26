export class UserModel {
    public uid = '';
    public displayName = '';
    public email = '';
    public password = '';
    public photoURL = '';
    public phoneNumber = '';
    public providerId = '';
    public latitude: number | null;
    public longitude: number | null;
    public city: string | null;
    public district: string | null;
    public favorites = [];
    public messagingTokens = [];
    public isAuthorized = false;
    public loginType: number;
    public insert;
    public update = Date.now();
    // public location: LocationModel | null;
}
