import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class DateWiseSalesServices {

  constructor(
    private http: Http,
  ) { }

  getDate(dataPost: any) {
    // console.log(dataPost);
    return this.http.post(URL.getDateWiseSales, dataPost);
  }
  
  getTime(dataPost: any) {
    // console.log(dataPost);
    return this.http.post(URL.getReportAggTimewise, dataPost);
  }

}
