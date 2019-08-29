import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage, private platform: Platform) {

    }

    async get(key: string): Promise<any> {
        this.platform.ready().then(ready => {
            return this.storage.get(key);
        }).catch(reason => {
            console.error('Platform is not ready: ' + reason);
        });
    }

    async set(key: string, value: any) {
        this.platform.ready().then(ready => {
            this.storage.set(key, value);
        }).catch(reason => {
            console.error('Platform is not ready: ' + reason);
        });
    }
}
