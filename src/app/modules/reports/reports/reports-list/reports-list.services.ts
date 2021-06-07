import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../../shared/url';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ReportListService {

  constructor(
    private http: Http,
  ) { }

  getListOrders(dataPost: any) {
    // console.log(dataPost);
    // const header = new Headers({
    //   'Content-Type': 'application/json',
    // });
    // const options = new RequestOptions({ headers: header });
    return this.http.post(URL.getListOrder, dataPost);
  }

  syncOrder(restaID: string) {
    return this.http.get(URL.reSyncMongoDBResta + '?restaID=' + restaID + '&limit=70&offset=0');
  }

}
