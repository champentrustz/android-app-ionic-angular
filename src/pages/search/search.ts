import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http} from "@angular/http";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public status:any;
  public studentCode:any;
  public dataStudent:any;
  public semester:any;
  public semesterSelect:any;
  public studentCodeSearch:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,public loadingController:LoadingController) {
    this.studentCodeSearch = this.navParams.get('studentCodeSearch');
  }

  ionViewDidLoad() {

  }

  convertDate(dateFull){
    let year = dateFull.substr(0,4);
    let month = dateFull.substr(5,2);
    let date = dateFull.substr(8,2);
    switch (month){
      case '01':
        month = 'ม.ค.';
        break;
      case '01':
        month = 'ก.พ.';
        break;
      case '02':
        month = 'มี.ค.';
        break;
      case '03':
        month = 'เม.ย.';
        break;
      case '04':
        month = 'พ.ค.';
        break;
      case '05':
        month = 'มิ.ย.';
        break;
      case '06':
        month = 'ก.ค.';
        break;
      case '07':
        month = 'ส.ค.';
        break;
      case '08':
        month = 'ก.ย.';
        break;
      case '09':
        month = 'ต.ค.';
        break;
      case '11':
        month = 'พ.ย.';
        break;
      case '12':
        month = 'ธ.ค.';
        break;
    }
    year = parseInt(year)+543;

    return date+' '+month+' '+year;
  }

  async changeSemester(semesterSelect){

    let loading =  this.loadingController.create({
      content:'กำลังโหลดข้อมูล...',
      spinner:'circles'
    });

    loading.present();

    let url = 'http://www.om4you.com/champ/csw_api/student_search.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let subSemester  = semesterSelect.substr(0,1);
    let subYear = parseInt(semesterSelect.substr(2,4)) - 543;
    let response = await this.http.post(url, {studentCode:this.studentCode,semester:subSemester,year:subYear},{headers:myHeader}).toPromise();
    this.dataStudent = await response.json();
    if(response){
      loading.dismiss();
    }
  }

  async ionViewWillEnter(){
      this.status = null;
      this.studentCode = null;
      this.dataStudent = null;
      if(this.studentCodeSearch == null || this.studentCodeSearch == '' || this.studentCodeSearch == undefined){

      }
      else{
        this.studentCode = this.studentCodeSearch;
        let url = 'http://www.om4you.com/champ/csw_api/student_search.php';
        let url2 = 'http://www.om4you.com/champ/csw_api/get_semester.php';
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        let response2 = await this.http.post(url2, {studentCode:this.studentCode},{headers:myHeader}).toPromise();
        this.semester = await response2.json();



        if(this.semester == null){

          let url_semester = 'http://www.om4you.com/champ/csw_api/get_now_semester.php';
          let response = await this.http.get(url_semester).toPromise();
          let nowSemester = await response.json();
          this.semesterSelect = nowSemester[0];
          this.semester = nowSemester;
          let subSemester  = nowSemester[0].substr(0,1);
          let subYear = parseInt(nowSemester[0].substr(2,4)) - 543;
          let response2 = await this.http.post(url, {studentCode:this.studentCode,semester:subSemester,year:subYear},{headers:myHeader}).toPromise();
          this.dataStudent = await response2.json();
          if(this.dataStudent == null){
            return this.status = 'no-match';
          }
          else{
            this.status = null;

            return this.dataStudent;

          }
        }
        else{
          let subSemester  = this.semester[0].substr(0,1);
          let subYear = parseInt(this.semester[0].substr(2,4)) - 543;
          let response = await this.http.post(url, {studentCode:this.studentCode,semester:subSemester,year:subYear},{headers:myHeader}).toPromise();
          this.semesterSelect = this.semester[0];
          this.dataStudent = await response.json();
          if(this.dataStudent == null){
            return this.status = 'no-match';
          }
          else{
            this.status = null;
            return this.dataStudent;

          }
        }
      }
  }


  async doRefresh(refresher){
    let loading =  this.loadingController.create({
      spinner:'circles'
    });

    loading.present();
    refresher.complete();
    if(this.ionViewWillEnter()){
      loading.dismiss();
    }


  }


  async searchStudent(){
    if(this.studentCode == undefined || this.studentCode == null || this.studentCode == ''){
      return this.status = 'blank';
    }
    else{
      let url = 'http://www.om4you.com/champ/csw_api/student_search.php';
      let url2 = 'http://www.om4you.com/champ/csw_api/get_semester.php';
      let myHeader = new Headers();
      myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      let response2 = await this.http.post(url2, {studentCode:this.studentCode},{headers:myHeader}).toPromise();
      this.semester = await response2.json();



      if(this.semester == null){

        let url_semester = 'http://www.om4you.com/champ/csw_api/get_now_semester.php';
        let response = await this.http.get(url_semester).toPromise();
        let nowSemester = await response.json();
        this.semesterSelect = nowSemester[0];
        this.semester = nowSemester;
        let subSemester  = nowSemester[0].substr(0,1);
        let subYear = parseInt(nowSemester[0].substr(2,4)) - 543;
        let response2 = await this.http.post(url, {studentCode:this.studentCode,semester:subSemester,year:subYear},{headers:myHeader}).toPromise();
        this.dataStudent = await response2.json();
        if(this.dataStudent == null){
          return this.status = 'no-match';
        }
        else{
          this.status = null;

          return this.dataStudent;

        }
      }
      else{
        let subSemester  = this.semester[0].substr(0,1);
        let subYear = parseInt(this.semester[0].substr(2,4)) - 543;
        let response = await this.http.post(url, {studentCode:this.studentCode,semester:subSemester,year:subYear},{headers:myHeader}).toPromise();
        this.semesterSelect = this.semester[0];
        this.dataStudent = await response.json();
        if(this.dataStudent == null){
          return this.status = 'no-match';
        }
        else{
          this.status = null;
          return this.dataStudent;

        }
      }

    }
  }

}
