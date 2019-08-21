import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HomePageRoutingModule} from './home.router.module';

import {HomePage} from './home.page';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomePageRoutingModule,
        ComponentsModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
