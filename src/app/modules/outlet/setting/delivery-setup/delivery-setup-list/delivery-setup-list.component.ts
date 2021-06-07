import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { FirestoreService } from "../../../../../core/firestore.service";
import {
  DeliverySetupFirePath,
  OutletFirePath,
} from "../../../../firestore.path";
import { DeliverySetup } from "../delivery-setup.model";
import { filter } from "lodash";

@Component({
  selector: "setting-delivery-setup-list",
  templateUrl: "./delivery-setup-list.component.html",
  styleUrls: ["./delivery-setup-list.component.css"],
})
export class DeliverySetupListComponent implements OnInit {
  deliverySetupList: Observable<DeliverySetup[]>;
  outletID: string | null;
  closeResult: string;
  outletList: any = [];
  OutletModel: any = "";
  deliZone: Observable<DeliverySetup[]>;

  delzoneID: string | null;
  modalRef: Promise<void>;
  DeliveryForm: any;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    public fireDB: FirestoreService,
    private route: ActivatedRoute,
    public toastr: ToastrService,

    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[
      this.route.pathFromRoot.length - 3
    ].snapshot.paramMap.get("outletid");

    this.GetDeliverZone();

    this.fireDB.colWithIds$(`outlets`).subscribe((outletData: any) => {
      //#Region removing current visited outlet from list
      const data = outletData.filter((outlet: any) => {
        return outlet.id != this.outletID;
      });
      this.outletList = data;
      this.outletList = this.outletList.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      ); // sorting alphaberticle order
    });
    ////#endregion
  }

  GetDeliverZone = () => {
    this.deliverySetupList = this.fireDB.colWithIds$(
      `outlets/${this.outletID}/${DeliverySetupFirePath}`
    );
  };

  openModal(content: any) {
    this.modalRef = this.modalService
      .open(content, {
        size: "sm",
      })
      .result.then((result: any) => {});
  }

  deleteDeliverySetup(DeliverySetupID: string) {
    const response = confirm("are you sure you want to delete?");
    if (response) {
      this.fireDB.delete(
        `outlets/${this.outletID}/${DeliverySetupFirePath}/${DeliverySetupID}`
      );
      this.toastr.success(" Deleted", "Success!");
    }
    return;
  }
  closeModal() {
    this.activeModal.dismiss(this.modalRef);
  }

  copyDeliZone(deliveryForm: any) {
    if (!deliveryForm.invalid) {
      let dropdownoutletId = deliveryForm.form.value.outlets;
      if (dropdownoutletId) {
        let currentOutletdelizone: any = [];
        this.fireDB
          .colWithIds$(`outlets/${this.outletID}/${DeliverySetupFirePath}`)
          .subscribe((delizone: any) => {
            currentOutletdelizone = delizone;
          });

        const conf = confirm(`Are you want to duplicate?`);
        if (conf) {
          this.fireDB
            .colWithIds$(`outlets/${dropdownoutletId}/${DeliverySetupFirePath}`)
            .subscribe((res: any) => {
              //Getting delizone data fraom drop down selected outlet
              const filterdata: any = res.filter((x: any) => delete x.id); // deleting old id from data

              filterdata.filter((x: any) => {
                let isExistDeliZone: any = currentOutletdelizone.some(
                  (ischeckname: any) => {
                    //checking name existing in current zone or not
                    return ischeckname.name == x.name;
                  }
                );

                if (isExistDeliZone === false) {
                  this.fireDB
                    .col(`outlets/${this.outletID}/${DeliverySetupFirePath}`)
                    .add(x);
                }
              });
            });
          this.GetDeliverZone();
        }
      }
    }
  }
}
