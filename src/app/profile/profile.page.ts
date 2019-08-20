import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {AppData} from '../app.data';
import {AlertHelper} from '../helpers/alert.helper';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public myTitle: any = 'Profilim';
  public userModel: UserModel = AppData.user;
  public changePassword = false;

  constructor(public alertHelper: AlertHelper, public authService: AuthService, public userService: UserService) {
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
    await this.alertHelper.toastMessage('İşlem Başarılı', 'Profiliniz güncellendi');
  }
}
