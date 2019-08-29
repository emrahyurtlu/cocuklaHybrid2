import {Component, OnInit} from '@angular/core';
import {AppData} from '../../app.data';
import {UserService} from '../../services/user.service';
import {AlertHelper} from '../helpers/alert.helper';
import {PlaceModel} from '../../models/PlaceModel';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
    items: Array<PlaceModel> = new Array<PlaceModel>();

    constructor(public userService: UserService, public alertHelper: AlertHelper) {
    }

    ngOnInit() {
        this.userService.getUserFavorites().then(result => {
            this.items = result;
            console.log(this.items);
        });
    }

    async favorite(documentID: string) {
        try {
            console.log(documentID + ' wanna add fav');
            const result = await this.userService.favorite(documentID, AppData.user.email);
            const message = result ? 'Favorilerden kaldırıldı.' : 'Favorilere ekledi';
            await this.alertHelper.toastMessage(message);
            this.items = await this.userService.getUserFavorites();
            console.log(this.items);
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(event) {
        this.userService.getUserFavorites().then(result => this.items = result);
        event.target.complete();
    }
}
