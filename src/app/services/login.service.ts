import {Injectable} from '@angular/core';
import {FirebaseAuthentication} from '@ionic-native/firebase-authentication/ngx';
import {UserModel} from '../models/UserModel';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(public auth: FirebaseAuthentication) {
    }

    async loginWithUsernameAndPassword(model: UserModel): Promise<boolean> {
        await this.auth.signInWithEmailAndPassword(model.email, model.password).then((user) => {
            console.log('Firebase User', user);
        }).catch((err) => {
            console.log('Firebase Login Error', err.code);
        });
        return false;
    }
}
