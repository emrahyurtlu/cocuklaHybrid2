import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(public geolocation: Geolocation) {

    }

    getCurrentPosition() {
        // ^6.4.0 firebase version
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp.coords);
        }).catch((error) => {
            alert('Error getting location' + JSON.stringify(error));
        });
    }
}
