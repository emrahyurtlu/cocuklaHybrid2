export class CityModel {
    public name: string;
    public districts: string[];
    public plate: number;

    constructor(n = '', d = [], p = 0) {
        this.name = n;
        this.districts = d;
        this.plate = p;
    }
}
