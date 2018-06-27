import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import {IonicStorageModule} from "@ionic/storage";
import { HttpModule } from '@angular/http';
import { HttpClientModule  } from '@angular/common/http';
import {TabsPage} from "../pages/tabs/tabs";
import {SettingPage} from "../pages/setting/setting";
import { StudentServiceProvider } from '../providers/student-service/student-service';
import {ReportPage} from "../pages/report/report";
import {ChangePasswordPage} from "../pages/change-password/change-password";
import {ShowPasswordPage} from "../pages/show-password/show-password";
import {SearchPage} from "../pages/search/search";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    SettingPage,
    ReportPage,
    ChangePasswordPage,
    ShowPasswordPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    SettingPage,
    ReportPage,
    ChangePasswordPage,
    ShowPasswordPage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentServiceProvider
  ]
})
export class AppModule {}
