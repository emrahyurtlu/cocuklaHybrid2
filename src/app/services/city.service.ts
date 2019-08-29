import {Injectable} from '@angular/core';
import {CityModel} from '../models/CityModel';
import {cities} from '../../assets/statics/cities';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor() {
    }

    async getList(): Promise<Array<CityModel>> {
        try {
            const models: Array<CityModel> = new Array<CityModel>();
            for (const city of cities) {
                models.push(city);
            }
            /*const result = await this.collection.ref.orderBy('plate').get();
            console.log('cities', result);
            result.docs.forEach(doc => {
                const place: CityModel = doc.data() as CityModel;
                models.push(place);
            }); */
            console.log('cities', models);
            return models;
        } catch (e) {
            console.error(e);
        }
    }

    async getDistricts(city: string) {
        try {
            console.log(name);
            let result = [];
            // tslint:disable-next-line:no-shadowed-variable
            for (const city of cities) {
                if (city.name === name) {
                    result = city.districts;
                    break;
                }
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
