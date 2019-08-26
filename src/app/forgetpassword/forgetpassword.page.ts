import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {AuthService} from '../services/auth.service';
import {AlertHelper} from '../helpers/alert.helper';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  userModel: UserModel = new UserModel();

  constructor(public auth: AuthService, public alertHelper: AlertHelper) {
  }

  ngOnInit() {
  }

  async sendPasswordResetLink() {
    if (this.userModel.email !== '') {
      await this.auth.passwordReset(this.userModel.email);
      await this.alertHelper.toastMessage('Belirttiğiniz eposta adresine şifre sıfırlama linki gönderildi.');
    }
  }
}
