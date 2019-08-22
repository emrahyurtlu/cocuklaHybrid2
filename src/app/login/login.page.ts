import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {LoginService} from '../services/login.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {CacheService} from '../services/cache.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AppData} from '../app.data';
import {LocationModel} from '../models/LocationModel';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [LoginService]
})
export class LoginPage implements OnInit {
    public userModel: UserModel = new UserModel();
    showSpinner = false;

    // tslint:disable-next-line:max-line-length
    constructor(public authService: AuthService, public router: Router, public cacheService: CacheService, public geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
        this.cacheService.cacheProperties();
        this.cacheService.cacheCities();
    }

    ngOnInit() {
        /*let locationModel = new LocationModel();
        locationModel.latitude = this.route.snapshot.paramMap.get('lat');
        locationModel.longitude = this.route.snapshot.paramMap.get('long');
        locationModel.city = this.route.snapshot.paramMap.get('city');
        locationModel.district = this.route.snapshot.paramMap.get('dist');*/
        // console.log(locationModel);
        // this.getGeolocation();

    }

    goToForgetPassword() {
        this.router.navigate(['forgetpassword']);
    }

    goToSubscribe(params) {
        this.router.navigate(['subscribe']);
    }

    login() {
        console.log(this.userModel);
        this.getGeolocation();
        this.authService.login(this.userModel);
    }

    loginWithGoogle() {
        this.getGeolocation();
        this.authService.googleLogin();
    }

    async getGeolocation() {
        try {
            const result = await this.geolocation.getCurrentPosition();
            AppData.location = new LocationModel(result.coords.latitude, result.coords.longitude, 'Ankara', 'Çankaya');
            await this.setCityAndDistrict(result.coords.latitude, result.coords.longitude);
            console.log(AppData.location);
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

            AppData.dd = JSON.stringify(detail);
            AppData.location.city = detail.administrativeArea;
            AppData.location.district = detail.subAdministrativeArea;
            console.log(JSON.stringify(result[0]));

        } catch (e) {
            console.error(e);
        }
    }
}
