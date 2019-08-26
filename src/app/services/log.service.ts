import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    public collection: AngularFirestoreCollection;
    public collectionName = 'logs';

    constructor(public fireStore: AngularFirestore) {
        this.collection = fireStore.collection(this.collectionName);
    }

    async log(data: any) {
        await this.collection.ref.add({content: data});
    }
}
