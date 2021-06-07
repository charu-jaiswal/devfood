import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { Component, OnInit } from "@angular/core";
import { ZoneManagmentFirePath } from "app/modules/firestore.path";

@Component({
  selector: 'app-zone-manager-form',
  templateUrl: './zone-manager-form.component.html',
  styleUrls: ['./zone-manager-form.component.css']
})
export class ZoneManagerFormComponent implements OnInit {

  ZoneID: string | null;
  outletList: any = [];
  zoneManagerForm: any;
  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.fireDB.colWithIds$(`outlets`).subscribe((res: any) => {
      this.outletList = res;
    });
    this.ZoneID = this.route.snapshot.paramMap.get("id");
    this.isEdit(this.ZoneID);
  }
  isEdit = (ZoneID: any) => {
    if (ZoneID) {
      const FbDbSubscribe2 = this.fireDB
        .doc$(`${ZoneManagmentFirePath}/${ZoneID}`)
        .subscribe((zoneData: any) => {
          this.zoneManagerForm = zoneData;
          FbDbSubscribe2.unsubscribe();
        });
    }
  };
  addZone(zoneForm: any) {
    if (!zoneForm.invalid) {
      if (this.ZoneID) {
        this.fireDB.set(
          `${ZoneManagmentFirePath}/${this.ZoneID}`,
          zoneForm.form.value
        );
        this.toastr.success("Zone Manager Updated", "Success!");
        this.router.navigate(["/settings/zonemanager/list"]);
      } else {
        this.fireDB.add(ZoneManagmentFirePath, zoneForm.form.value);
        this.toastr.success("Zone Manager Created", "Success!");
        this.router.navigate(["/settings/zonemanager/list"]);
      }
    }
  }
}
