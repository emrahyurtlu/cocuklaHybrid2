import {LocationModel} from './LocationModel';

export class UserModel {
    public uid = '';
    public displayName = '';
    public email = '';
    public password = '';
    public photoURL = '';
    public phoneNumber = '';
    public providerId = '';
    public city = '';
    public district = '';
    public favorites = [];
    public messagingTokens = [];
    public isAuthorized = false;
    public loginType: number;
    public insert = Date.now();
    public update = Date.now();
    public location: LocationModel | null;
}
