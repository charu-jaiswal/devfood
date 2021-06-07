import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { ZoneManagmentFirePath } from "./../../../firestore.path";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-zone-manager-list",
  templateUrl: "./zone-manager-list.component.html",
  styleUrls: ["./zone-manager-list.component.css"],
})
export class ZoneManagerListComponent implements OnInit {
  ZoneList: any = [];

  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fireDB.colWithIds$(ZoneManagmentFirePath).subscribe((res: any) => {
      this.ZoneList = res;
      console.log("ZoneList", this.ZoneList);
    });
  }

  disablezone(event: Event, zone: any) {
    let confirmDisable;
    if (!zone.isDisabled) {
      confirmDisable = confirm("are you sure you want to disble?");
    } else {
      confirmDisable = confirm("are you sure you want to enable?");
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${ZoneManagmentFirePath}/${zone.id}`, {
          isDisabled: !zone.isDisabled,
        })
        .then(() => {
          if (!zone.isDisabled) {
            this.toastr.success("zone Disabled", "Success!");
          } else {
            this.toastr.success("zone Enabled", "Success!");
          }
        })
        .catch((err: any) => {
          this.toastr.error(err, "Error!");
        });
    }
  }
  deleteZone(event: Event, id: string) {
    const response = confirm("are you sure you want to delete?");
    if (response) {
      this.fireDB.delete(`${ZoneManagmentFirePath}/${id}`);
      this.toastr.success("Zone Deleted", "Success!");
    }
    return;
  }
}
