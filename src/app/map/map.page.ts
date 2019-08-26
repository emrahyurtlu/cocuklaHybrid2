import {Component, OnInit} from '@angular/core';
import {LeftnavPage} from '../leftnav/leftnav.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    /*@ViewChild('map', {static: false}) mapElement;
    map: any;*/

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {
        // this.initMap();
    }

    /*initMap() {
        const coords = new google.maps.LatLng(AppData.location.latitude, AppData.location.longitude);

        const mapOptions: google.maps.MapOptions = {
            center: coords,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        const marker = new google.maps.Marker({
            map: this.map,
            position: coords
        });

    }*/

    async showMenu() {
        console.log('Modal started');
        const modal = await this.modalCtrl.create({
            component: LeftnavPage,
        });
        await modal.present();
    }
}
