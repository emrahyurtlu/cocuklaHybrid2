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
            // tslint:disable-next-line:max-line-length
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
            const places: Array<PlaceModel> = new Array<PlaceModel>();
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
            console.log('Places owner is: ', email);
            const places: Array<PlaceModel> = new Array<PlaceModel>();
            const result = await this.collection.ref.where('owner', '==', email).get();

            if (result.docs.length > 0) {
                result.docs.forEach(doc => {
                    const place: PlaceModel = new PlaceModel();
                    place.documentID = doc.id;
                    place.name = doc.data().name;
                    place.digest = doc.data().digest;
                    place.category = doc.data().category;

                    place.properties = doc.data().properties;
                    place.images = doc.data().images;
                    place.comments = doc.data().comments;

                    place.owner = doc.data().owner;
                    place.phone = doc.data().phone;
                    place.email = doc.data().email;
                    place.address = doc.data().address;
                    place.city = doc.data().city;
                    place.district = doc.data().district;
                    place.position = doc.data().position;
                    place.rating = doc.data().rating;
                    place.isFav = doc.data().isFav;
                    place.isApproved = doc.data().isApproved;
                    place.isActive = doc.data().isActive;
                    place.isDeleted = doc.data().isDeleted;
                    place.insertDate = doc.data().insertDate;
                    place.updateDate = doc.data().updateDate;
                    console.log('User Place Obj: ', place);
                    places.push(place);
                });
            }

            return places;
        } catch (e) {
            console.error(e);
        }
    }

    async pendingContent() {
        try {
            const places: Array<PlaceModel> = new Array<PlaceModel>();
            const result = await this.collection.ref.where('isApproved', '==', false).get();
            // const result = await this.fireStore.collection<PlaceModel>(this.collectionName).ref.where('owner', '==', email).get();

            if (result.docs.length > 0) {
                result.docs.forEach(doc => {
                    const place: PlaceModel = new PlaceModel();
                    place.documentID = doc.id;
                    place.name = doc.data().name;
                    place.digest = doc.data().digest;
                    place.category = doc.data().category;

                    place.properties = doc.data().properties;
                    place.images = doc.data().images;
                    place.comments = doc.data().comments;

                    place.owner = doc.data().owner;
                    place.phone = doc.data().phone;
                    place.email = doc.data().email;
                    place.address = doc.data().address;
                    place.city = doc.data().city;
                    place.district = doc.data().district;
                    place.position = doc.data().position;
                    place.rating = doc.data().rating;
                    place.isFav = doc.data().isFav;
                    place.isApproved = doc.data().isApproved;
                    place.isActive = doc.data().isActive;
                    place.isDeleted = doc.data().isDeleted;
                    place.insertDate = doc.data().insertDate;
                    place.updateDate = doc.data().updateDate;
                    console.log('User Place Obj: ', place);
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

    async updateOnlyImages(model: PlaceModel) {
        this.collection.doc(model.documentID).update({images: model.images});
    }
}
