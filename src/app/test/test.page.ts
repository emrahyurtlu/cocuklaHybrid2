import {Component, OnInit} from '@angular/core';
import {Firebase} from '@ionic-native/firebase/ngx';
import {AlertHelper} from '../helpers/alert.helper';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

    constructor(public alertHelper: AlertHelper) {
    }

    ngOnInit() {
    }

    async buttonClick() {
        await this.alertHelper.loading();
    }
}
