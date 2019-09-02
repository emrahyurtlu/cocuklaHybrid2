import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {LocationModel} from '../models/LocationModel';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private diagnostic: Diagnostic) {

    }

    async getCurrentPosition(): Promise<LocationModel> {
        try {
            const isLocationAvailable: boolean = await this.diagnostic.isLocationAvailable();
            if (isLocationAvailable) {
                let locationModel = new LocationModel();
                const result = await this.geolocation.getCurrentPosition();

                if (result !== null) {
                    locationModel.latitude = result.coords.latitude;
                    locationModel.longitude = result.coords.longitude;

                    locationModel = await this.getCityAndDistrict(locationModel);
                }

                console.log('getGeolocation() ', locationModel);

                return locationModel;
            } else {
                return null;
            }

        } catch (e) {
            console.log('Error getting location' + JSON.stringify(e));
        }
    }

    async getCityAndDistrict(model: LocationModel) {
        try {
            const isLocationAvailable: boolean = await this.diagnostic.isLocationAvailable();
            if (isLocationAvailable) {

                const options: NativeGeocoderOptions = {
                    useLocale: true,
                    maxResults: 1
                };

                const result: NativeGeocoderResult[] = await this.nativeGeocoder.reverseGeocode(model.latitude, model.longitude, options);
                const detail = result[0];
                if (detail) {
                    model.city = detail.administrativeArea;
                    model.district = detail.subAdministrativeArea;
                }

                return model;

            }
        } catch (e) {
            console.error(e);
        }
    }
}
