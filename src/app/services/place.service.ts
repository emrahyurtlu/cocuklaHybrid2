import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {PlaceModel} from '../models/PlaceModel';
import {CommentModel} from '../models/CommentModel';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    public collection: AngularFirestoreCollection;
    public collectionName = 'places';

    constructor(public fireStore: AngularFirestore) {
        this.collection = fireStore.collection(this.collectionName);
    }

    async get(documentID: string) {
        try {
            const result = await this.collection.doc(documentID).ref.get();
            let place: PlaceModel = result.data() as PlaceModel;
            place = result.data() as PlaceModel;
            place.documentID = result.id;
            return place;
        } catch (e) {
            console.error(e);
        }
    }

    async getByCategory(category: string) {
        try {
            const places: Array<PlaceModel> = new Array<PlaceModel>();
            const result = await this.collection.ref.where('category', '==', category).where('isApproved', '==', true).where('isDeleted', '==', false).get();
            result.docs.forEach(doc => {
                const place: PlaceModel = doc.data() as PlaceModel;
                place.documentID = doc.id;
                places.push(place);
            });
            return places;
        } catch (e) {
            console.error(e);
        }
    }

    async getByCity(city: string) {
        try {
            let places: Array<PlaceModel> = new Array<PlaceModel>();
            // tslint:disable-next-line:max-line-length
            const result = await this.collection.ref.where('city', '==', city).where('isApproved', '==', true).where('isDeleted', '==', false).get();
            result.docs.forEach(doc => {
                const place: PlaceModel = doc.data() as PlaceModel;
                place.documentID = doc.id;
                places.push(place);
            });
            return places;
        } catch (e) {
            console.error(e);
        }
    }

    async getMyPlaces(email: string) {
        try {
            const places: Array<PlaceModel> = new Array<PlaceModel>();
            const result = await this.collection.ref.where('owner', '==', email).get();
            if (result.docs.length > 0) {
                result.docs.forEach(doc => {
                    const place: PlaceModel = doc.data() as PlaceModel;
                    place.documentID = doc.id;
                    places.push(place);
                });
            }
            return places;
        } catch (e) {
            console.error(e);
        }
    }

    async getList() {
        try {
            const places: Array<PlaceModel> = new Array<PlaceModel>();
            const result = await this.collection.ref.get();
            result.docs.forEach(doc => {
                const place: PlaceModel = doc.data() as PlaceModel;
                place.documentID = doc.id;
                places.push(place);
            });
            return places;
        } catch (e) {
            console.error(e);
        }
    }

    async insert(model: PlaceModel): Promise<boolean> {
        try {
            await this.collection.add(model.toObject());
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async update(documentID: string, model: PlaceModel): Promise<boolean> {
        try {
            await this.collection.doc(documentID).update(model);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async delete(documentID: string) {
        try {
            this.collection.doc(documentID).update({isDeleted: true});
        } catch (e) {
            console.error(e);
        }
    }

    async activate(documentID: string) {
        try {
            this.collection.doc(documentID).update({isActive: true});
        } catch (e) {
            console.error(e);
        }
    }

    async deActivate(documentID: string) {
        try {
            this.collection.doc(documentID).update({isActive: false});
        } catch (e) {
            console.error(e);
        }
    }

    async approve(documentID: string) {
        try {
            this.collection.doc(documentID).update({isApproved: true});
        } catch (e) {
            console.error(e);
        }
    }

    async unApprove(documentID: string) {
        try {
            this.collection.doc(documentID).update({isApproved: false});
        } catch (e) {
            console.error(e);
        }
    }

    async addComment(model: CommentModel, documentID: string) {
        try {
            console.log(documentID);
            const document = await this.get(documentID);
            document.comments.push(model.toObject());
            console.log(document.comments);
            await this.update(documentID, document);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getByCategoryAndKeyword(category: string, keyword: string) {
        try {
            const places = await this.getByCategory(category);
            const tempArr: Array<PlaceModel> = new Array<PlaceModel>();
            if (places.length > 0) {
                for (const p of places) {
                    if (p.name.toLowerCase().search(keyword.toLowerCase()) > -1) {
                        tempArr.push(p);
                    }
                }
            }
            return tempArr;
        } catch (e) {
            console.error(e);
        }
    }
}
