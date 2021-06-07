import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class ItemWiseServices {

  constructor(
    private http: Http,
  ) { }

  getOutlet(dataPost: any) {
    // console.log(dataPost);
    return this.http.post(URL.getItemWise, dataPost);
  }

}
