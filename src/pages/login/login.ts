import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username:any;
  public password:any;
  public userData:any;
  public status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, public storage:Storage) {
  }





  async doLogin(){

    let url = 'http://www.om4you.com/champ/csw_api/login.php';
    let myHeader = new Headers();
    // myHeader.append("Accept",'application/json');
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

    let response = await this.http.post(url, {username:this.username,password:this.password},{headers:myHeader}).toPromise();
    this.userData = await response.json();
    if(this.userData.length > 0){
      for (let data of this.userData) {
        this.storage.set('login','true');
        this.storage.set('teacher_id',data.tb_teacher_id);
        this.storage.set('teacher_name',data.tb_teacher_name);
        this.storage.set('teacher_number',data.tb_teacher_number);
        this.storage.set('teacher_password',data.tb_teacher_password);
        this.storage.set('teacher_degree',data.tb_teacher_degree);
        this.storage.set('teacher_picture',data.tb_teacher_picture);
      }
      this.navCtrl.setRoot(TabsPage);
    }
    else{
      this.status = 'wrong';
    }





    // this.userName = await this.storage.get('teacher_name');



  }

}
