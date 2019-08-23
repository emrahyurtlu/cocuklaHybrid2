import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../models/PlaceModel';
import {Router} from '@angular/router';
import {PlaceService} from '../services/place.service';
import {UserService} from '../services/user.service';
import {AlertHelper} from '../helpers/alert.helper';
import {FileUploadService} from '../services/file-upload.service';
import {AppData} from '../app.data';

@Component({
    selector: 'app-pending-content',
    templateUrl: './pending-content.page.html',
    styleUrls: ['./pending-content.page.scss'],
})
export class PendingContentPage implements OnInit {
    public places: Array<PlaceModel> = new Array<PlaceModel>();

    // tslint:disable-next-line:max-line-length
    constructor(public router: Router, public  placeService: PlaceService, public userService: UserService, public alertHelper: AlertHelper, public fileService: FileUploadService) {
        console.log('ACTIVE USER: ', AppData.user);
    }

    ngOnInit() {
        this.getMyPlaces().then(r => {
        });
    }

    async gotoPlaceForm() {
        console.log('wanna go to placeform!');
        await this.router.navigate(['placeform', {documentID: '0'}]);
    }

    async favorite(documentID: string) {
        try {
            console.log(documentID + ' wanna add fav');
            const result = await this.userService.favorite(documentID, AppData.user.email);
            const message = result ? 'Favorilerden kaldırıldı.' : 'Favorilere ekledi';
            await this.alertHelper.toastMessage('İşlem başarılı', message);
        } catch (e) {
            console.log(e);
        }
    }

    async gotoDetail(documentID: string) {
        try {
            console.log(documentID + ' wanna go to detail');
            await this.router.navigate(['placeform', {documentID}]);
        } catch (e) {
            console.log(e);
        }
    }

    async getMyPlaces() {
        this.places = await this.placeService.pendingContent();
        console.log('Pending content: ', this.places[0].name);
    }
}
