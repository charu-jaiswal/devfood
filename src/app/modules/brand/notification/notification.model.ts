interface AggregatorVal {
  label: string;
  id: string;
  isSMS: boolean;
  isEmail: boolean;
  isPush: boolean;
  smsText: string;
  emailText: string;
  pushText: string;
  autoCall: boolean;
  phoneCall: number;
}
interface UserVal {
  label: string;
  id: string;
  isSMS: boolean;
  isEmail: boolean;
  smsText: string;
  emailTitle: string;
  emailText: string;
  isPush: boolean;
  pushTitle: string;
  pushText: string;
}

export interface Notification {
  aggregator?: Array<AggregatorVal>;
  owner?: Array<UserVal>;
  driver?: Array<UserVal>;
  user?: Array<UserVal>;
}

export const listTag = [
  {
    id: '[OrderTotal]',
    label: '[OrderTotal]',
  },
  {
    id: '[OrderTime]',
    label: '[OrderTime]',
  },
  {
    id: '[OutletName]',
    label: '[OutletName]',
  },
  {
    id: '[OrderType]',
    label: '[OrderType]',
  },
  {
    id: '[CusName]',
    label: '[CusName]',
  },
  {
    id: '[CusPhone]',
    label: '[CusPhone]',
  },
  {
    id: '[OrderID]',
    label: '[OrderID]',
  },
  {
    id: '[Guests]',
    label: '[Guests]',
  },
];

