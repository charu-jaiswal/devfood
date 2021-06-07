import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class UserWiseServices {

  constructor(
    private http: Http,
  ) { }


  getReportAggUser(dataPost: any) {
    return this.http.post(URL.getReportAggUser, dataPost);
  }

}
