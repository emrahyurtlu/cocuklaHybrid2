import {UserModel} from './models/UserModel';
import {CityModel} from './models/CityModel';
import {PropertyModel} from './models/PropertyModel';
import {LocationModel} from './models/LocationModel';
import {Coordinates} from '@ionic-native/geolocation/ngx';

export class AppData {
    static user: UserModel;
    static cities: Array<CityModel>;
    static properties: Array<PropertyModel>;
    static location: LocationModel;
    static showMenu = false;

    static getLatLong() {
        let result = '';
        if (AppData.location.latitude !== null && AppData.location.longitude !== null) {
            result = `${AppData.location.latitude.toString()},${AppData.location.longitude.toString()}`;
        }
        return result;
    }
}
