import {NgModule} from '@angular/core';
import {GoogleMapComponent} from './google-map/google-map.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [
        GoogleMapComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        GoogleMapComponent
    ]
})
export class ComponentsModule {}
