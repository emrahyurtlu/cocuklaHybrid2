import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';
import {AppData} from '../../app.data';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, AfterContentInit {
    @ViewChild('mapElement', {static: true}) mapNativeElement: ElementRef;
    map: google.maps.Map;

    constructor() {
    }

    ngOnInit() {
        this.initMap();
    }


    initMap() {
        const coords = new google.maps.LatLng(AppData.location.latitude, AppData.location.longitude);

        const mapOptions: google.maps.MapOptions = {
            center: coords,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.map = new google.maps.Map(this.mapNativeElement.nativeElement, mapOptions);

        const icon = {
            url: 'assets/img/cocukla_logo.png', // image url
            scaledSize: new google.maps.Size(50, 50), // scaled size
        };

        const marker = new google.maps.Marker({
            map: this.map,
            position: coords,
            label: 'Buradasınız',
            icon
        });

    }

    ngAfterContentInit(): void {
        this.initMap();
    }

}