export const defaultNotification = {
  aggregator: [{
    label: 'On New Order',
    id: 'newOrder',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'New [OrderType] Order at [OutletName] - [OrderID]',
    pushTitle: '🥡☝️ New [OrderType] Order 😄👍',
    smsText: 'A new [OrderType] order has been placed for [OrderTotal] at [OutletName] for [OrderTime].',
    emailText: 'A new [OrderType] order has been placed for [OrderTotal] at [OutletName] for [OrderTime].',
    pushText: 'Order placed for [OutletName] for [OrderTotal]. Time :  [OrderTime].',
  },
  {
    label: 'On New Table Reservation',
    id: 'newTable',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'New Table Reservation at [OutletName] - [OrderID]',
    pushTitle: '🍽️🎉 New Table Reservation 😄👍',
    smsText: 'A new Table Reservation for [Guests] at [OutletName] for [OrderTime]. Call [CusPhone] ([CusName]).',
    emailText: 'A new Table Reservation for [Guests] at [OutletName] for [OrderTime].',
    pushText: 'A new Table Reservation at [OutletName] for [Guests] at [OrderTime].',
  },
  {
    label: 'If Feedback Receive',
    id: 'feedbackRece',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: '[OrderType] Order Feedback - [OrderID]',
    pushTitle: '⭐⭐ [OrderType] Order Feedback ⭐⭐',
    smsText: 'A customer has provided feedback on a recent order received at [OutletName].',
    emailText: 'A customer has provided feedback on a recent order received at [OutletName].',
    pushText: 'Feedback received for the order from [OutletName] - [OrderID]. Review Feedback from Dashboard.',
  }],
  owner: [{
    label: 'On New Order',
    id: 'newOrder',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'New [OrderType] Order - [OrderID]',
    pushTitle: '🥡☝️  New [OrderType] Order - [OrderID] 😄👍',
    smsText: 'A new [OrderType] order has been placed for [OrderTotal] at your restaurant for [OrderTime].',
    emailText: 'A new [OrderType] order has been placed for [OrderTotal] at your restaurant for [OrderTime].',
    pushText: 'Order Value : [OrderTotal]. Time : [OrderTime]. Accept/ Reject Immediately',
  },
  {
    label: 'On New Table Reservation',
    id: 'newTable',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'New Table Reservation - [OrderID]',
    pushTitle: '🍽️🎉 New Table Reservation 😄👍',
    smsText: 'A new Table Reservation for [Guests]. Seating Time : [OrderTime].Call [CusPhone] ([CusName]).',
    emailText: 'A new Table Reservation for [Guests]. Seating Time : [OrderTime].',
    pushText: 'A new Table Reservation for [Guests] at [OrderTime]. Accept/ Reject Immediately',
  },
  {
    label: 'If Feedback Receive',
    id: 'feedbackRece',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: '[OrderType] Order Feedback - [OrderID]',
    pushTitle: '⭐⭐[OrderType] Order Feedback⭐⭐',
    smsText: 'A customer has provided feedback on a recent order from your restaurant. Review Feedback from Dashboard.',
    emailText: 'A customer has provided feedback on a recent order from your restaurant. Review Feedback from Dashboard.',
    pushText: 'Feedback received for a recent order [OrderID] . Review Feedback from Dashboard..',
  }],
  driver: [{
    label: 'On Order Assigned',
    id: 'onOrderAssigned',
    isSMS: false,
    isEmail: false,
    isPush: true,
    emailTitle: 'New [OrderType] Order assigned to you - [OrderID]',
    pushTitle: '🥡☝️  New [OrderType] Order assigned to you - [OrderID] 😄👍',
    smsText: 'A new [OrderType] order has been assigned to you for [OrderTime].',
    emailText: 'A new [OrderType] order has been assigned to you for [OrderTime].',
    pushText: 'A new [OrderType] order has been assigned to you - [OrderID]. Accept/ Reject Immediately',
  }],
  user: [{
    label: 'When Order is Accepted', // 0
    id: 'orderAccepted',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'Your [OrderType] order has been accepted - [OrderID]',
    pushTitle: '🥡🎉✔️ Order Accepted 😄💃🕺',
    smsText: 'Your [OrderType] has been accepted by the [OutletName] for [OrderTime]. You can track your order from the app.',
    emailText: 'Your [OrderType] has been accepted by the [OutletName] for [OrderTime]. You can track your order from the app.',
    pushText: 'Your [OrderType] order has been accepted - [OrderID]. You can track your order\'s live status from our app.',
  }, {
    label: 'When Order is Rejected', // 1
    id: 'orderRejected',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'Your [OrderType] order has been rejected - [OrderID]',
    pushTitle: '🥡 Order Rejected 😢👎',
    smsText: 'Oops. The recent order your placed on our app has been rejected by restaurant.',
    emailText: 'Oops. The recent order your placed on our app has been rejected by restaurant.',
    pushText: 'Oops. The recent order your placed on our app has been rejected by restaurant.',
  }, {
    label: 'When Order is Out for Delivery', // 2
    id: 'outForDel',
    isSMS: false,
    isEmail: false,
    hideEmail: true,
    isPush: true,
    emailTitle: 'Your [OrderType] order is Out for Delivery - [OrderID]',
    pushTitle: '🥡 Your Order is Out for Delivery 🛵 ',
    smsText: 'Your order with [OrderID] has been picked up by our driver and is on the way. You can track driver from the app.',
    emailText: 'Your order with [OrderID] has been picked up by our driver and is on the way. You can track driver from the app.',
    pushText: 'Your order has been picked up by our driver and is on the way. You can track driver from the app.',
  }, {
    label: 'When Order is Ready for Pickup', // 3
    id: 'readyForPickup',
    isSMS: false,
    isEmail: false,
    hideEmail: true,
    isPush: true,
    emailTitle: 'Your [OrderType] order is Ready for Pickup - [OrderID]',
    pushTitle: '🥡 Order is Ready for Pickup ⏱️',
    smsText: 'Your order with [OrderID] is ready for pick up at the [OutletName]. Please pickup the food within the next 20 minutes while its still hot.',
    emailText: 'Your order with [OrderID] is ready for pick up at the [OutletName]. Please pickup the food within the next 20 minutes while its still hot.',
    pushText: 'Your order is ready for pick up at the [OutletName]. Please pickup the food soon.',
  }, {
    label: 'When Order is Delivered, Request Feedback', // 4
    id: 'orderDel',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'Thank You for your Order - [OrderID]',
    pushTitle: '🙏🧾 Thank You for your Order ⭐⭐⭐⭐⭐',
    smsText: 'Thanks for ordering with us. How would you rate our service ? Just open the app and give us your honest feedback.',
    emailText: 'Thanks for ordering with us. How would you rate our service ? Just open the app and give us your honest feedback.',
    pushText: 'How would you rate our service ? Just open the app and give us your honest feedback.',
  },
  {
    label: 'When Table Reservation is Accepted',
    id: 'reservationSuccess',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'Table Reservation Accepted- [OrderID]',
    pushTitle: '🍽️🎉✔️ Table Reserved For [OrderTime] 😄💃🕺',
    smsText: 'Thanks for reserving table at our restaurant. Please be the restaurant atleast 15mins prior to your booking slot.',
    emailText: 'Thanks for reserving table at our restaurant. Please be the restaurant atleast 15mins prior to your booking slot.',
    pushText: 'Please make sure you reach the Outlet atleast 15mins before your time.',
  },
  {
    label: 'When Table Reservation is Rejected',
    id: 'reservationReject',
    isSMS: false,
    isEmail: true,
    isPush: true,
    emailTitle: 'Table Reservation Declined- [OrderID]',
    pushTitle: '🍽️ Table Reservation Declined 👎😢',
    smsText: 'Oops. The recent table reservation you placed on our app has been rejected.',
    emailText: 'Oops. The recent table reservation you placed on our app has been rejected.',
    pushText: 'Oops. The recent table reservation you placed on our app has been rejected.',
  }],
};
