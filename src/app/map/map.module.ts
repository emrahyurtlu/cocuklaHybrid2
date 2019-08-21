import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MapPage} from './map.page';
import {AppModule} from '../app.module';
import {GooglemapComponent} from '../components/googlemap/googlemap.component';

const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        AppModule
    ],
    exports: [
        GooglemapComponent
    ],
    declarations: [MapPage, GooglemapComponent]
})
export class MapPageModule {
}
