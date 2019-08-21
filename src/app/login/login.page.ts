import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {LoginService} from '../services/login.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {CacheService} from '../services/cache.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AppData} from '../app.data';
import {LocationModel} from '../models/LocationModel';
import {AlertHelper} from '../helpers/alert.helper';

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
    constructor(public authService: AuthService, public router: Router, public cacheService: CacheService, public geolocation: Geolocation) {
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
        this.showSpinner = true;
        this.getGeolocation();
        this.authService.googleLogin();
        this.showSpinner = false;
    }

    async getGeolocation() {
        try {
            const result = await this.geolocation.getCurrentPosition();
            let locationModel = new LocationModel();
            locationModel.latitude = result.coords.latitude.toString();
            locationModel.longitude = result.coords.longitude.toString();
            locationModel.city = '';
            locationModel.district = '';
            AppData.location = locationModel;
            console.log(AppData.location);
        } catch (e) {
            console.log('Error getting location' + JSON.stringify(e));
        }
    }
}
