import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LeftnavPage} from '../leftnav/leftnav.page';


@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit(): void {
    }

    async showMenu() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage,
        });
        await modal.present();
    }
}
