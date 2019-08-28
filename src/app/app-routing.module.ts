import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'menu', loadChildren: './menu/menu.module#MenuPageModule'},
    {path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule'},
    {path: 'subscribe', loadChildren: './subscribe/subscribe.module#SubscribePageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
