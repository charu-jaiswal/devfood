import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class RewardsListService {

  constructor(
    private http: Http,
  ) { }

  getRewardListData(dataPost: any) {
    // console.log(dataPost);
    // const header = new Headers({
    //   'Content-Type': 'application/json',
    // });
    // const options = new RequestOptions({ headers: header });
    return this.http.post(URL.getReportAllReward, dataPost);
  }

}
