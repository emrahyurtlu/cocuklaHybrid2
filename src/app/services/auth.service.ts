import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from './user.service';
import {UserModel} from '../models/UserModel';
import {Router} from '@angular/router';
import {AppData} from '../app.data';
import {AlertHelper} from '../helpers/alert.helper';
import {Observable} from 'rxjs';
import {NavController, Platform} from '@ionic/angular';
import * as firebase from 'firebase';
import {GooglePlus} from '@ionic-native/google-plus/ngx';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<firebase.User>;

    // tslint:disable-next-line:max-line-length
    constructor(public afAuth: AngularFireAuth, public userService: UserService, public router: Router, public alertHelper: AlertHelper, public gplus: GooglePlus, public  platform: Platform, public navCtrl: NavController) {
        this.user = this.afAuth.authState;
    }

    async login(model: UserModel) {
        try {
            await this.alertHelper.loading();
            const tempUser = await this.afAuth.auth.signInWithEmailAndPassword(model.email, model.password);
            console.log('tempUser', tempUser);
            if (tempUser.user.uid !== null) {
                console.log('User is ok');
                const user = await this.userService.getUserByEmail(model.email);
                if (user.email !== '') {
                    AppData.user = user;
                    AppData.showMenu = true;
                    // this.router.navigate(['home/tab1']);
                    await this.alertHelper.dismissLoading();
                    this.navCtrl.navigateRoot('home');
                }
            }
        } catch (e) {
            await this.alertHelper.dismissLoading();
            console.error(e.code);
            switch (e.code) {
                case 'auth/user-not-found':
                    this.alertHelper.toastMessage('Dikkat', 'Kullanıcı bulunamadı.');
                    break;
                case 'auth/invalid-email':
                    this.alertHelper.toastMessage('Dikkat', 'Girdiğiniz eposta geçerli değil.');
                    break;
                case 'auth/wrong-password':
                    this.alertHelper.toastMessage('Dikkat', 'Girdiğiniz şifre yanlış. Şifreniz en az 6 karakterden oluşmalıdır.');
                    break;
                case 'auth/user-disabled':
                    this.alertHelper.toastMessage('Dikkat', 'Bu kullanıcı pasif yapılmış. Sisteme giriş yapamazsınız.');
                    break;
                default:
                    this.alertHelper.toastMessage('Dikkat', 'Lütfen kullanıcı adı ve şifre giriniz.');
                    break;
            }
        }
    }

    async logout() {
        try {
            await this.afAuth.auth.signOut();
            if (this.platform.is('cordova')) {
                this.gplus.logout();
            }
            await this.router.navigate(['login']);
        } catch (e) {
            console.error(e);
        }
    }

    async passwordReset(email: string) {
        await this.afAuth.auth.sendPasswordResetEmail(email);
    }

    async createUser(model: UserModel) {
        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(model.email, model.password);
            return result != null;
        } catch (e) {
            console.error(e);
        }
    }

    googleLogin() {
        if (this.platform.is('cordova')) {
            this.nativeGoogleLogin();
        } else {
            this.webGoogleLogin();
        }
    }

    public async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
        try {
            const gplusUser = await this.gplus.login({
                webClientId: '97541673682-blaqcb75q8sgnpoocjve9ucraeaod2km.apps.googleusercontent.com',
                offline: true,
                // scopes: 'email profile openid'
            });

            return await this.afAuth.auth.signInWithCredential(
                firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
            );
        } catch (e) {
            console.error(e);
        }
    }

    async webGoogleLogin(): Promise<void> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const credential = await this.afAuth.auth.signInWithPopup(provider);
            console.log(credential.user);
            if (credential.user.email !== null) {
                AppData.user = await this.userService.getUserByEmail(credential.user.email);
                console.log(AppData.user);
                this.router.navigate(['home']);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getMessagingToken() {

    }
}
