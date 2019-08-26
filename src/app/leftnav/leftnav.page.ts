import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AppData} from '../app.data';
import {Router} from '@angular/router';

@Component({
    selector: 'app-leftnav',
    templateUrl: './leftnav.page.html',
    styleUrls: ['./leftnav.page.scss'],
})
export class LeftnavPage implements OnInit {
    userCanApprove = AppData.user.isAuthorized;

    constructor(public modalController: ModalController, public router: Router) {}

    ngOnInit() {
    }

    async dismiss() {
        console.log('Modal is closing');
        await this.modalController.dismiss();
    }

    async gotoRoot(root: string) {
        await this.dismiss();
        await this.router.navigate([root]);
    }
}
