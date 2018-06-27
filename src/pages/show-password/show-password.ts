import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShowPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-password',
  templateUrl: 'show-password.html',
})
export class ShowPasswordPage {

  public teacherData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http) {
  }

  async getTeacherData(){

    let teacherNumber = await this.storage.get('teacher_number');
    let url = 'http://www.om4you.com/champ/csw_api/get_teacher.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let response = await this.http.post(url, {teacherNumber:teacherNumber},{headers:myHeader}).toPromise();
    this.teacherData = await response.json();
    return this.teacherData
  }

  async ionViewWillEnter(){
    this.getTeacherData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShowPasswordPage');
  }

}
