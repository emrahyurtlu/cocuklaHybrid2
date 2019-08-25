import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AppData} from '../app.data';
import {AlertHelper} from '../helpers/alert.helper';
import {PlaceService} from '../services/place.service';
import {PlaceModel} from '../models/PlaceModel';
import {ModalController} from '@ionic/angular';
import {LeftnavPage} from '../leftnav/leftnav.page';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    public category = 'Mekanlar';
    public places: Array<PlaceModel>;
    isAuthorized = AppData.user !== null;

    // tslint:disable-next-line:max-line-length
    constructor(public router: Router, public userService: UserService, public alertHelper: AlertHelper, public placeService: PlaceService, public modalCtrl: ModalController) {

    }

    ngOnInit() {
        this.getByCategory(this.category).then();
    }

    async favorite(documentID: string) {
        try {
            console.log(documentID + ' wanna add fav');
            const result = await this.userService.favorite(documentID, AppData.user.email);
            const message = result ? 'Favorilerden kaldırıldı.' : 'Favorilere ekledi';
            await this.alertHelper.toastMessage(message);
        } catch (e) {
            console.log(e);
        }
    }

    async gotoDetail(documentID: string) {
        try {
            console.log(documentID + ' wanna go to detail');
            await this.router.navigate(['detail', {documentID}]);
        } catch (e) {
            console.log(e);
        }
    }

    async getByCategory(category: string) {
        try {
            this.category = category;
            this.places = await this.placeService.getByCategory(category);
        } catch (e) {
            console.log(e);
        }
    }

    getPropertyName(slug: string) {
        const properties = AppData.properties;
        let result;
        properties.forEach(value => {
            if (value.slug === slug) {
                result = value.content;
            }
        });

        return result;
    }

    async search($event: CustomEvent) {
        const keyword = $event.detail.value;
        console.log(keyword);
        this.places = await this.placeService.getByCategoryAndKeyword(this.category, keyword);
    }

    async cancel() {
        await this.getByCategory(this.category);
    }

    async showMenu() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage,
        });
        await modal.present();
    }

    async refresh(event) {
        await this.getByCategory(this.category);
        event.target.complete();
    }
}
