import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserModel} from '../models/UserModel';
import {AngularFireAuth} from '@angular/fire/auth';
import {AppData} from "../app.data";
import {PlaceModel} from "../models/PlaceModel";
import {PlaceService} from "./place.service";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    public userCollection: AngularFirestoreCollection;
    public collection = 'users';

    constructor(public fireStore: AngularFirestore, public auth: AngularFireAuth, public placeService: PlaceService) {
        this.userCollection = fireStore.collection(this.collection);
    }

    async insert(model: UserModel): Promise<any> {
        try {
            const result = await this.userCollection.doc(model.email).set(model.toObject());
            console.log('ServiceFile', result);
            return false;
        } catch (e) {
            console.error(e);
        }
    }

    async isAuthUserExist(model: UserModel): Promise<boolean> {
        try {
            const user = await this.getUserByEmail(model.email);
            return user != null;
        } catch (e) {
            console.error(e);
        }
    }

    async getUserByEmail(email: string) {
        try {
            let user: UserModel;
            const result = await this.fireStore.collection<UserModel>(this.collection).doc<UserModel>(email).ref.get().then((doc) => {
                user = doc.data() as UserModel;
            });

            if (user != null) {
                return user;
            }

        } catch (e) {
            console.error('user.service.ts/getUserByEmail(email:string)', e);
        }
    }

    async update(model: UserModel) {
        try {
            await this.userCollection.doc(model.email).update({
                name: model.name,
                city: model.city,
                district: model.district,
                update: Date.now()
            });
        } catch (e) {
            console.error(e);
        }
    }

    async updateFavorites(email: string, arr: Array<string>) {
        try {
            await this.userCollection.doc(email).update({
                favorites: arr,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async favorite(documentID: string, email: string) {
        try {
            const isFav = AppData.user.favorites.includes(documentID);
            if (isFav) {
                // Remove it
                let tempArr = [];
                AppData.user.favorites.map(value => {
                    if (value !== documentID) {
                        tempArr.push(value);
                    }
                });
                AppData.user.favorites = tempArr;
            } else {
                // Add it
                AppData.user.favorites.push(documentID);
            }

            this.updateFavorites(email, AppData.user.favorites);
            return isFav;
        } catch (e) {
            console.error(e);
        }
    }

    async getUserFavorites() {
        try {
            let places: Array<PlaceModel> = new Array<PlaceModel>();
            for (let documentID of AppData.user.favorites) {
                let result = await this.placeService.get(documentID);
                if (result) {
                    places.push(result);
                }
            }

            return places;

        } catch (e) {
            console.error(e);
        }
    }
}
