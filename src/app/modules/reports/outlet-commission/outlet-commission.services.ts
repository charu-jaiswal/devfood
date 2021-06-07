import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class OutletCommissionServices {

  constructor(
    private http: Http,
  ) { }

  getOutlet(dataPost: any) {
    // console.log(dataPost);
    return this.http.post(URL.getOutletCommission, dataPost);
  }

}
