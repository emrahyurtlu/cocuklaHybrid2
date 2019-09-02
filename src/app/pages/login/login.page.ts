import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/UserModel';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CacheService} from '../../services/cache.service';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {AlertHelper} from '../helpers/alert.helper';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    // providers: [LoginService]
})
export class LoginPage implements OnInit {
    public userModel: UserModel = new UserModel();

    // tslint:disable-next-line:max-line-length
    constructor(public authService: AuthService, public router: Router, public cacheService: CacheService, private diagnostic: Diagnostic, private alertHelper: AlertHelper) {

        this.diagnostic.isLocationAvailable().then((result: boolean) => {
            console.log('Location service is available: ', result);
            if (result === false) {
                this.alertHelper.toastMessage('Konum servisiniz kapalı. Uygulamayı etkin kullanabilmeniz için konum servisiniz açınız.');
            }
        });

        this.cacheService.cacheCities().then(r => {
        });
        this.cacheService.cacheProperties().then(r => {
        });
    }

    ngOnInit() {
    }

    async goToForgetPassword() {
        await this.router.navigate(['forgetpassword']);
    }

    async goToSubscribe(params) {
        await this.router.navigate(['subscribe']);
    }

    async login() {
        console.log(this.userModel);
        await this.authService.loginWithEmailAndPassword(this.userModel);
    }

    async loginWithGoogle() {
        await this.authService.loginWithGoogle();
    }

    async loginWithFacebook() {
        await this.authService.loginWithFacebook();
    }
}
