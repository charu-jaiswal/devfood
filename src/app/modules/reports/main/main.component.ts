import { Component, OnInit, ViewChild, SimpleChange } from '@angular/core';
import { DateWiseSalesServices } from '../../../modules/reports/date-wise-sales/date-wise-sales.services';
import { OutletWiseSalesServices } from '../../../modules/reports/outlet-wise-sales/outlet-wise-sales.services';
import { StatsService } from '../../../modules/reports/stats/stats.services';
import { FirestoreService } from '../../../core/firestore.service';
import { GlobalSettingFirePath, BrandFirePath } from '../../firestore.path';
import { AuthService } from './../../../core/auth.service';
import * as moment from 'moment';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
declare var require: any;

const data: any = require('./data.json');

declare var google: any;
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  timezone = 'GMT';
  numOrder: number;
  sOrderCount: number;
  stats: any = {};
  groupStats: any = {};
  subtitle: string;
  dataPost: any;
  outletWiseSales: any;
  timeWiseSales: any;
  dateWiseSales: any;
  statsReport: any;
  grandTotal = 0;
  grandOutletTotal = 0;
  grandTimeTotal = 0;
  isDataAvailable = true;
  isDataOutletAvailable = true;
  isTimeAvailable = true;
  daterange: any = {};
  options: any = {
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    },
    alwaysShowCalendars: true,
    locale: { format: 'YYYY-MM-DD' },
    parentEl: '#daterangepicker-panel',
    startDate: new Date(moment().subtract(29, 'days').valueOf()),
    endDate: new Date(moment().valueOf()),
  };
  brandLat = 0;
  brandLong = 0;
  private map = null;
  private heatmap = null;

  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [0, 50, 30, 60, 180, 120, 180, 80], label: 'Sales ' },
    // { data: [0, 100, 70, 100, 240, 180, 220, 140], label: 'Expense ' },
    // { data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Earning ' },
  ];

  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      }],
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      }],
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(76,139,236,0.8)',
      borderColor: 'rgba(76,139,236,1)',
      pointBackgroundColor: 'rgba(76,139,236,1)',
      pointBorderColor: '#fff',

      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,139,236,1)',
    }, {
      // grey
      backgroundColor: 'rgba(117,91,241,1)',
      borderColor: 'rgba(117,91,241,1)',
      pointBackgroundColor: 'rgba(117,91,241,1)',
      pointBorderColor: '#fff',

      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(117,91,241,1)',
    }];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // bar
  public timeBarChartOptions: any = {
    borderWidth: 2,
    maintainAspectRatio: false,
  };
  public timeBarChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public timeBarChartType = 'bar';
  public timeBarChartLegend = true;

  public timeBarChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales by time' },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  ];

  // bar
  public barChartOptions: any = {
    borderWidth: 2,
    maintainAspectRatio: false,
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales by outlet' },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  ];

  loading: Boolean = false;


  constructor(
    private dateWiseSalesServices: DateWiseSalesServices,
    private auth: AuthService,
    public fireDB: FirestoreService,
    private outletWiseSalesServices: OutletWiseSalesServices,
    private statsService: StatsService,
  ) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB
      .doc$(`${GlobalSettingFirePath}`)
      .subscribe((globalSettingData: any) => {
        this.timezone = _.get(globalSettingData, 'time.zone', 'GMT');
        FbDbSubscribe1.unsubscribe();
        this.onSearch();
      });
    const FbDbSubscribe = this.fireDB.doc$(`${BrandFirePath}`).subscribe((outletData: any) => {
      // render map
      this.brandLat = _.get(outletData, 'address.lat', 0);
      this.brandLong = _.get(outletData, 'address.long', 0);
      FbDbSubscribe.unsubscribe();
    });
    this.loading = true;
    const tmpDate = moment().subtract(29, 'days');
    const today = moment();
    this.dataPost = {
      customName: '',
      outlet: '',
      payment: '',
      type: '',
      status: 'DELIVERED',
      mobileNo: '',
      dateFrom: new Date(Date.UTC(tmpDate.year(), tmpDate.month(), tmpDate.date(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(today.year(), today.month(), today.date(), 23, 59, 59, 99)).toUTCString(),
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };
  }

  onSearch() {
    this.isDataAvailable = false;
    this.isDataOutletAvailable = false;
    this.isTimeAvailable = false;
    this.lineChartData = [
      { data: [], label: 'Sales ' },
    ];
    this.lineChartLabels = [];
    this.dataPost.timezone = this.timezone;
    this.dateWiseSalesServices.getDate(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      this.loading = false;
      if (result.status) {
        if (result.data !== undefined) {
          this.dateWiseSales = result.data;
          this.grandTotal = _.sumBy(result.data, 'finalAmtTotal');
          for (let index = 0; index < this.dateWiseSales.length; index++) {
            const element = this.dateWiseSales[index];
            this.lineChartLabels.push(element.date);
            this.lineChartData[0].data.push(parseInt(element.finalAmtTotal, 10));
          }
          this.isDataAvailable = true;
          // console.log(this.lineChartData);
        }
      } else {
        alert(result.statusText);
      }
    });
    this.timeBarChartData = [
      { data: [], label: 'Sales by time' },
    ];
    this.timeBarChartLabels = [];
    this.dateWiseSalesServices.getTime(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      console.log(result);
      if (result.status) {
        if (result.data !== undefined) {
          _.map(_.range(25), (hourIndex: any) => {
            if (hourIndex === 0) return;
            if (!_.find(result.data, { date: _.padStart(hourIndex, 2, '0')})) {
              result.data.push({
                finalAmtTotal: 0,
                date: _.padStart(hourIndex, 2, '0')
              });
            }
          });
          this.timeWiseSales = _.orderBy(result.data, 'date');
          this.grandTimeTotal = _.sumBy(result.data, 'finalAmnt');
          for (let index = 0; index < this.timeWiseSales.length; index++) {
            const element = this.timeWiseSales[index];
            this.timeBarChartLabels.push(element.date);
            this.timeBarChartData[0].data.push(parseInt(element.finalAmtTotal, 10));
          }
          this.isTimeAvailable = true;
        }
      } else {
        alert(result.statusText);
      }
    });
    this.barChartData = [
      { data: [], label: 'Sales by outlet' },
    ];
    this.barChartLabels = [];
    this.outletWiseSalesServices.getOutlet(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          this.outletWiseSales = _.orderBy(result.data, 'finalAmnt', 'desc');
          this.grandOutletTotal = _.sumBy(result.data, 'finalAmnt');
          for (let index = 0; index < this.outletWiseSales.length; index++) {
            const element = this.outletWiseSales[index];
            this.barChartLabels.push(element._id.substring(0, 5));
            this.barChartData[0].data.push(parseInt(element.finalAmnt, 10));
          }
          this.isDataOutletAvailable = true;
        }
      } else {
        alert(result.statusText);
      }
    });
    this.statsService.getStats(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          this.stats = result.data[0];
        }
      } else {
        alert(result.statusText);
      }
      this.loading = false;
    });
    this.statsService.getHeatMap(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          const heatmapData = result.data;
          const maxIntensity: any = _.max(_.map(heatmapData, 'count'));
          const coords: any = _.map(heatmapData, (addressCord: any) => {
            return {location: new google.maps.LatLng(addressCord._id.lat, addressCord._id.lng), weight: addressCord.count};
          }); // can also be a google.maps.MVCArray with LatLng[] inside 
          
          var gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ]
          this.heatmap = new google.maps.visualization.HeatmapLayer({
            map: this.map,
            data: coords,
            gradient,
            maxIntensity,
            radius: 28,
            opacity: 1,
          });
        }
      } else {
        alert(result.statusText);
      }
      this.loading = false;
    });
  }

  onMapLoad(mapInstance: any) {
    this.map = mapInstance;
  }

  selectedDate(value: any, datepicker?: any) {

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    this.dataPost.dateFrom = new Date(Date.UTC(value.start.year(), value.start.month(), value.start.date(), 0, 0, 0, 0)).toUTCString();
    this.dataPost.dateTo = new Date(Date.UTC(value.end.year(), value.end.month(), value.end.date(), 23, 59, 59, 99)).toUTCString();
    this.onSearch();
  }
  countTotal() {
    this.stats.forEach((e: any) => {
      this.sOrderCount = this.sOrderCount + Number(e.count);
    });
    return this.sOrderCount;
  }
}
