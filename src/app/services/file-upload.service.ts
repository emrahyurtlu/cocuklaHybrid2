import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(public storage: AngularFireStorage) {
    }

    async upload(folder: string = '', image: string): Promise<string> {
        try {

            if (image !== '') {
                const name = Date.now().toString();
                // const url = folder + '%2F' + name;
                const path = folder + '/' + name;
                const task = await this.storage.ref(path).putString(image, 'data_url');
                return await task.ref.getDownloadURL();
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
