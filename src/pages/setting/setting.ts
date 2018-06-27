import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import { Http, Headers } from '@angular/http';
import {ChangePasswordPage} from "../change-password/change-password";
import {ShowPasswordPage} from "../show-password/show-password";


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  public teacherNumber:any;
  public teacherName:any;
  public teacherData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public app:App, private http:Http) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingPage');
  }


  showPassword(){
    this.navCtrl.push(ShowPasswordPage);
  }

  async getTeacherData(){

    this.teacherNumber = await this.storage.get('teacher_number');
    this.teacherName = await this.storage.get('teacher_name');
    let url = 'http://www.om4you.com/champ/csw_api/get_teacher.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let response = await this.http.post(url, {teacherNumber:this.teacherNumber},{headers:myHeader}).toPromise();
    this.teacherData = await response.json();
  }

  async ionViewWillEnter(){
    this.getTeacherData();
  }

  changePasswordPage(){
    this.navCtrl.push(ChangePasswordPage);
  }

  async doLogout(){


    await this.storage.clear();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);

  }

}
