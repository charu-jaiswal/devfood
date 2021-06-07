import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "./../../../../core/firestore.service";
import { Component, OnInit } from "@angular/core";
import { EcomPordFirePath, ChargeFirePath } from "app/modules/firestore.path";
import { toArray, get } from "lodash";

@Component({
  selector: "app-ecommerce-form",
  templateUrl: "./ecommerce-form.component.html",
  styleUrls: ["./ecommerce-form.component.css"],
})
export class EcommerceFormComponent implements OnInit {
  EcommerceForm: any;
  EcommerceID: string | null;
  ecommerceList: any = [];
  isimage: boolean = false;
  daterange: any = {};
  startDate: any = null;
  endDate: any = null;
  imageUrl: any = [];
  imageRow: any = [];
  imageValue: number = 1;
  variantValue: number = 1;
  variantRow: any = [];
  variantSize: any = [];
  variantPrice: any = [];
  reviewValue: number = 1;
  reviewRow: any = [];
  taxList: any = [];

  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fireDB.colWithIds$(ChargeFirePath).subscribe((res: any) => {
      this.taxList = res;
    });
    // this.imageRow.push({ row: 1 });
    this.EcommerceID = this.route.snapshot.paramMap.get("id");

    this.isEdit(this.EcommerceID);
    const today = new Date();
    this.startDate = new Date().toISOString();
    this.endDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        99
      )
    );
  }

  isEdit = (EcommerceID: any) => {
    if (EcommerceID) {
      const FbDbSubscribe2 = this.fireDB
        .doc$(`${EcomPordFirePath}/${EcommerceID}`)
        .subscribe((ecomData: any) => {
          this.EcommerceForm = ecomData;
          this.imageUrl = ecomData.imageUrl;
          FbDbSubscribe2.unsubscribe();
        });
    } else {
      this.EcommerceForm = {};
    }
  };
  addEcommerce(EcommerceForm: any) {
    if (!EcommerceForm.invalid) {
      EcommerceForm.form.value.imageUrl = this.imageUrl;
      EcommerceForm.form.value.review = toArray(
        EcommerceForm.form.value.review
      );
      EcommerceForm.form.value.variant = toArray(
        EcommerceForm.form.value.variant
      );

      if (this.EcommerceID) {
        this.fireDB.set(
          `${EcomPordFirePath}/${this.EcommerceID}`,
          EcommerceForm.form.value
        );
        this.toastr.success("Ecommerce Updated", "Success!");
        this.router.navigate(["/settings/ecommerce/list"]);
      } else {
        console.table(this.EcommerceForm);
        this.fireDB.add(EcomPordFirePath, EcommerceForm.form.value);
        this.toastr.success("ecommerce Created", "Success!");
        this.router.navigate(["/settings/ecommerce/list"]);
      }
    }
  }

  isReviewAdd() {
    if (this.EcommerceForm) {
      this.EcommerceForm.review = this.EcommerceForm.review || [];
      const newItem: any = {
        revName: "",
        rview: "",
        revRating: 0,
        revDate: "",
      };
      this.EcommerceForm.review.push(newItem);
    }
  }

  isVariantAdd() {
    if (this.EcommerceForm) {
      this.EcommerceForm.variant = this.EcommerceForm.variant || [];
      const newItem: any = { disPrice: 0, stdSize: 0 };
      this.EcommerceForm.variant.push(newItem);
    }
  }

  isimageAdd() {
    this.imageValue++;
    this.imageRow.push({ row: this.imageValue });
  }
  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === "image") {
        this.toastr.info("Image uploading..", "Wait!");
        if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            const uploadTask = this.fireDB.uploadFileToStorage(
              `Ecommerce/outlet/original.jpg`,
              event.target.files[i]
            );
            uploadTask.then().then(
              (snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: any) => {
                  this.imageUrl.push({ url: imageUrl });
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
          if (this.imageUrl.length > 0) {
            this.toastr.success("Image uploaded", "Success!");
          }
        }
      }
    }
  }
 
  deleteFile(index: number, type?: string) {
    if (type == "col") {
      if (this.imageUrl.length > 0) {
        this.imageUrl.splice(index, 1);
      }
    } else if (type == "row") {
      if (this.imageRow.length > 1) {
        this.imageRow.splice(index, 1);
      }
    }
  }

  deleteRow(i: number, type: string) {
    if (this.EcommerceForm) {
      if (type == "var" && this.EcommerceForm.variant) {
        this.EcommerceForm.variant.splice(i, 1);
      } else if (type == "rev" && this.EcommerceForm.review)
        this.EcommerceForm.review.splice(i, 1);
    }
  }
}
