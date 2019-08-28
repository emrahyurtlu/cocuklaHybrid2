import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/PlaceModel';
import {PlaceService} from '../../services/place.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppData} from '../../app.data';
import {PropertyModel} from '../../models/PropertyModel';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    public placeModel: PlaceModel = new PlaceModel();
    myTitle: any = this.placeModel.name;
    public documentID: string;
    public properties: Array<PropertyModel>;

    constructor(private placeService: PlaceService, private route: ActivatedRoute, private router: Router) {
        console.log('home: ', this.router.url);
        this.properties = AppData.properties;

        console.log(this.properties);
    }

    ngOnInit() {
        this.documentID = this.route.snapshot.paramMap.get('documentID');
        this.placeService.get(this.documentID).then((result) => {
            this.placeModel = result;
            console.log(result);
        });
    }

    getPropertyName(slug: string) {
        const properties = AppData.properties;
        let result;
        properties.forEach(value => {
            if (value.slug === slug) {
                result = value.content;
            }
        });

        return result;
    }
}
