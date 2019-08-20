import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
    {path: 'commentform', loadChildren: './commentform/commentform.module#CommentformPageModule'},
    {path: 'detail', loadChildren: './detail/detail.module#DetailPageModule'},
    {path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule'},
    {path: 'placeform', loadChildren: './placeform/placeform.module#PlaceformPageModule'},
    {path: 'places', loadChildren: './places/places.module#PlacesPageModule'},
    {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
    {path: 'subscribe', loadChildren: './subscribe/subscribe.module#SubscribePageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
