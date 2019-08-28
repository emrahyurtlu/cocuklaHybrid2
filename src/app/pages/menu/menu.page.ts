import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppData} from '../../app.data';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [
        {title: 'Anasayfa', url: '/menu/home', icon: 'home'},
        {title: 'Profilim', url: '/menu/profile', icon: 'person'},
        {title: 'Mekanlarım', url: '/menu/places', icon: 'pin'},
    ];

    isAuthorized: boolean = AppData.user.isAuthorized;

    constructor(public router: Router) {
        console.log('menu: ', this.router.url);
        if (this.isAuthorized) {
           this.pages.push({title: 'Onay Bekleyenler', url: '/menu/pending-content', icon: 'checkmark-circle'});
        }
        try {
            if (AppData.user == null) {
                this.router.navigate(['/login']).then(r => console.log('Unauthorized access: routing to login page.'));
            }
            // this.messagingService.setToken().then(value => console.log('Token taken.'));
        } catch (e) {
            console.log(e);
        }
    }

    ngOnInit() {
    }

}
