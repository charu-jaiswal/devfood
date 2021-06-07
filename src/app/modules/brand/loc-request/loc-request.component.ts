import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../core/firestore.service';
import { LocRequestFirePath, BrandFirePath } from '../../firestore.path';
import * as _ from 'lodash';

declare var google: any;
@Component({
  selector: 'brand-loc-request',
  templateUrl: './loc-request.component.html',
  styleUrls: ['./loc-request.component.css'],
})
export class LocRequestComponent implements OnInit {
  locRequestList: any = [];
  brandLat = 0;
  brandLong = 0;
  private map = null;
  private heatmap = null;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(LocRequestFirePath).subscribe((locRequestData: any) => {
      this.locRequestList = locRequestData;
      const coords: any = _.map(locRequestData, (addressCord: any) => {
        return {location: new google.maps.LatLng(addressCord.address[0].position.lat, addressCord.address[0].position.lng), weight: 1};
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
        maxIntensity: 8,
        radius: 14,
        opacity: 1,
      });
      FbDbSubscribe1.unsubscribe();
    });
    const FbDbSubscribe = this.fireDB.doc$(`${BrandFirePath}`).subscribe((outletData: any) => {
      // render map
      this.brandLat = _.get(outletData, 'address.lat', 0);
      this.brandLong = _.get(outletData, 'address.long', 0);
      FbDbSubscribe.unsubscribe();
    });
  }
  onMapLoad(mapInstance: any) {
    this.map = mapInstance;
  }
  deleteLocRequest(event: Event, locRequestID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${LocRequestFirePath}/${locRequestID}`);
      this.toastr.success('LocRequest Deleted', 'Success!');
    }
    return;
  }

}
