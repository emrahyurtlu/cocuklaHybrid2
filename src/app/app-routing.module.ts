import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'menu', loadChildren: './menu/menu.module#MenuPageModule'},
    {path: 'commentform', loadChildren: './commentform/commentform.module#CommentformPageModule'},
    {path: 'detail', loadChildren: './detail/detail.module#DetailPageModule'},
    {path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule'},
    {path: 'placeform', loadChildren: './placeform/placeform.module#PlaceformPageModule'},
    {path: 'subscribe', loadChildren: './subscribe/subscribe.module#SubscribePageModule'},
    // {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    // {path: 'test', loadChildren: './test/test.module#TestPageModule'},
    // {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
    // {path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule'},
    // {path: 'places', loadChildren: './places/places.module#PlacesPageModule'},
    // {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
    // {path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule'},
    // {path: 'pending-content', loadChildren: './pending-content/pending-content.module#PendingContentPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
