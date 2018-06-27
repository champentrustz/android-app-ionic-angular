import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {toPromise} from "rxjs/operator/toPromise";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data:any;
  teacherCheck:any;
  dataStudent:any;
  dateFull:any;

  constructor(public navCtrl: NavController, public loadingController:LoadingController, public http:Http,public storage:Storage) {

  }

  async getDataStudent(){

      let teacherDegree = await this.storage.get('teacher_degree');
      let url = 'http://www.om4you.com/champ/csw_api/student.php';
      let myHeader = new Headers();
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let response = await this.http.post(url, {teacherDegree:teacherDegree},{headers:myHeader}).toPromise();
      this.dataStudent = await response.json();
  }

  async changeFormatDate(){


    let url = 'http://www.om4you.com/champ/csw_api/get_date_day.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let response = await this.http.get(url).toPromise();
    let dateReturn = await response.json();

    for (let i = 0; i < dateReturn.length; i++) {
      this.dateFull = dateReturn[0].day+' ที่ '+ dateReturn[0].date+' '+ dateReturn[0].month+' '+ dateReturn[0].year;
    }


    return this.dateFull;

  }

  async ionViewWillEnter(){

    this.changeFormatDate();
    this.teacherCheckStatus();
    let loading =  this.loadingController.create({
      content:'กำลังโหลดข้อมูล...',
      spinner:'circles'
    });
    loading.present();
    if(this.getDataStudent()){
       loading.dismiss();
    }

  }

  doRefresh(refresher){
    this.ionViewWillEnter();
    refresher.complete();
  }

  async teacherCheckStatus(){

      let teacherDegree = await this.storage.get('teacher_degree');
      let url = 'http://www.om4you.com/champ/csw_api/teacher_check.php';
      let myHeader = new Headers();
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let response = await this.http.post(url, {teacherDegree:teacherDegree},{headers:myHeader}).toPromise();
        this.teacherCheck = await response.json();
      return this.teacherCheck;
  }


  async loadCheck(){
    let loading =  this.loadingController.create({
      content:'กำลังบันทึกข้อมูล...',
      spinner:'circles'
    });

    loading.present();

    if(await this.checkStudent()){

      loading.dismiss();
      this.navCtrl.parent.select(1);
    }
  }

  async checkStudent(){


    let teacherDegree = await this.storage.get('teacher_degree');
    let teacherCode = await this.storage.get('teacher_number');
    let url = 'http://www.om4you.com/champ/csw_api/check_student.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');

    for (let i = 0; i < this.dataStudent.length; i++) {
      await this.http.post(url, {teacherDegree:teacherDegree,teacherCode:teacherCode,timeType:this.dataStudent[i].tb_time_type,studentCode:this.dataStudent[i].tb_student_code},{headers:myHeader}).toPromise();
    }

    return toPromise;

  }

}
