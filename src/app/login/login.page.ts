import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
//import {LoginService} from '../services/login.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {CacheService} from '../services/cache.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AppData} from '../app.data';
import {LocationModel} from '../models/LocationModel';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    // providers: [LoginService]
})
export class LoginPage implements OnInit {
    public userModel: UserModel = new UserModel();
    showSpinner = false;

    // tslint:disable-next-line:max-line-length
    constructor(public authService: AuthService, public router: Router, public cacheService: CacheService, public geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
        this.cacheService.cacheProperties().then(r => {
        });
        this.cacheService.cacheCities().then(r => {
        });
    }

    ngOnInit() {
        this.authService.logout().then(value => {
        });
    }

    async goToForgetPassword() {
        await this.router.navigate(['forgetpassword']);
    }

    async goToSubscribe(params) {
        await this.router.navigate(['subscribe']);
    }

    async login() {
        console.log(this.userModel);
        this.getGeolocation();
        await this.authService.login(this.userModel);
    }

    async loginWithGoogle() {
        await this.getGeolocation();
        await this.authService.googleLogin();
    }

    async loginWithFacebook() {
        await this.getGeolocation();
        await this.authService.facebookLogin();
    }

    async getGeolocation() {
        try {
            const result = await this.geolocation.getCurrentPosition();
            AppData.location = new LocationModel(result.coords.latitude, result.coords.longitude, 'Ankara', 'Çankaya');
            console.log('getGeolocation() ', AppData.location);
            await this.setCityAndDistrict(result.coords.latitude, result.coords.longitude);
        } catch (e) {
            console.log('Error getting location' + JSON.stringify(e));
        }
    }

    async setCityAndDistrict(latitude: number, longitude: number) {
        try {

            const options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 1
            };

            const result: NativeGeocoderResult[] = await this.nativeGeocoder.reverseGeocode(latitude, longitude, options);
            const detail = result[0];

            AppData.location.city = detail.administrativeArea;
            AppData.location.district = detail.subAdministrativeArea;

            console.log('setCityAndDistrict() ', JSON.stringify(result[0]));

        } catch (e) {
            console.error(e);
        }
    }
}
