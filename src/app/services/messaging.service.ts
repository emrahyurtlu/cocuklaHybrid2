import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {UserService} from './user.service';
import { Firebase } from '@ionic-native/firebase/ngx';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    constructor(public platform: Platform, public userService: UserService, private firebase: Firebase) {
    }

    async setToken() {
        try {
            if (this.platform.is('ios')) {
                await this.firebase.grantPermission();
            }

            this.firebase.getToken()
                .then(token => {
                    this.userService.updateMessagingTokens(token);
                    console.log(`The token is ${token}`);
                });

            this.firebase.onNotificationOpen()
                .subscribe(data => console.log(`User opened a notification ${data}`));

            this.firebase.onTokenRefresh()
                .subscribe((token: string) => console.log(`Got a new token ${token}`));
        } catch (e) {
            console.log(e);
        }
    }
}
