import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AppData} from '../app.data';

@Component({
    selector: 'app-leftnav',
    templateUrl: './leftnav.page.html',
    styleUrls: ['./leftnav.page.scss'],
})
export class LeftnavPage implements OnInit {
    userCanApprove = AppData.user.isAuthorized;

    constructor(public modalController: ModalController) {}

    ngOnInit() {
    }

    async dismiss() {
        console.log('Modal is closing');
        await this.modalController.dismiss();
    }
}
