import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
        children: [
            {
                path: 'home',
                loadChildren: '../home/home.module#HomePageModule'
            },
            {
                path: 'profile',
                loadChildren: '../profile/profile.module#ProfilePageModule'
            },
            {
                path: 'places',
                loadChildren: '../places/places.module#PlacesPageModule'
            },
            {
                path: 'places/placeform',
                loadChildren: '../placeform/placeform.module#PlaceformPageModule'
            },
            {
                path: 'pending-content',
                loadChildren: '../pending-content/pending-content.module#PendingContentPageModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {
}
