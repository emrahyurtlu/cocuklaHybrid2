import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {LocationModel} from '../models/LocationModel';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(public geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {

    }

    async getCurrentPosition() {
        try {
            const locationModel = new LocationModel();
            const result = await this.geolocation.getCurrentPosition();

            if (result !== null) {
                locationModel.latitude = result.coords.latitude;
                locationModel.longitude = result.coords.longitude;
                const temp = await this.getCityAndDistrict(result.coords.latitude, result.coords.longitude);
                locationModel.city = temp.city;
                locationModel.district = temp.district;
            }

            console.log('getGeolocation() ', locationModel);

            return locationModel;

        } catch (e) {
            console.log('Error getting location' + JSON.stringify(e));
        }
    }

    async getCityAndDistrict(latitude: number, longitude: number) {
        try {
            const locationModel = new LocationModel();
            const options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 1
            };

            const result: NativeGeocoderResult[] = await this.nativeGeocoder.reverseGeocode(latitude, longitude, options);
            const detail = result[0];
            if (detail) {
                locationModel.city = detail.administrativeArea;
                locationModel.district = detail.subAdministrativeArea;
            }


            console.log('getCityAndDistrict(latitude: number, longitude: number) ', locationModel);

            return locationModel;

        } catch (e) {
            console.error(e);
        }
    }
}
