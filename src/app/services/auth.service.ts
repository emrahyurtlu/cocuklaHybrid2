import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from './user.service';
import {UserModel} from '../models/UserModel';
import {Router} from '@angular/router';
import {AppData} from '../app.data';
import {AlertHelper} from '../pages/helpers/alert.helper';
import {Observable} from 'rxjs';
import {NavController, Platform} from '@ionic/angular';
import * as firebase from 'firebase';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {LogService} from './log.service';
import {Facebook} from '@ionic-native/facebook/ngx';
import {LoginType} from '../pages/helpers/enums';
import {LocationService} from './location.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<firebase.User>;

    // tslint:disable-next-line:max-line-length
    constructor(public afAuth: AngularFireAuth, public userService: UserService, public router: Router, public alertHelper: AlertHelper, public gplus: GooglePlus, public  platform: Platform, public navCtrl: NavController, public logService: LogService, private facebook: Facebook, public locationService: LocationService) {
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
                console.log('User Doc: ', user.email);
                if (user.email !== '') {
                    AppData.user = user;
                    await this.alertHelper.dismissLoading();
                    // await this.navCtrl.navigateRoot('home');
                    await this.navCtrl.navigateRoot('/menu');
                }
            }
        } catch (e) {
            await this.alertHelper.dismissLoading();
            console.error(e.code);
            switch (e.code) {
                case 'auth/user-not-found':
                    await this.alertHelper.toastMessage('Kullanıcı bulunamadı.');
                    break;
                case 'auth/invalid-email':
                    await this.alertHelper.toastMessage('Girdiğiniz eposta geçerli değil.');
                    break;
                case 'auth/wrong-password':
                    await this.alertHelper.toastMessage('Girdiğiniz şifre yanlış. Şifreniz en az 6 karakterden oluşmalıdır.');
                    break;
                case 'auth/user-disabled':
                    await this.alertHelper.toastMessage('Bu kullanıcı pasif yapılmış. Sisteme giriş yapamazsınız.');
                    break;
                default:
                    await this.alertHelper.toastMessage('Lütfen kullanıcı adı ve şifre giriniz.');
                    break;
            }
        }
    }

    async logout() {
        try {
            console.log('wanna logout first!');
            await this.afAuth.auth.signOut();
            if (this.platform.is('cordova')) {
                await this.gplus.logout();
                await this.facebook.logout();
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
            await this.alertHelper.loading();
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(model.email, model.password);
            await this.alertHelper.dismissLoading();
            return result.user != null;
        } catch (e) {
            console.error(e);
        }
    }

    async facebookLogin() {
        try {
            const response = await this.facebook.login(['public_profile', 'email']);
            const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);
            const result = await firebase.auth().signInWithCredential(facebookCredential);

            const providerData = result.user.providerData[0];


            let user = new UserModel();
            user.uid = providerData.uid;


            if (user.uid !== null) {
                const location = await this.locationService.getCurrentPosition();

                user.displayName = providerData.displayName;
                user.email = providerData.email;
                user.photoURL = providerData.photoURL;
                user.phoneNumber = providerData.phoneNumber;
                user.city = location.city;
                user.district = location.district;
                user.latitude = location.latitude;
                user.longitude = location.longitude;
                user.loginType = LoginType.Facebook;

                console.log('Local Facebook  User: ' + JSON.stringify(user));

                const userExist: boolean = await this.userService.isAuthUserExist(user);

                if (!userExist) {
                    await this.userService.insert(user);
                } else {
                    user = await this.userService.getUserByEmail(providerData.email);
                }

                AppData.user = user;

                // await this.router.navigate(['home']);
                await this.navCtrl.navigateRoot('/menu');
            }


            // await this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);

        } catch (e) {
            console.log('facebookLogin()', e);
        }
    }

    async googleLogin() {
        if (this.platform.is('cordova')) {
            // alert('native');
            await this.nativeGoogleLogin();
        } else {
            // alert('web');
            await this.webGoogleLogin();
        }
    }

    async nativeGoogleLogin(): Promise<void> {
        try {
            /*const googleLogin = await this.gplus.login({
                webClientId: '97541673682-okch99tvbsd4uni9gjmh0ge1rgva2it5.apps.googleusercontent.com',
                offline: true,
                scopes: 'profile email'
            });*/

            const googleLogin = await this.gplus.login({});

            console.log('googleLogin', googleLogin);

            const credential = firebase.auth.GoogleAuthProvider.credential(googleLogin.idToken);


            // tslint:disable-next-line:max-line-length
            this.afAuth.auth.signInWithCredential(credential).then(value => console.log(JSON.stringify(value))).catch(reason => console.log(reason));

            // const providerData = userCredential.user.providerData[0];

            // const googleUser = providerData as UserModel;

            console.log('Observable  User: ' + JSON.stringify(this.user));
            this.user.subscribe(value => console.log('Observable ', JSON.stringify(value)));
            // console.log('Local Google  User: ' + JSON.stringify(providerData));

            // await this.router.navigate(['home']);
        } catch (e) {
            console.error(JSON.stringify(e));
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
                await this.router.navigate(['home']);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
