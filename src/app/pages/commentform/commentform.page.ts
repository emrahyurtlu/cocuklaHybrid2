import {Component, OnInit} from '@angular/core';
import {CommentModel} from '../../models/CommentModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../../services/place.service';
import {AppData} from '../../app.data';
import {ActivatedRoute} from '@angular/router';
import {AlertHelper} from '../helpers/alert.helper';

@Component({
    selector: 'app-commentform',
    templateUrl: './commentform.page.html',
    styleUrls: ['./commentform.page.scss'],
})
export class CommentformPage implements OnInit {
    public commentModel: CommentModel = new CommentModel();
    public entity: FormGroup;
    public documentID: string;

    // tslint:disable-next-line:max-line-length
    constructor(public formBuilder: FormBuilder, public placeService: PlaceService, public route: ActivatedRoute, public alertHelper: AlertHelper) {
        this.entity = this.formBuilder.group({
            rating: ['', Validators.compose([Validators.required])],
            content: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
        this.documentID = this.route.snapshot.paramMap.get('documentID');
        console.log('will comment on: ', this.documentID);
    }

    async save() {
        this.commentModel.isApproved = false;
        this.commentModel.timestamp = Date.now();
        this.commentModel.name = AppData.user.displayName;
        this.commentModel.owner = AppData.user.email;
        const result = await this.placeService.addComment(this.commentModel, this.documentID);
        if (result) {
            await this.alertHelper.success();
        } else {
            await this.alertHelper.error();
        }
    }
}
