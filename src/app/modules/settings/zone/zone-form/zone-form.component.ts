import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { ZoneFirePath, BrandFirePath, OutletFirePath } from '../../../firestore.path';
import { Zone } from '../zone.model';
import * as _ from 'lodash';

declare var google: any;
@Component({
  selector: 'setting-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.css'],
})
export class ZoneFormComponent implements OnInit {
  deliverySetupID: string | null;
  deliverySetup: Zone;
  outletList: any = [];
  map: any;
  drawingManager: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.deliverySetupID = this.route.snapshot.paramMap.get('id');
    this.map = null;
    const FbDbSubscribe2 = this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((outletData) => {
      this.outletList = outletData;
        FbDbSubscribe2.unsubscribe();
    });
    const FbDbSubscribe = this.fireDB.doc$(`${BrandFirePath}`).subscribe((outletData: any) => {
      // render map
      const brandLat = _.get(outletData, 'address.lat', 0);
      const brandLong = _.get(outletData, 'address.long', 0);
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(parseFloat(brandLat), parseFloat(brandLong)),
        zoom: 15,
        disableDefaultUI: true
      });
      // pin maker on map
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(brandLat), parseFloat(brandLong)),
        map: this.map,
        title: 'Your restaurant',
      });
      // render tool on map
      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon', 'circle'],
        },
      });
      this.drawingManager.setMap(this.map);
      if (this.deliverySetupID) {
        const FbSubscribe = this.fireDB.doc$(`${ZoneFirePath}/${this.deliverySetupID}`).subscribe((deliverySetupData: Zone) => {
          this.deliverySetup = deliverySetupData;
          // draw zone has been save
          if (deliverySetupData.paths) {
            for (let z = 0; z < deliverySetupData.paths.length; z++) {
              if (!deliverySetupData.paths[z].type) {
                delete this.deliverySetup.paths[z];
              }
              if (deliverySetupData.paths[z] && deliverySetupData.paths[z].type === 'polygon') {
                const boundary = new google.maps.Polygon({
                  paths: deliverySetupData.paths[z].path,
                });
                boundary.addListener('rightclick', () => {
                  // console.log('boundary', boundary);
                  const tmp = confirm('Are you want to delete this boundary?');
                  if (tmp) {
                    boundary.setMap(null);
                    delete this.deliverySetup.paths[z];
                  }
                });
                boundary.setMap(this.map);
              } else if (deliverySetupData.paths[z] && deliverySetupData.paths[z].type === 'circle') {
                const circle = new google.maps.Circle({
                  center: {
                    lat: deliverySetupData.paths[z].path.lat,
                    lng: deliverySetupData.paths[z].path.lng,
                  },
                  radius: deliverySetupData.paths[z].path.radius,
                });
                circle.addListener('rightclick', () => {
                  // console.log('circle', circle);
                  const tmp = confirm('Are you want to delete this circle?');
                  if (tmp) {
                    circle.setMap(null);
                    delete this.deliverySetup.paths[z];
                  }
                });
                circle.setMap(this.map);
              }
            }
          } else {
            deliverySetupData.paths = [];
          }
          FbSubscribe.unsubscribe();
        });
      }
      // else {
        this.deliverySetup = {
          paths: [],
        };
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
          // console.log(event);
          // Polygon draw
          const newShape = event.overlay;
          newShape.type = event.type;
          google.maps.event.addListener(newShape, 'rightclick', () => {
            // console.log('right click');
            const tmp = confirm(`Are you want to delete this ${newShape.type}?`);
            if (tmp) {
              let deleteIndex: any = null;
              if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
                const arrayLatLng = event.overlay.getPath().getArray();
                const processedLatLong: Array<any> = [];
                arrayLatLng.forEach((geoPoint: any) => {
                  processedLatLong.push({ lat: geoPoint.lat(), lng: geoPoint.lng() });
                });
                deleteIndex = _.findIndex(this.deliverySetup.paths, (o: any) => { 
                  return _.isMatch(o, {
                    type: 'polygon',
                    path: processedLatLong,
                  });
                });
              } else if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                deleteIndex = _.findIndex(this.deliverySetup.paths, (o: any) => { 
                  return _.isMatch(o, {
                    type: 'circle',
                    path: {
                      radius: event.overlay.radius,
                      lat: event.overlay.center.lat(),
                      lng: event.overlay.center.lng(),
                    },
                  });
                });
              }
              if (deleteIndex) {
                delete this.deliverySetup.paths[deleteIndex];
              }
              newShape.setMap(null);
            }
          });
          if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            if (this.deliverySetup) {
              const arrayLatLng = event.overlay.getPath().getArray();
              const processedLatLong: Array<any> = [];
              arrayLatLng.forEach((geoPoint: any) => {
                processedLatLong.push({ lat: geoPoint.lat(), lng: geoPoint.lng() });
              });
              this.deliverySetup.paths.push({
                type: 'polygon',
                path: processedLatLong,
              });
            }
          }
          if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
            // Circle draw
            this.deliverySetup.paths.push({
              type: 'circle',
              path: {
                radius: event.overlay.radius,
                lat: event.overlay.center.lat(),
                lng: event.overlay.center.lng(),
              },
            });
          }
        });
      // }
      FbDbSubscribe.unsubscribe();
    });
  }

  addDeliverySetup(deliverySetupForm: any) {
    // const value = deliverySetupForm.form.value.name;
    if (!deliverySetupForm.invalid) {
      // console.log(deliverySetupForm.form.value);
      if (deliverySetupForm.form.value.paths.length > 0) {
        if (this.deliverySetupID) {
          this.fireDB.set(`${ZoneFirePath}/${this.deliverySetupID}`, deliverySetupForm.form.value);
          this.toastr.success('Zone Updated', 'Success!');
        } else {
          this.fireDB.add(`${ZoneFirePath}`, deliverySetupForm.form.value);
          this.toastr.success('Zone Created', 'Success!');
        }
        this.router.navigate(['../../list'], { relativeTo: this.route });
      } else {
        this.fireDB.validateAllFormFields(deliverySetupForm.form);
        this.toastr.error('Make at least 1 delivery zone!', 'Error!');
      }
    } else {
      this.fireDB.validateAllFormFields(deliverySetupForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
