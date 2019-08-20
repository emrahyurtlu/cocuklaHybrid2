import {objectify} from "tslint/lib/utils";

export class PlaceModel {
    public documentID = '';
    public name = '';
    public digest = '';
    public rating = 0;
    public isFav:boolean;
    public isApproved:boolean;
    public isActive:boolean;
    public isDeleted:boolean;
    public owner = '';
    public category = '';
    public phone = '';
    public email = '';
    public fax = '';
    public address = '';
    public city = '';
    public district = '';
    public position = '';
    public insertDate = 0;
    public updateDate = 0;
    public properties = [];
    public comments = Array<object>();
    public images = [];

    toObject() {
        return {
            documentID: this.documentID,
            name: this.name,
            digest: this.digest,
            rating: this.rating,
            isFav: this.isFav,
            isApproved: this.isApproved,
            isActive: this.isActive,
            isDeleted: this.isDeleted,
            owner: this.owner,
            category: this.category,
            phone: this.phone,
            email: this.email,
            fax: this.fax,
            address: this.address,
            city: this.city,
            district: this.district,
            position: this.position,
            insertDate: this.insertDate,
            updateDate: this.updateDate,
            properties: this.properties,
            comments: this.comments,
            images: this.images,
        };
    }
}
