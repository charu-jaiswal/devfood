import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { MembershipClubFirePath } from '../../../firestore.path';
import { MembershipClub } from '../membership-club.model';
import { Brand } from './../../../brand/brands/brand.model';
@Component({
  selector: 'bsetting-membership-club-form',
  templateUrl: './membership-club-form.component.html',
  styleUrls: ['./membership-club-form.component.css'],
})
export class MembershipClubFormComponent implements OnInit {
  membershipClub: MembershipClub;
  brand: Brand;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${MembershipClubFirePath}`).subscribe((membershipClubData: MembershipClub) => {
      this.membershipClub = membershipClubData || {};
      FbDbSubscribe.unsubscribe();
    });
  }

  addMembershipClub(membershipClubForm: any) {
    if (!membershipClubForm.invalid) {
      this.fireDB.set(MembershipClubFirePath, membershipClubForm.form.value);
      this.toastr.success('Membership Club Created', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(membershipClubForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
}
