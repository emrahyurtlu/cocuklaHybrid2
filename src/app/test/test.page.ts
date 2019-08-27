import {Component, OnInit} from '@angular/core';
import {AlertHelper} from '../helpers/alert.helper';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

    constructor(public alertHelper: AlertHelper, private menu: MenuController) {
        this.openFirst();
    }

    ngOnInit() {
    }

    async buttonClick() {
        await this.alertHelper.loading();
    }

    async openFirst() {
        await this.menu.enable(true, 'first');
        await this.menu.open('first');
    }
}
