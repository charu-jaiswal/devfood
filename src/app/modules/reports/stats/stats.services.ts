import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import URL from '../../../shared/url';

@Injectable()
export class StatsService {

  constructor(
    private http: Http,
  ) { }

  getStats(dataPost: any) {
    return this.http.post(URL.getStats, dataPost);
  }
  getHeatMap(dataPost: any) {
    return this.http.post(URL.getReportAggHeatmap, dataPost);
  }

}
