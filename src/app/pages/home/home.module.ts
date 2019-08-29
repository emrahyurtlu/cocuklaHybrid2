import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';
import {ComponentsModule} from '../../components/components.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        component: HomePage,
        children: [
            {
                path: 'tab1',
                loadChildren: '../main/main.module#MainPageModule'
            },
            {
                path: 'tab1/detail/:documentID',
                loadChildren: '../detail/detail.module#DetailPageModule'
            },
            {
                path: 'tab1/detail/:documentID/commentform/:documentID',
                loadChildren: '../commentform/commentform.module#CommentformPageModule'
            },
            {
                path: 'tab2',
                loadChildren: '../favorites/favorites.module#FavoritesPageModule'
            },
            {
                path: 'tab2/detail/:documentID',
                loadChildren: '../detail/detail.module#DetailPageModule'
            },
            {
                path: 'tab3',
                loadChildren: '../explore/explore.module#ExplorePageModule'
            },
            {
                path: 'tab3/detail/:documentID',
                loadChildren: '../detail/detail.module#DetailPageModule'
            },
            {
                path: '',
                redirectTo: 'tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
