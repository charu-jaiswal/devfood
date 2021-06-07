import { EcomPordFirePath } from "app/modules/firestore.path";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { Ecommerce } from "./../ecommerce.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-ecommerce-list",
  templateUrl: "./ecommerce-list.component.html",
  styleUrls: ["./ecommerce-list.component.css"],
})
export class EcommerceListComponent implements OnInit {
  EcommerceList: Observable<Ecommerce[]>;
  constructor(public fireDB: FirestoreService, public toastr: ToastrService) {}

  ngOnInit() {
    this.fireDB.colWithIds$(EcomPordFirePath).subscribe((res: any) => {
      this.EcommerceList = res;
    });
  }
  deleteCharge(event: Event, id: string) {
    const response = confirm("are you sure you want to delete?");
    if (response) {
      this.fireDB.delete(`${EcomPordFirePath}/${id}`);
      this.toastr.success("Ecommerce Deleted", "Success!");
    }
    return;
  }
  disableEcommerce(event: Event, ecommerce: any) {
    let confirmDisable;
    if (!ecommerce.isDisabled) {
      confirmDisable = confirm("are you sure you want to disble?");
    } else {
      confirmDisable = confirm("are you sure you want to enable?");
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${EcomPordFirePath}/${ecommerce.id}`, {
          isDisabled: !ecommerce.isDisabled,
        })
        .then(() => {
          if (!ecommerce.isDisabled) {
            this.toastr.success("Ecommerce Disabled", "Success!");
          } else {
            this.toastr.success("Ecommerce Enabled", "Success!");
          }
        })
        .catch((err: any) => {
          this.toastr.error(err, "Error!");
        });
    }
  }
}
