import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public passwordNew:any;
  public confirmPassword:any;
  public status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private http:Http, public storage:Storage) {
  }

  async changePassword() {
    if (this.passwordNew !== this.confirmPassword) {
      this.status = 'duplicate';
    }

    else if (this.passwordNew == undefined || this.confirmPassword == undefined) {
      this.status = 'blank';
    }
    else{

      let url = 'http://www.om4you.com/champ/csw_api/change_password.php';
      let teacherNumber = await this.storage.get('teacher_number')
      let myHeader = new Headers();
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(url, {teacherNumber:teacherNumber,password:this.passwordNew},{headers:myHeader}).toPromise();
      let toast = this.toastCtrl.create({
        message: 'เปลี่ยนรหัสผ่านสำเร็จ!',
        duration: 4000,
        position: 'top',
      });
      toast.present();
      this.navCtrl.pop();
    }
  }



}
