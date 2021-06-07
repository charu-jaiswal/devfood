import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { SubAdminFirePath } from "./../../../firestore.path";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-subadmin-list",
  templateUrl: "./subadmin-list.component.html",
  styleUrls: ["./subadmin-list.component.css"],
})
export class SubadminListComponent implements OnInit {
  subAdminList: any = [];

  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fireDB.colWithIds$(SubAdminFirePath).subscribe((res: any) => {
      this.subAdminList = res;
      console.log("subAdminList", this.subAdminList);
    });
  }
  disableSubAdmin(event: Event, admin: any) {
    let confirmDisable;
    if (!admin.isDisabled) {
      confirmDisable = confirm("are you sure you want to disble?");
    } else {
      confirmDisable = confirm("are you sure you want to enable?");
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${SubAdminFirePath}/${admin.id}`, {
          isDisabled: !admin.isDisabled,
        })
        .then(() => {
          if (!admin.isDisabled) {
            this.toastr.success("admin Disabled", "Success!");
          } else {
            this.toastr.success("admin Enabled", "Success!");
          }
        })
        .catch((err: any) => {
          this.toastr.error(err, "Error!");
        });
    }
  }

  deleteSubAdmin(event: Event, id: string) {
    const response = confirm("are you sure you want to delete?");
    if (response) {
      this.fireDB.delete(`${SubAdminFirePath}/${id}`);
      this.toastr.success("SubAdmin Deleted", "Success!");
    }
    return;
  }
}
