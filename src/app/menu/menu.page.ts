import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

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
        {title: 'Onay Bekleyenler', url: '/menu/pending-content', icon: 'checkmark-circle'},
    ];

    selectedPath = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });
    }

    ngOnInit() {
    }

}
