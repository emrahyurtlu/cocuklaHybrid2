import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/PlaceModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../../services/place.service';
import {AlertHelper} from '../helpers/alert.helper';
import {CityModel} from '../../models/CityModel';
import {ActivatedRoute} from '@angular/router';
import {PropertyModel} from '../../models/PropertyModel';
import {AppData} from '../../app.data';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {FileUploadService} from '../../services/file-upload.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-placeform',
    templateUrl: './placeform.page.html',
    styleUrls: ['./placeform.page.scss'],
})

export class PlaceformPage implements OnInit {
    public documentID;
    public myTitle: any = 'Yeni Ekle/Güncelle';
    public placeModel: PlaceModel = new PlaceModel();
    public entity: FormGroup;
    public tempPhotos = new Array<string>();
    public selectedProperties = [];
    public cities = new Array<CityModel>();
    public districts: any[];
    public properties = Array<PropertyModel>();

    // tslint:disable-next-line:max-line-length
    constructor(public formBuilder: FormBuilder, public placeService: PlaceService, public alertHelper: AlertHelper, public route: ActivatedRoute, public camera: Camera, public fileUploadService: FileUploadService, public alertController: AlertController) {
        this.entity = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            digest: ['', Validators.compose([Validators.required])],
            category: ['', Validators.compose([Validators.required])],
            coordinate: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            district: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            address: ['', Validators.compose([Validators.required])],
        });

        this.cities = AppData.cities;
        this.properties = AppData.properties;
        this.selectedProperties = [];

        console.log(AppData.getLatLong());
        this.placeModel.position = AppData.getLatLong();
    }

    ngOnInit() {
        this.properties = AppData.properties;
        this.selectedProperties = [];

        this.documentID = this.route.snapshot.paramMap.get('documentID');
        if (this.documentID !== '0') {
            this.placeService.get(this.documentID).then((result) => {
                this.placeModel = result;
                this.selectedProperties = result.properties;
                // console.log('BEFORE FOR: ', this.selectedProperties);

                for (let i = 0; i < this.properties.length; i++) {
                    let temp = this.properties[i];
                    if (this.selectedProperties.includes(temp.slug)) {
                        this.properties[i].isChecked = true;
                    }
                }


            });

        } else {
            this.placeModel.documentID = '0';
        }

        console.log('placeform ngOnInit', this.placeModel.documentID);
    }

    async save() {
        console.log(this.placeModel);
        console.log(this.tempPhotos);

        for (const p of this.tempPhotos) {
            const url = await this.fileUploadService.upload('places', p);
            if (url != null) {
                console.log(url);
                this.placeModel.images.push(url);
            }
        }


        let result: boolean;

        this.placeModel.properties = this.selectedProperties;
        this.placeModel.updateDate = Date.now();
        this.placeModel.isApproved = false;

        if (this.documentID !== '0') {
            result = await this.placeService.update(this.documentID, this.placeModel);
        } else {
            this.placeModel.insertDate = Date.now();
            this.placeModel.updateDate = Date.now();
            this.placeModel.owner = AppData.user.email;
            this.placeModel.isApproved = false;
            this.placeModel.isDeleted = false;
            this.placeModel.isFav = false;
            result = await this.placeService.insert(this.placeModel);
        }

        if (result) {
            await this.alertHelper.success();
        } else {
            await this.alertHelper.error();
        }
    }

    setAttr(attr: string) {
        const found = this.selectedProperties.includes(attr);

        if (found) {
            this.selectedProperties = this.arrayRemove(this.selectedProperties, attr);
        } else {
            this.selectedProperties.push(attr);
        }

        console.log(this.selectedProperties);
    }

    async setDistricts(name: any) {
        console.log(name);
        for (const city of this.cities) {
            if (city.city_name === name) {
                this.districts = city.districts;
                break;
            }
        }
    }

    async approve(documentID: string) {
        await this.placeService.approve(documentID).then(() => {
            this.alertHelper.success();
        });
    }

    async delete(documentID: string) {
        await this.placeService.delete(documentID).then(() => {
            this.alertHelper.success();
        });
    }

    async unApprove(documentID: string) {
        await this.placeService.unApprove(documentID).then(() => {
            this.alertHelper.success();
        });
    }

    reset() {
        this.selectedProperties = [];
        for (let i = 0; i < this.properties.length; i++) {
            this.properties[i].isChecked = false;
        }
    }

    public arrayRemove(arr, value) {

        return arr.filter(ele => {
            return ele !== value;
        });

    }

    async takePhoto() {
        try {
            const options: CameraOptions = {
                quality: 81,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
            };

            const imageData = await this.camera.getPicture(options);
            console.log('takePhoto ', imageData);

            const base64Image = 'data:image/jpeg;base64,' + imageData;

            if (base64Image != null) {
                this.tempPhotos.push(base64Image);
            }
        } catch (e) {
            console.error('CAMERA ERROR', e);
        }
    }

    async removeImage(image: string, inStorage: boolean = false) {
        const rawName = decodeURIComponent(image.replace('https://firebasestorage.googleapis.com/v0/b/cocukla-app.appspot.com/o/', ''));
        const splitted: string[] = rawName.split('?');
        const original = splitted[0];
        console.log(original);
        const [alert] = await Promise.all([this.alertController.create({
            header: 'Dikkat',
            // subHeader: 'Subtitle',
            message: 'Bu resmi silmek istediğinize emin misiniz?',
            buttons: [
                {
                    text: 'Hayır',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('İşlem iptal edildi.');
                    }
                }, {
                    text: 'Evet',
                    handler: () => {
                        if (inStorage) {
                            this.fileUploadService.storage.ref(original).delete();

                            const newArr: string[] = new Array<string>();
                            for (const t of this.placeModel.images) {
                                if (t !== image) {
                                    newArr.push(t);
                                }
                            }
                            this.placeModel.images = newArr;

                            this.placeService.updateOnlyImages(this.placeModel);
                            console.log('Resim silindi.');
                        } else {
                            const newArr: string[] = new Array<string>();
                            for (const t of this.tempPhotos) {
                                if (t !== image) {
                                    newArr.push(t);
                                }
                            }

                            this.tempPhotos = newArr;
                        }
                    }
                }
            ]
        })]);

        await alert.present();
    }
}
