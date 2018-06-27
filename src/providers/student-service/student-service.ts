import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StudentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentServiceProvider {

  constructor(private http:Http,public storage:Storage) {
    // console.log('Hello StudentServiceProvider Provider');
  }


  async getStudent(){

    let teacherDegree = await this.storage.get('teacher_degree');
    let url = 'http://www.om4you.com/champ/csw_api/student.php';
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    let response = await this.http.post(url, {teacherDegree:teacherDegree},{headers:myHeader}).toPromise();
    return response.json();

  }


}
