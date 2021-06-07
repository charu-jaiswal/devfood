import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { FirestoreService } from "../../../../core/firestore.service";
import {
  AdminSettingFirePath,
  BillingUsagePath,
} from "../../../firestore.path";
import { Admin } from "../admin.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "admin-form",
  templateUrl: "./admin-form.component.html",
  styleUrls: ["./admin-form.component.css"],
})
export class AdminFormComponent implements OnInit {
  admin: any;
  PaymentForm: NgForm;
  adminID: string | null;
  bigIconFile: File | null;
  quillToolbar: any;
  computeUsageList: any = [];
  billUsageList: any;
  adminConfData: any;
  monthList = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  modalRef: Promise<void>;
  amount: number = 0;
  ID: string | null;
  billUsage: any;
  paidAmount: any;
   isDone:boolean=false;
  constructor(
    public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    // testtetst
    const FbDbSubscribe = this.fireDB
      .doc$(`${AdminSettingFirePath}`)
      .subscribe((adminData: any) => {
        this.admin = adminData;
        this.adminConfData = adminData; //charu

        this.updateBillList(); //charu
        FbDbSubscribe.unsubscribe();
      });
    //charu start
    const FbDbSubscribe1 = this.fireDB
      .colWithIds$(BillingUsagePath)
      .subscribe((billUsageData: any) => {
        this.billUsageList = billUsageData;
       
        this.updateBillList();
      });
    //charu end
    this.quillToolbar = {
      toolbar: [
        ["bold", "italic", "underline"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["clean"],
      ],
    };
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === "image") {
        this.toastr.info("File uploading..", "Wait!");
        const uploadTask = this.fireDB.uploadFileToStorage(
          `brand/admin/original.jpg`,
          event.target.files[0]
        );
        uploadTask.then().then(
          (snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.admin.push) {
                if (this.admin.push.adminApp) {
                  this.admin.push.adminApp.appIcon = imageUrl;
                }
              }
              this.toastr.success("File uploaded", "Success!");
            });
          },
          (reason) => {
            this.toastr.error(
              "Invalid image size/format. Please retry with correct image.",
              "Error!"
            );
          }
        );
      }
    }
  }

  deleteFile(type: string) {
    if (type === "image") {
      this.fireDB.deleteFileStorage(`brand/admin/original.jpg`);
      if (this.admin.push) {
        if (this.admin.push.adminApp) {
          this.admin.push.adminApp.appIcon = "";
        }
      }
    }
  }
  uploadFile1(event: any, type: string) {
    if (event && type) {
      if (type === "image") {
        this.toastr.info("File uploading..", "Wait!");
        const uploadTask = this.fireDB.uploadFileToStorage(
          `brand/admin1/original.jpg`,
          event.target.files[0]
        );
        uploadTask.then().then(
          (snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.admin.push) {
                if (this.admin.push.orderApp) {
                  this.admin.push.orderApp.appIcon = imageUrl;
                }
              }
              this.toastr.success("File uploaded", "Success!");
            });
          },
          (reason) => {
            this.toastr.error(
              "Invalid image size/format. Please retry with correct image.",
              "Error!"
            );
          }
        );
      }
    }
  }

  deleteFile1(type: string) {
    if (type === "image") {
      this.fireDB.deleteFileStorage(`brand/admin/original.jpg`);
      if (this.admin.push) {
        if (this.admin.push.orderApp) {
          this.admin.push.orderApp.appIcon = "";
        }
      }
    }
  }

  addAdminForm(AdminForm: any) {
    if (!AdminForm.invalid) {
      this.fireDB.set(AdminSettingFirePath, AdminForm.form.value);
      this.toastr.success("Admin Configurations Saved", "Success!");
    } else {
      this.fireDB.validateAllFormFields(AdminForm.form);
      this.toastr.error("Fill up the form correctly!", "Error!");
    }
  }
  resetDefaultGateway(PaymentForm: any) {
    delete PaymentForm.form.value.defaultGateway;
  }

  addTips(tip: number) {
    if (isNaN(tip)) {
      return false;
    } else {
      return tip;
    }
  }
  //**********CHARU START */

 
  updateBillList() {
    if (this.billUsageList && this.adminConfData) {
      this.computeUsageList = [];

      console.log(this.billUsageList);
      const newList: any = [];
      _.forEach(this.billUsageList, (usageData) => {
        const usageAmount =
          _.get(usageData, "userCount", 0) *
          _.get(this.adminConfData, "billing.smsCost", 0);
        const remainAmount = usageAmount - _.get(usageData, "paid", 0);
        newList.push({
          id: _.get(usageData, "id", ""),
          monthName:
            this.monthList[usageData.id.split("-")[1]] +
            ", " +
            usageData.id.split("-")[0],
          orderCount: _.get(usageData, "orderCount", 0),
          userCount: _.get(usageData, "userCount", 0),
          usageAmount: usageAmount,
          paidAmount: _.get(usageData, "paid", 0),
          remainAmount: remainAmount,
          remainAmountPlus: -remainAmount,
          done: _.get(usageData, "done", false),
        });
        this.computeUsageList = _.orderBy(newList, "id", "desc");
      });
    }
  }
  addAmount() {
    let sum: number = 0;
    
    if (this.billUsage.id) {
      sum = Number(this.paidAmount) + Number(this.amount);
      let obj = {
        // done: true,
        orderCount: this.billUsage.orderCount,
        paid: sum,
        userCount: this.billUsage.userCount,
      };

      let path = `${BillingUsagePath}/${this.billUsage.id}`;

      this.fireDB.set(path, obj);
      this.toastr.success("Amount Updated", "Success!");
      this.amount = 0;
      this.modalService.dismissAll();
    }
  }
  openModal(content: any, billUsage: any) {
    this.billUsage = billUsage;
    this.paidAmount = billUsage.paidAmount;
    this.isDone=billUsage.done;
    this.modalRef = this.modalService

      .open(content, {
        size: "sm",
      })
      .result.then((result: any) => {});
  }
  closeModal() {
    this.activeModal.dismiss(this.modalRef);
  }
  setDone(billUsage: any){
    this.billUsage = billUsage;
    console.log("this.billUsage",this.billUsage);
    console.log("done",this.billUsage.done);
    let obj = {
       done: this.billUsage.done==true ? false : true,
       orderCount: this.billUsage.orderCount,
       paid: this.billUsage.paidAmount,
       userCount: this.billUsage.userCount,
    };

    let path = `${BillingUsagePath}/${this.billUsage.id}`;

    this.fireDB.set(path, obj);
    this.toastr.success("Amount Updated", "Success!");
    

   }
}
