import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {Platform} from '@ionic/angular';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    constructor(public platform: Platform, public messaging: AngularFireMessaging, public userService: UserService) {
    }

    async getToken() {
        this.platform.ready().then(value => {
            console.log('Platform Ready: ', value);
            if (this.platform.is('ios')) {
                this.messaging.requestPermission.subscribe(data => {
                    console.log(data);
                });
            }
            this.messaging.getToken.subscribe(data => {
                if (data) {
                    this.userService.updateMessagingTokens(data);
                }
                console.log(`The token is ${data}`);
            });
        });
    }
}
