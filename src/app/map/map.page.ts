import {Component, OnInit} from '@angular/core';
import {LeftnavPage} from '../leftnav/leftnav.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    async showMenu() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage,
        });
        await modal.present();
    }
}
