import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import {ServiceWorkerModule} from '@angular/service-worker';
import {LeftnavPageModule} from './leftnav/leftnav.module';
import {Firebase} from '@ionic-native/firebase/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        LeftnavPageModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        GooglePlus,
        Camera,
        Firebase,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
