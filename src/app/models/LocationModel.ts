export class LocationModel {
    public latitude: number | null;
    public longitude: number | null;
    public city: string | null;
    public district: string | null;

    constructor(lat: number = 0, long: number = 0, city: string = '', dist: string = '') {
        this.latitude = lat;
        this.longitude = long;
        this.city = city;
        this.district = dist;
    }
}
