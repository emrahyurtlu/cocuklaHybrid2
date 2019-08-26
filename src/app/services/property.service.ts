import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {PropertyModel} from "../models/PropertyModel";

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    public collection: AngularFirestoreCollection;
    public collectionName = 'properties';

    constructor(public fireStore: AngularFirestore) {
        this.collection = fireStore.collection(this.collectionName);
    }

    async getBySlug(slug: string) {
        try {
            let result = await this.collection.ref.where('slug', '==', slug).limit(1).get();
            if (result) {
                return result.docs[0].data() as PropertyModel;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getList(): Promise<Array<PropertyModel>> {
        try {
            let properties: Array<PropertyModel> = new Array<PropertyModel>();
            let result = await this.collection.ref.orderBy('order').get();
            result.docs.map(doc => {
                let temp = doc.data() as PropertyModel;
                properties.push(temp);
            });

            return properties;

        } catch (e) {
            console.error(e);
        }
    }
}
