export class LocationModel {
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    district: string | null;

    constructor(lat: number = 0, long: number = 0, city: string = '', dist: string = '') {
        this.latitude = lat;
        this.longitude = long;
        this.city = city;
        this.district = dist;
    }
}
