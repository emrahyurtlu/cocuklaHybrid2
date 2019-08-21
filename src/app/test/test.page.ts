import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LeftnavPage} from '../leftnav/leftnav.page';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    async openModal() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage
        });
        await modal.present();
    }
}
