import {LoadingController, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertHelper {
    constructor(public loadingController: LoadingController, public toastController: ToastController) {

    }

    async toastMessage(title: string, msg: string) {
        const toast = await this.toastController.create({
            header: title,
            message: msg,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }

    async success() {
        const toast = await this.toastController.create({
            header: 'İşlem başarılı',
            message: 'İşlem başarıyla tamamlandı.',
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }

    async error() {
        const toast = await this.toastController.create({
            header: 'Dikkat',
            message: 'İşlem sırasında bir hata oluştu.',
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }

    async loading() {
        const loading = await this.loadingController.create({
            message: 'Lütfen bekleyiniz...',
            duration: 2000
        });
        await loading.present();
    }
}
