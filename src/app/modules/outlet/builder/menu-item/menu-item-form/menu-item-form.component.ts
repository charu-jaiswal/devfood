import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../../core/firestore.service';
import { MenuItemFirePath, AddonFirePath, GlobalSettingFirePath, CategoryFirePath, TaxFirePath, MultiLanguageFirePath } from '../../../../firestore.path';
import { MenuItem, SelectFormVal, displayRibbonList } from '../menu-item.model';

@Component({
  selector: 'outlet-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.css'],
})
export class MenuItemFormComponent implements OnInit {
  menuItemID: string | null;
  outletID: string | null;
  menuItem: any;
  uomList: any;
  itemIconsList: any = [];
  categoryList: any;
  taxList: any = [];
  displayRibbonList: SelectFormVal;
  addonList: any;
  imageFile: File | null;
  menuItemListData: any[];
  allMenuItem: any;
  ribbonBgColor = '';
  ribbonColor = '';
  langList: any;
  quillToolbar: any;


  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.menuItem = {};
    this.ribbonBgColor = '#ffffff';
    this.ribbonColor = '#ffffff';
    this.displayRibbonList = displayRibbonList;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.menuItemID = this.route.snapshot.paramMap.get('id');

    console.log(this.menuItemID);
    
    const FbDbSubscribe1 = this.fireDB
      .doc$(`${GlobalSettingFirePath}`)
      .subscribe((globalSetting: any) => {
        if (globalSetting) {
          this.itemIconsList = _.get(globalSetting, 'itemIcons', []);
          if (globalSetting.general.city) {
            this.uomList = _.map(globalSetting.general.uomList, (uom) => ({
              label: uom,
              value: uom,
            }));
          }
        }
        FbDbSubscribe1.unsubscribe();
      });
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`).subscribe((categoryData) => {
      this.categoryList = categoryData;
    });
    // this.fireDB.colWithIds$(`${TaxFirePath}`).subscribe((taxesData) => {
    //   this.taxList = taxesData;
    // });
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${AddonFirePath}`).subscribe((addonData) => {
      this.addonList = addonData;
    });
    if (this.menuItemID) {
      this.fireDB.doc$(`outlets/${this.outletID}/${MenuItemFirePath}/${this.menuItemID}`).subscribe((menuItemData: any) => {
        this.menuItem = menuItemData;
      });
    } else {
      this.menuItem = {
        isDisabled: false
      };
      const newItemCatID = this.route.snapshot.paramMap.get('catID');
      if (newItemCatID) {
        this.menuItem.category = newItemCatID;
      }
    }
    this.quillToolbar = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ align: [] }],
        ['clean', 'image'],
      ],
    };
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.menuItem.lang = this.menuItem.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            desc: {
              name: 'Description',
              lList: []
            },
          };
          _.forIn(this.menuItem.lang, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
          if (_.get(this.menuItem, 'addon.size')) {
            _.forEach(this.menuItem.addon.size, (langField) => {
              _.forEach(this.langList, (lang) => {
                if (!langField.lList) {
                  langField.lList = [];
                }
                if (!_.find(langField.lList, { id: lang.code })) {
                  langField.lList.push({
                    id: lang.code,
                    val: '',
                  });
                }
              });
            });
          }
        }
        FbDbSubscribe0.unsubscribe();
      });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.menuItemID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`outlet/${this.outletID}/menu/${this.menuItemID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.menuItem) {
                this.menuItem.display = this.menuItem.display || {};
                this.menuItem.display.image = imageUrl;
              }
              this.toastr.success('File uploaded', 'Success!');
            });
          }, (reason) => {
            this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
          });
        } else {
          this.imageFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      if (this.menuItemID) {
        this.fireDB.deleteFileStorage(`outlet/${this.outletID}/menu/${this.menuItemID}/original.jpg`);
        if (this.menuItem && this.menuItem.display) {
          this.menuItem.display.image = '';
        }
      } else {
        this.imageFile = null;
      }
    }
  }

  addMoreAddonSizes() {
    if (this.menuItem) {
      console.log("this.menuItem",this.menuItem);
      

      this.menuItem.addon = this.menuItem.addon || {};
      this.menuItem.addon.size = this.menuItem.addon.size || [];
      const newItem: any = {
        name: '',
        price: 0,
        addons: [],
        lList: [],
      };
      _.forEach(this.langList, (lang) => {
        newItem.lList.push({
          id: lang.code,
          val: '',
        });
      });
      this.menuItem.addon.size.push(newItem);
    }
  }

  deleteAddonSize(i: number) {
    if (this.menuItem && this.menuItem.addon && this.menuItem.addon.size) {
      this.menuItem.addon.size.splice(i, 1);
    }
  }

  addMenuItem(menuItemForm: any) {
    // console.log(menuItemForm);
    const value = menuItemForm.form.value.name;
    if (!menuItemForm.invalid) {
      if (menuItemForm.form.value.addon && menuItemForm.form.value.addon.size) {
        menuItemForm.form.value.addon.size = toArray(menuItemForm.form.value.addon.size);
        _.forEach(menuItemForm.form.value.addon.size, (langField) => {
          langField.lList = toArray(langField.lList);
        });
      }
      if (menuItemForm.form.value.lang) {
        _.forIn(menuItemForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.menuItemID) {
        this.fireDB.set(`outlets/${this.outletID}/${MenuItemFirePath}/${this.menuItemID}`, menuItemForm.form.value);
        this.toastr.success('Menu Item Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${MenuItemFirePath}`, menuItemForm.form.value)
          .then((documentRef) => {
            const menuItemID = documentRef.id;
            if (this.imageFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`outlet/${this.outletID}/menu/${menuItemID}/original.jpg`, this.imageFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  const imageUpdateData: any = {};
                  imageUpdateData['display.image'] = imageUrl;
                  documentRef.update(imageUpdateData);
                  this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
                  this.toastr.success('Menu Item Created', 'Success!');
                });
              });
            } else {
              this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
              this.toastr.success('Menu Item Created', 'Success!');
            }
          });
      }
      this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(menuItemForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  onChangeColor(value: any, MenuItemForm: any, type: string) {
    if (type === 'bgColor') {
      MenuItemForm.form.value.display.ribbonBgColor = value;
    } else {
      MenuItemForm.form.value.display.ribbonColor = value;
    }
  }

}
