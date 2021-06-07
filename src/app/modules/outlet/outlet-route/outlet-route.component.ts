import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { FirestoreService } from '../../../core/firestore.service';
import { AuthService } from '../../../core/auth.service';
import { AdminSettingFirePath } from '../../firestore.path';

@Component({
	selector: 'outlet-outlet-route',
	templateUrl: './outlet-route.component.html',
	styleUrls: [ './outlet-route.component.css' ]
})
export class OutletRouteComponent implements AfterViewInit, OnInit {
	outletID: string | null;
	outletList: any;
	outletIDSelect: any;
  showMobileMenu: boolean;
  disableSelection: boolean = false;
  showDeliZone: boolean = false;
  showOutletAdmin: boolean = false;
	constructor(
		private router: Router,
		public auth: AuthService,
		public fireDB: FirestoreService,
		private route: ActivatedRoute
	) {
		this.showMobileMenu = false;
		this.outletIDSelect = [];
		this.auth.user.subscribe((userData: any) => {
			if (this.auth.roleUser === 'subadmin') {
        this.disableSelection = true;
			}
		});
	}

	ngOnInit() {
		this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 1].snapshot.paramMap.get('outletid');
		this.fireDB.colWithIds$(`outlets`).subscribe((outletList: any) => {
			this.outletList = outletList;
			this.outletList=this.outletList.sort((a:any, b:any) => a.name.localeCompare(b.name))
		});

    const FbDbSubscribe1 = this.fireDB.doc$(`${AdminSettingFirePath}`).subscribe((adminConfData: any) => {
      this.showDeliZone = _.get(adminConfData, 'showDeliZone', false);
      this.showOutletAdmin = _.get(adminConfData, 'showOutletAdmin', false);
      FbDbSubscribe1.unsubscribe();
    });
	}

	outletChangeRoute() {
		// this.router.navigate([`/outlet/dash/${this.outletIDSelect}/menu`]);
		this.router.navigate([ `/outlet/dash/${this.outletID}/menu-builder` ]);
	}

	ngAfterViewInit() {
		$('.dropdown-toggle').on('click', (event) => {
			$('.dropdown-menu').removeClass('show');
			$(event.target).next().toggleClass('show');
		});
		$('.dropdown-item').on('click', (event) => {
			$('.dropdown-menu').removeClass('show');
		});
		$('.nav-item:not(.dropdown)').on('click', (event) => {
			$('.dropdown-menu').removeClass('show');
		});
	}
}
