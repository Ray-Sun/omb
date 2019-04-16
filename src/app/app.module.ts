import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { SearchModule } from "./search/search.module";
import { ImageLoaderModule } from "./image-loader/image-loader.module";

import { RequestService } from "./providers/request/request.service";
import { AngularRequestService } from "./providers/angular-request/angular-request.service";
import { NativeRequestService } from "./providers/native-request/native-request.service";
import { KeywordsService } from "./providers/keywords/keywords.service";
import { MessageTipService } from "./providers/messageTip/message-tip.service";
import { AccountService } from "./providers/account/account.service";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SearchModule,
    ImageLoaderModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    RequestService,
    NativeRequestService,
    AngularRequestService,
    NativeStorage,
    KeywordsService,
    MessageTipService,
    AccountService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
