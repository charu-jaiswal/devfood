import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class CouponWiseServices {

  constructor(
    private http: Http,
  ) { }


  getReportAggCoupon(dataPost: any) {
    return this.http.post(URL.getReportAggCoupon, dataPost);
  }

}
