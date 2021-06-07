import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { AuthService } from '../../core/auth.service';
import { FirestoreService } from '../../core/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private auth: AuthService,
    private fireDB: FirestoreService,
  ) { }

  changeOrderStatus(orderID: string, status: string, driver: any) {
    const userUID = _.get(this.auth, 'userAuthState.uid', '');
    const userName = _.get(this.auth, 'userDetail.name', '');
    const orderUpdate: any = {};
    orderUpdate['info.status'] = status;
    orderUpdate['logs'] = this.fireDB.arrayUnion({
      status,
      time: this.fireDB.timestamp,
      uid: userUID,
      name: userName,
    });
    this.fireDB.col('orders').doc(orderID).update(orderUpdate);
    if (driver && driver.id) {
      const driverUpdate: any = {};
      driverUpdate['isDelivering'] = false;
      driverUpdate['lastDeliveryTime'] = new Date();
      driverUpdate['others'] = this.fireDB.deleteField();
      this.fireDB.doc(`setting/user/driver/${driver.id}`).update(driverUpdate);
    }
  }

  changeTableOrderStatus(orderID: string, status: string) {
    const orderUpdate: any = {};
    orderUpdate['info.status'] = status;
    this.fireDB.col('reserve').doc(orderID).update(orderUpdate);
  }

}
