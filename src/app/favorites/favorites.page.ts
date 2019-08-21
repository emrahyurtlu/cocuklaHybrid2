import {Component, OnInit} from '@angular/core';
import {AppData} from '../app.data';
import {UserService} from '../services/user.service';
import {AlertHelper} from '../helpers/alert.helper';
import {Router} from '@angular/router';
import {PlaceModel} from '../models/PlaceModel';
import {LeftnavPage} from '../leftnav/leftnav.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
    items: Array<PlaceModel>;
    public myTitle: any = 'Favorilerim Sayfası';

    constructor(public userService: UserService, public alertHelper: AlertHelper, public router: Router, public modalCtrl: ModalController) {
        this.userService.getUserFavorites().then(result => this.items = result);
        console.log(this.items);
    }

    ngOnInit() {
    }

    async favorite(documentID: string) {
        try {
            console.log(documentID + ' wanna add fav');
            const result = await this.userService.favorite(documentID, AppData.user.email);
            const message = result ? 'Favorilerden kaldırıldı.' : 'Favorilere ekledi';
            await this.alertHelper.toastMessage('İşlem başarılı', message);
            this.items = await this.userService.getUserFavorites();
            console.log(this.items);
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

    async showMenu() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage,
        });
        await modal.present();
    }
}
