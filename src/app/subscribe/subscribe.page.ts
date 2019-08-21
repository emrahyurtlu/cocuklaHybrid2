import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertHelper} from '../helpers/alert.helper';
import {AuthService} from '../services/auth.service';
import {CityModel} from '../models/CityModel';
import {AppData} from '../app.data';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
  public myTitle: any = 'Üye Ol';
  public userModel: UserModel = new UserModel();
  public newUser: FormGroup;
  public cities = Array<CityModel>();
  public districts: any[];

  // tslint:disable-next-line:max-line-length
  constructor(public userService: UserService, public formBuilder: FormBuilder, public alertHelper: AlertHelper, public authService: AuthService) {
    this.newUser = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      city: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])]
    });

    this.cities = AppData.cities;
  }

  ngOnInit() {
  }

  async subscribe() {
    console.log(this.userModel);
    // Check if email exist
    const emailExist = await this.userService.isAuthUserExist(this.userModel);
    // Alert this is email is in used
    if (emailExist) {
      await this.alertHelper.toastMessage('Dikkat', 'Girdiğiniz eposta kullanımdadır. Lütfen başka bir eposta deneyin.');
    } else {
      // Insert in auth users
      await this.authService.createUser(this.userModel);

      // Insert in auth database
      await this.userService.insert(this.userModel);

      // Alert the final
      await this.alertHelper.toastMessage('İşlem Başarılı', 'Üyelik işlemleri başarıyla gerçekleşti.');
    }

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