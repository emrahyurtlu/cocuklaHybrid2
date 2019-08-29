import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';
import {AppData} from '../../app.data';
import {PlaceModel} from '../../models/PlaceModel';
import {PlaceService} from '../../services/place.service';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
    @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
    map: google.maps.Map;
    error = false;
    infoWindows: google.maps.InfoWindow[] = [];

    constructor(public placeService: PlaceService) {
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        if (AppData.location.latitude && AppData.location.longitude) {
            this.initMap();
        } else {
            this.error = true;
        }
    }

    async initMap() {
        const center = new google.maps.LatLng(AppData.location.latitude, AppData.location.longitude);

        const mapOptions: google.maps.MapOptions = {
            center,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            fullscreenControl: false,
            disableDefaultUI: true,
            clickableIcons: true
        };

        this.map = new google.maps.Map(this.mapNativeElement.nativeElement, mapOptions);

        const marker = new google.maps.Marker({
            map: this.map,
            position: center,
            draggable: false,
        });

        const places = await this.placeService.getByCity(AppData.location.city);

        this.createMarkers(places);

    }

    createMarkers(places: Array<PlaceModel>) {
        for (const place of places) {

            const position = new google.maps.LatLng(this.getLat(place), this.getLng(place));

            const content = '<ion-card>' +
                // tslint:disable-next-line:max-line-length
                '        <img src="' + place.images[0] + '" alt="' + place.name + '" routerLink="detail/' + place.documentID + '"/>' +
                '        <ion-card-header>' +
                '            <ion-card-title>' + place.name + '</ion-card-title>' +
                '            <ion-card-subtitle>' + place.category + '</ion-card-subtitle>' +
                '        </ion-card-header>' +
                '        <ion-item>' +
                '            <ion-button fill="outline" slot="end" (click)="gotoDetail(place.documentID)">\n' +
                '                <ion-icon icon="arrow-round-forward"></ion-icon>\n' +
                '            </ion-button>\n' +
                '        </ion-item>\n' +
                '    </ion-card>';

            const infowindow = new google.maps.InfoWindow({
                content,
                position,
            });

            this.infoWindows.push(infowindow);

            const icon = {
                url: 'assets/img/cocukla_logo.png', // image url
                scaledSize: new google.maps.Size(40, 48, 'px', 'px'), // scaled size
                infowindow
            };


            const marker = new google.maps.Marker({
                map: this.map,
                position,
                icon,
                draggable: false,
            });

            marker.addListener('click', () => {
                this.hideAllInfoWindows();
                infowindow.open(this.map, marker);
            });
        }
    }

    getLat(place: PlaceModel): number {
        const numbers = place.position.split(',');
        // console.log(numbers[0]);
        return Number(numbers[0]);
    }

    getLng(place: PlaceModel): number {
        const numbers = place.position.split(',');
        // console.log(numbers[1]);
        return Number(numbers[1]);
    }

    private hideAllInfoWindows() {
        for (const iw of this.infoWindows) {
            iw.close();
        }
    }
}
