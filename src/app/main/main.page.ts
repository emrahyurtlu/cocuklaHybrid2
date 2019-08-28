import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AppData} from '../app.data';
import {AlertHelper} from '../helpers/alert.helper';
import {PlaceService} from '../services/place.service';
import {PlaceModel} from '../models/PlaceModel';

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
    constructor(public userService: UserService, public alertHelper: AlertHelper, public placeService: PlaceService, private router: Router) {
            console.log(this.router.url);
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

    async refresh(event) {
        await this.getByCategory(this.category);
        event.target.complete();
    }
}
