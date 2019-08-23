import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppData} from '../app.data';

@Component({
    selector: 'app-tabs',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    constructor(public router: Router) {
        try {
            if (AppData.user == null) {
                this.router.navigate(['login']).then(r => console.log('Unauthorized access: routing to login page.'));
            }
        } catch (e) {
            console.log(e);
        }
    }

    ionViewDidLoad() {
        try {
            if (AppData.user == null) {
                this.router.navigate(['login']).then(r => console.log('Unauthorized access: routing to login page.'));
            }
        } catch (e) {
            console.log(e);
        }
    }
}
