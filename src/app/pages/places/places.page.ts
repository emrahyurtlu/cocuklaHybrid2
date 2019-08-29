import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/PlaceModel';
import {Router} from '@angular/router';
import {PlaceService} from '../../services/place.service';
import {UserService} from '../../services/user.service';
import {AppData} from '../../app.data';

@Component({
    selector: 'app-places',
    templateUrl: './places.page.html',
    styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
    public places: Array<PlaceModel> = new Array<PlaceModel>();
    userCanApprove = AppData.user.isAuthorized;

    // tslint:disable-next-line:max-line-length
    constructor(public router: Router, public  placeService: PlaceService, public userService: UserService) {
        console.log('ACTIVE USER: ', AppData.user);
    }

    ngOnInit() {
        this.getMyPlaces().then(r => {
        });
    }

    async getMyPlaces() {
        this.places = await this.placeService.getMyPlaces(AppData.user.email);
        console.log('User places: ', this.places);
    }

    async refresh(event) {
        this.places = await this.placeService.getMyPlaces(AppData.user.email);
        console.log('User places: ', this.places);
        event.target.complete();
    }
}
