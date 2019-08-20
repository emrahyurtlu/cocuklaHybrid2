import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {CityModel} from "../models/CityModel";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    public collection: AngularFirestoreCollection;
    public collectionName = 'cities';

    constructor(public fireStore: AngularFirestore) {
        this.collection = fireStore.collection(this.collectionName);
    }

    async getList(): Promise<Array<CityModel>> {
        try {
            let models: Array<CityModel> = new Array<CityModel>();
            const result = await this.collection.ref.orderBy('plate').get();
            console.log('cities', result);
            result.docs.forEach(doc => {
                let place: CityModel = doc.data() as CityModel;
                models.push(place);
            });
            return models;
        } catch (e) {
            console.error(e);
        }
    }

    async getDistricts(city: string) {
        try {
            console.log(name);
            const cities = await this.getList();
            let result = [];
            for (let city of cities) {
                if (city.city_name == name) {
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
