import { Category } from "./../builder/category/category.model";
import { MenuItem } from "./../builder/menu-item/menu-item.model";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "app/core/auth.service";

import { Http } from "@angular/http";

import { FirestoreService } from "./../../../core/firestore.service";
import { LocalStorage } from "ngx-store";
import * as _ from "lodash";
import {
  MenuItemFirePath,
  CategoryFirePath,
  AdminSettingFirePath,
} from "app/modules/firestore.path";
import { toArray } from "lodash";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  searchModalText = "";
  outletID: string | null;
  importOutletCSVFile: File | null = null;
  loading: Boolean = false;
  searchResult: any = [];
  searchLoading = false;
  selCatID: string;
  finalListData: any = [];

  deletePassCode = null;
  categoryList: Category[];
  selected: any = "";
  @ViewChild("uploadCSVInput") uploadCSVInput: ElementRef;
  @LocalStorage() storageCategorySelected: any;
  @Output() onSelectItem = new EventEmitter();
  row: any = -1;
  constructor(
    private router: Router,
    public toastr: ToastrService,
    public auth: AuthService,
    private http: Http,
    private route: ActivatedRoute,
    public fireDB: FirestoreService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split("/")[4] === "menu-builder") {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[
      this.route.pathFromRoot.length - 2
    ].snapshot.paramMap.get("outletid");
    this.fireDB.doc$(AdminSettingFirePath).subscribe((adminConf: any) => {
      this.deletePassCode = adminConf.deletePassCode;
    });

    this.selected = "";
    this.outletID = this.route.pathFromRoot[
      this.route.pathFromRoot.length - 2
    ].snapshot.paramMap.get("outletid");
    this.fireDB
      .colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`)
      .subscribe((response) => {
        this.categoryList = _.orderBy(response, "name", "asc");
        const isCatSelected = this.categoryList.some((category: any) => {
          return this.storageCategorySelected === category.id;
        });
        if (!isCatSelected) {
          this.storageCategorySelected = null;
        }
        if (!this.storageCategorySelected) {
          if (this.categoryList.length > 0) {
            this.selected = this.categoryList[0]["id"];

            this.storageCategorySelected = this.categoryList[0]["id"];
            this.categorySelected({ id: this.selected });
          }
        } else {
          this.selected = this.storageCategorySelected;
          this.categorySelected({ id: this.selected });
        }
      });
  }
  disableMenuItem(event: Event, menuItem: any) {
    const response = confirm("are you sure you want to disable?");
    if (response) {
      this.fireDB.update(
        `outlets/${this.outletID}/${MenuItemFirePath}/${menuItem.id}`,
        {
          isDisabled: !menuItem.isDisabled,
        }
      );
      if (!menuItem.isDisabled) {
        this.toastr.success("Menu Item Disabled", "Success!");
      } else {
        this.toastr.success("Menu Item Enabled", "Success!");
      }
    }
    return;
  }

  changecolor = (i: any) => {
    this.row = i;
    var divID = "div-" + i;
    var element = document.getElementById(divID) as HTMLElement; // getting the current working div innerHtml
    element.classList.add("bg-warning"); // addeding new class in elemnet
  };

  categorySelected(catID: any) {
    this.storageCategorySelected = catID.id;
    this.selected = catID.id;
    if (catID) {
      this.loading = true;
      this.fireDB
        .colWithIds$(
          `outlets/${this.outletID}/${MenuItemFirePath}`,
          (ref: any) => ref.where("category", "==", catID.id)
        )
        .subscribe((menuItemsData: MenuItem[]) => {
          this.loading = false;
          this.selCatID = catID;
          this.finalListData = _.orderBy(
            menuItemsData,
            ["display.sort", "name"],
            ["desc", "asc"]
          );
          this.finalListData.forEach((element: any) => {
            // To Generate Run Time Stock
            // add condition to check stock object exist or not
            if (!element.hasOwnProperty("stock")) {
              element.stock = { current: 0 };
            }
          });
        });
    }
  }

  UpdateData(inventoryForm: any) {
    var data: any = toArray(inventoryForm.form.value.item);
    data.forEach((element: any) => {
      this.fireDB.set(
        `outlets/${this.outletID}/${MenuItemFirePath}/${element.id}`,
        element
      );
    });

    this.toastr.success("Menu Updated", "Success!");
  }
}
