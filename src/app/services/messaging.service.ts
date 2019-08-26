import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {UserService} from './user.service';
import {AngularFireMessaging} from '@angular/fire/messaging';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    constructor(public platform: Platform, public userService: UserService, public messaging: AngularFireMessaging) {
    }

    async setToken() {
        try {
            if (this.platform.is('ios')) {
                await this.messaging.requestPermission;
            }

            this.messaging.getToken
                .subscribe(token => {
                    this.userService.updateMessagingTokens(token);
                    console.log(`The token is ${token}`);
                });
        } catch (e) {
            console.log(e);
        }
    }
}
