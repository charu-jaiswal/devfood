import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  statusList = [{
    value: 'ORD_PLACED',
    label: 'Order Placed',
    table: 'Pending',
    color: 'secondary',
    order: 1,
  }, {
    value: 'PROCESSING',
    label: 'Processing',
    color: 'warning',
    order: 2,
  }, {
    value: 'RDY_PICKUP',
    label: 'Ready For Pickup',
    color: 'dark',
    order: 3,
  }, {
    value: 'RDY_DELIVERY',
    label: 'Ready For Delivery',
    color: 'dark',
    order: 4,
  }, {
    value: 'PICKED_UP',
    label: 'Picked Up',
    color: 'dark',
    order: 5,
  }, {
    value: 'DELIVERED',
    label: 'Delivered',
    color: 'success',
    table: 'Approved',
    order: 6,
  }, {
    value: 'CANCELLED',
    label: 'Cancelled',
    color: 'danger',
    table: 'Cancelled',
    order: 7,
  }];

  transform(value: string, parameter: string = 'label') {
    return _.get(_.find(this.statusList, { value }), parameter);
  }
}
