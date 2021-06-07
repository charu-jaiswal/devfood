import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "../../../../../core/firestore.service";
import {
  DeliverySetupFirePath,
  OutletFirePath,
} from "../../../../firestore.path";
import { DeliverySetup } from "../delivery-setup.model";
import * as _ from "lodash";
import { environment } from "../../../../../../environments/environment";

declare var google: any;
@Component({
  selector: "setting-delivery-setup-form",
  templateUrl: "./delivery-setup-form.component.html",
  styleUrls: ["./delivery-setup-form.component.css"],
})
export class DeliverySetupFormComponent implements OnInit, AfterViewInit {
  deliverySetupID: string | null;
  outletID: string | null;
  deliverySetup: DeliverySetup;
  map: any;
  drawingManager: any;
  circleDistance = null;
  currentOutletdelizone: any = [];
  constructor(
    public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    // Load google maps script after view init
    if (!(<any>window).google) {
      const DSLScript = document.createElement("script");
      DSLScript.src =
        "https://maps.googleapis.com/maps/api/js?libraries=drawing&key=" +
        environment.mapKey; // replace by your API key
      DSLScript.type = "text/javascript";
      document.body.appendChild(DSLScript);
      document.body.removeChild(DSLScript);
    }
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[
      this.route.pathFromRoot.length - 3
    ].snapshot.paramMap.get("outletid");

    this.deliverySetupID = this.route.snapshot.paramMap.get("id");
    this.GetAllDeliveryZone();
    this.map = null;
    const FbDbSubscribe = this.fireDB
      .doc$(`${OutletFirePath}/${this.outletID}`)
      .subscribe((outletData: any) => {
        // render map
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(
            parseFloat(outletData.address.lat),
            parseFloat(outletData.address.long)
          ),
          zoom: 15,
          disableDefaultUI: true,
        });
        // pin maker on map
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            parseFloat(outletData.address.lat),
            parseFloat(outletData.address.long)
          ),
          map: this.map,
          title: "Your restaurant",
        });
        // render tool on map
        this.drawingManager = new google.maps.drawing.DrawingManager({
          // drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ["polygon", "circle"],
          },
        });
        this.drawingManager.setMap(this.map);

        // else {
        if (
          outletData &&
          outletData.address &&
          outletData.address.lat &&
          outletData.address.long
        ) {
          this.deliverySetup = {
            paths: [],
          };
          google.maps.event.addListener(
            this.drawingManager,
            "overlaycomplete",
            (event: any) => {
              // console.log(event);
              // Polygon draw
              const newShape = event.overlay;
              newShape.type = event.type;
              google.maps.event.addListener(newShape, "rightclick", () => {
                // console.log('right click');
                const tmp = confirm(
                  `Are you want to delete this ${newShape.type}?`
                );
                if (tmp) {
                  let deleteIndex: any = null;
                  if (
                    newShape.type === google.maps.drawing.OverlayType.POLYGON
                  ) {
                    const arrayLatLng = event.overlay.getPath().getArray();
                    const processedLatLong: Array<any> = [];
                    arrayLatLng.forEach((geoPoint: any) => {
                      processedLatLong.push({
                        lat: geoPoint.lat(),
                        lng: geoPoint.lng(),
                      });
                    });
                    deleteIndex = _.findIndex(this.deliverySetup.paths, (o) => {
                      return _.isMatch(o, {
                        type: "polygon",
                        path: processedLatLong,
                      });
                    });
                  } else if (
                    event.type === google.maps.drawing.OverlayType.CIRCLE
                  ) {
                    deleteIndex = _.findIndex(this.deliverySetup.paths, (o) => {
                      return _.isMatch(o, {
                        type: "circle",
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
                    processedLatLong.push({
                      lat: geoPoint.lat(),
                      lng: geoPoint.lng(),
                    });
                  });
                  this.deliverySetup.paths.push({
                    type: "polygon",
                    path: processedLatLong,
                  });
                }
              }
              if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                // Circle draw
                this.deliverySetup.paths.push({
                  type: "circle",
                  path: {
                    radius: event.overlay.radius,
                    lat: event.overlay.center.lat(),
                    lng: event.overlay.center.lng(),
                  },
                });
              }
            }
          );
        }
        // }
        FbDbSubscribe.unsubscribe();
      });
  }

  addDeliverySetup(deliverySetupForm: any) {
    // const value = deliverySetupForm.form.value.name;
    if (!deliverySetupForm.invalid) {
      // console.log(deliverySetupForm.form.value);
      if (deliverySetupForm.form.value.paths.length > 0) {
        //Check name exiost or not
        let isExistDeliZone: any = this.currentOutletdelizone.some(
          (ischeckname: any) => {
            //checking name existing in current zone or not
            return ischeckname.name == deliverySetupForm.form.value.name;
          }
        );

        if (isExistDeliZone) {
          this.toastr.error("Name Already Exist!", "Error!");
          return;
        } else {
          if (this.deliverySetupID) {
            this.fireDB.set(
              `outlets/${this.outletID}/${DeliverySetupFirePath}/${this.deliverySetupID}`,
              deliverySetupForm.form.value
            );
            this.toastr.success("Delivery Setup Updated", "Success!");
          } else {
            this.fireDB.add(
              `outlets/${this.outletID}/${DeliverySetupFirePath}`,
              deliverySetupForm.form.value
            );
            this.toastr.success("Delivery Setup Created", "Success!");
          }
          this.router.navigate(["../.."], { relativeTo: this.route });
        }
      } else {
        this.fireDB.validateAllFormFields(deliverySetupForm.form);
        this.toastr.error("Make at least 1 delivery zone!", "Error!");
      }
    } else {
      this.fireDB.validateAllFormFields(deliverySetupForm.form);
      this.toastr.error("Fill up the form correctly!", "Error!");
    }
  }

  GetAllDeliveryZone = () => {
    this.fireDB
      .colWithIds$(`outlets/${this.outletID}/${DeliverySetupFirePath}`)
      .subscribe((delizone: any) => {
        this.currentOutletdelizone = delizone;
      });
  };
}
