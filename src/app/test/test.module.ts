import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TestPage} from './test.page';
import {ComponentsModule} from '../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: TestPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [TestPage]
})
export class TestPageModule {
}
