import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class RewardTransListService {

  constructor(
    private http: Http,
  ) { }

  getRewardTranListData(dataPost: any) {
    // console.log(dataPost);
    // const header = new Headers({
    //   'Content-Type': 'application/json',
    // });
    // const options = new RequestOptions({ headers: header });
    return this.http.post(URL.getReportAllRewardTrans, dataPost);
  }

}
