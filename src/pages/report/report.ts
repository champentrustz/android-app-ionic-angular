import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {SearchPage} from "../search/search";

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public dateSearch:any;
  public dataStudent:any;
  public status:any;
  public present:any;
  public absent:any;
  public numStudent:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http , public storage:Storage, public loadingController:LoadingController) {

  }


  ionViewDidLoad() {

    // console.log('ionViewDidLoad ReportPage');
  }

  async setInitial(){

    this.present = 0;
    this.absent = 0;
    let teacherDegree = await this.storage.get('teacher_degree');
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

    let url_date = 'http://www.om4you.com/champ/csw_api/get_today.php';
    let response_date = await this.http.get(url_date).toPromise();
    let dataDate = await response_date.json();
    this.dateSearch = dataDate[0];


    let url = 'http://www.om4you.com/champ/csw_api/show_student.php';
    let response = await this.http.post(url, {teacherDegree:teacherDegree,date:this.dateSearch},{headers:myHeader}).toPromise();
    this.dataStudent = await response.json();


    if(this.dataStudent.length == 0){
      this.status = 0;
    }
    else{
      for (let i = 0; i < this.dataStudent.length; i++) {
        if(this.dataStudent[i].tb_time_type == 1){
          this.present += 1;
        }
        else{
          this.absent += 1
        }
      }
      this.status = 1;
    }

    this.numStudent = this.present + this.absent;
  }

  doRefresh(refresher){
    this.ionViewWillEnter();
    refresher.complete();
  }

  searchStudent(studentCode){
      this.navCtrl.push(SearchPage, {
        studentCodeSearch: studentCode,
      });
  }

  async changeDate(dataSearch){

    let loading =  this.loadingController.create({
      content:'กำลังโหลดข้อมูล...',
      spinner:'circles'
    });
    loading.present();


    this.present = 0;
    this.absent = 0;
    let teacherDegree = await this.storage.get('teacher_degree');
    let url = 'http://www.om4you.com/champ/csw_api/show_student.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let response = await this.http.post(url, {teacherDegree:teacherDegree,date:dataSearch},{headers:myHeader}).toPromise();
    this.dataStudent = await response.json();
    if(this.dataStudent.length == 0){
      this.status = 0;
    }
    else{
      for (let i = 0; i < this.dataStudent.length; i++) {
       if(this.dataStudent[i].tb_time_type == 1){
          this.present += 1;
       }
       else{
          this.absent += 1
       }
      }
      this.status = 1;
    }
    this.numStudent = this.present + this.absent;

    if(response){
      loading.dismiss();
    }
  }


  async ionViewWillEnter(){
    let loading =  this.loadingController.create({
      content:'กำลังโหลดข้อมูล...',
      spinner:'circles'
    });
    loading.present();
    if(this.setInitial()){
      loading.dismiss();
    }

  }

}
