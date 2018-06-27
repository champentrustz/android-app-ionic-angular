import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {HomePage} from "../home/home";
import {SettingPage} from "../setting/setting";
import {ReportPage} from "../report/report";
import {SearchPage} from "../search/search";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root:any;
  tab2Root:any;
  tab3Root:any;
  tab4Root:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {

    // this.platform.resume.subscribe(()=>{
    //   this.navCtrl.parent.select(0);
    // });

    this.tab1Root = HomePage;
    this.tab2Root = ReportPage;
    this.tab3Root = SearchPage;
    this.tab4Root = SettingPage;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TabsPage');
  }

}
