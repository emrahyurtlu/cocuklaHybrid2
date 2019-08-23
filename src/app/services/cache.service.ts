import {Injectable} from '@angular/core';
import {CityService} from "./city.service";
import {PropertyService} from "./property.service";
import {AppData} from "../app.data";

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor(public cityService: CityService, public propertyService: PropertyService) {
    }

    async cacheCities() {
        try {
            await this.cityService.getList().then((result) => {
                AppData.cities = result;
            });
        } catch (e) {
            console.error(e);
        }
    }

    async cacheProperties() {
        try {
            await this.propertyService.getList().then((result) => {
                AppData.properties = result;
            });
        } catch (e) {
            console.error(e);
        }
    }
}
