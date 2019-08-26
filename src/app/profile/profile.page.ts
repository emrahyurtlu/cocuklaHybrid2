import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {AppData} from '../app.data';
import {AlertHelper} from '../helpers/alert.helper';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {CityModel} from '../models/CityModel';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
    public userModel: UserModel = AppData.user;
    public changePassword = false;
    public cities = Array<CityModel>();
    public districts: any[];

    constructor(public alertHelper: AlertHelper, public authService: AuthService, public userService: UserService) {
        this.cities = AppData.cities;
        if (this.userModel.city !== null) {
            this.setDistricts(this.userModel.city);
        }
    }

    ngOnInit() {
        console.log('ACTIVE USER: ', AppData.user);
    }

    async update() {
        console.log('My profile is updated!');
        console.log(this.userModel);
        if (this.changePassword) {
            await this.authService.passwordReset(this.userModel.email);
        }

        await this.userService.update(this.userModel);
        AppData.user = this.userModel;
        await this.alertHelper.toastMessage('Profiliniz güncellendi');
    }

    async setDistricts(name: any) {
        console.log(name);
        for (const city of this.cities) {
            if (city.city_name === name) {
                this.districts = city.districts;
                break;
            }
        }
    }
}
