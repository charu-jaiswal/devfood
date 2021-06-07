import { filter } from "lodash";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { Component, OnInit } from "@angular/core";
import { SubAdminFirePath } from "app/modules/firestore.path";
import { toArray } from "lodash";
import * as _ from "lodash";
@Component({
  selector: "app-subadmin-form",
  templateUrl: "./subadmin-form.component.html",
  styleUrls: ["./subadmin-form.component.css"],
})
export class SubadminFormComponent implements OnInit {
  subAdminForm: any;
  subadminID: string | null;
  adminRow: any = [];
  reviewValue: number = 1;
  accessPagesRow: any = [];
  isRole: boolean = false;

  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subadminID = this.route.snapshot.paramMap.get("id");
    this.isEdit(this.subadminID);
  }
  isEdit = (subadminID: any) => {
    if (subadminID) {
      const FbDbSubscribe2 = this.fireDB
        .doc$(`${SubAdminFirePath}/${subadminID}`)
        .subscribe((res: any) => {
          this.subAdminForm = res;
          FbDbSubscribe2.unsubscribe();
        });
    } else {
      this.subAdminForm = {};
    }
  };
  addSubAdmin(subadminForm: any) {
    if (!subadminForm.invalid) {
      subadminForm.form.value.restaId = "nuuZrDV40RNXrEVoeVSs";
      if (subadminForm.form.value.accesspages) {
        subadminForm.form.value.accesspages = toArray(
          subadminForm.form.value.accesspages
        );
      }
      if (this.subadminID) {
        this.fireDB.set(
          `${SubAdminFirePath}/${this.subadminID}`,
          subadminForm.form.value
        );
        this.toastr.success("subadmin Updated", "Success!");
        this.router.navigate(["/settings/subadmin/list"]);
      } else {
        this.fireDB.add(SubAdminFirePath, subadminForm.form.value);
        this.toastr.success("subadmin Created", "Success!");
        this.router.navigate(["/settings/subadmin/list"]);
      }
    }
  }

  isAdminAdd() {
    if (this.subAdminForm) {
      this.subAdminForm.accesspages = this.subAdminForm.accesspages || [];
      this.subAdminForm.accesspages.push({ accessPages: "" });
    }
  }

  deleteAdmin(index: number) {
    if (this.subAdminForm && this.subAdminForm.accesspages) {
      this.subAdminForm.accesspages.splice(index, 1);
    }
  }
}
