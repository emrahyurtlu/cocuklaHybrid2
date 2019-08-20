import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(public storage: AngularFireStorage) {
    }

    async upload(image: string): Promise<string> {
        try {

            if (image != "") {
                const name = Date.now().toString();
                const path = 'places/' + name;
                this.storage.ref(path).putString(image, 'data_url');
                return path;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getDownloadUrl(name: string){
        let url = 'https://firebasestorage.googleapis.com/v0/b/cocukla-app.appspot.com/o/places%2F0ee14d30-b858-11e9-f19c-edf86aed5c0a.jpg?alt=media&token=022318bc-a23c-450e-914f-26e2e5fddc5f';
        return url;
    }
}
