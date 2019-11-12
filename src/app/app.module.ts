import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { PlaylistsService } from './services/playlists.service';
import { AuthService } from './services/auth.service';
import { TracksService } from './services/tracks.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        InAppBrowser,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        UserService,
        PlaylistsService,
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        AuthService,
        TracksService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
