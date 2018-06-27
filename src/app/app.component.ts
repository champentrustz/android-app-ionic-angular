import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { LoginPage } from '../pages/login/login';
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  isLogin:any


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,public storage:Storage) {
    platform.ready().then(async () => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.isLogin = await this.storage.get('login');
      if(this.isLogin == 'true'){
        this.rootPage = TabsPage;
      }
      else{
        this.rootPage = LoginPage;
      }
      splashScreen.hide();
    });
  }
}
