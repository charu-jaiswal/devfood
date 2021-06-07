interface Word {
  id?: string;
  key?: string;
  val?: string;
  isRTL?: boolean;
}

export interface Language {
  isRTL?: boolean;
  lang?: Array<{
    name?: string;
    id?: string;
    words?: Array<Word>;
  }>;
}

export const defaultLang = {
  lang: [
    {
      name: 'List 1',
      id: 'list',
      words: [
        {
          id: 'LIVE_ORDERS',
          key: 'LIVE ORDERS',
          val: 'LIVE ORDERS',
        },
        {
          id: 'ORDER_HISTORY',
          key: 'ORDER HISTORY',
          val: 'ORDER HISTORY',
        },
        {
          id: 'TABLE_BOOKING',
          key: 'TABLE BOOKING',
          val: 'TABLE BOOKING',
        },
        {
          id: 'MANAGE_OUTLET',
          key: 'MANAGE OUTLET',
          val: 'MANAGE OUTLET',
        },
        {
          id: 'DRIVERS',
          key: 'DRIVERS',
          val: 'DRIVERS',
        },
        {
          id: 'LOGOUT',
          key: 'LOGOUT',
          val: 'LOGOUT',
        },
        {
          id: 'ADMIN',
          key: 'ADMIN',
          val: 'ADMIN',
        },
        {
          id: 'SIGNING_OUT',
          key: 'Signing Out...',
          val: 'Signing Out...',
        },
        {
          id: 'SUCCESSFULLY_LOGOUT',
          key: 'Successfully Logged Out',
          val: 'Successfully Logged Out',
        },
        {
          id: 'CHOOSE_DRIVER',
          key: 'CHOOSE DRIVER',
          val: 'CHOOSE DRIVER',
        },
        {
          id: 'BUSY',
          key: 'BUSY',
          val: 'BUSY',
        },
        {
          id: 'LAST_DELIVERY',
          key: 'LAST DELIVERY',
          val: 'LAST DELIVERY',
        },
        {
          id: 'CLOSE',
          key: 'CLOSE',
          val: 'CLOSE',
        },
        {
          id: 'ERROR',
          key: 'ERROR',
          val: 'ERROR',
        },
        {
          id: 'PLEASE_SELECT_THE_DRIVER',
          key: 'Please Select a driver',
          val: 'Please Select a driver',
        },
        {
          id: 'OK',
          key: 'OK',
          val: 'OK',
        },
        {
          id: 'DRIVER_LIST',
          key: 'DRIVER LIST',
          val: 'DRIVER LIST',
        },
        {
          id: 'LAST_DELIVERY',
          key: 'LAST DELIVERY',
          val: 'LAST DELIVERY',
        },
        {
          id: 'LAST_LOCATION',
          key: 'LAST LOCATION',
          val: 'LAST LOCATION',
        },
        {
          id: 'CALL',
          key: 'CALL',
          val: 'CALL',
        },
        {
          id: 'USER_NAME',
          key: 'USER NAME',
          val: 'USER NAME',
        },
        {
          id: 'MOBILE',
          key: 'MOBILE',
          val: 'MOBILE',
        },
        {
          id: 'NAME',
          key: 'NAME',
          val: 'NAME',
        },
        {
          id: 'LAST_LOCATION_TIME',
          key: 'Last Location Time',
          val: 'Last Location Time',
        },
        {
          id: 'HOME',
          key: 'HOME',
          val: 'HOME',
        },
        {
          id: 'NEW',
          key: 'NEW',
          val: 'NEW',
        },
        {
          id: 'INPROGRESS',
          key: 'INPROGRESS',
          val: 'INPROGRESS',
        },
        {
          id: 'READY',
          key: 'READY',
          val: 'READY',
        },
        {
          id: 'ORDER_ASSIGNED_TO',
          key: 'Order Assigned To',
          val: 'Order Assigned To',
        },
        {
          id: 'DRIVER_ACCEPTED',
          key: 'DRIVER ACCEPTED',
          val: 'DRIVER ACCEPTED',
        },
        {
          id: 'OTP',
          key: 'OTP',
          val: 'OTP',
        },
        {
          id: 'ORDER_PICKED_UP_BY',
          key: 'Order Picked Up By',
          val: 'Order Picked Up By',
        },
        {
          id: 'ACCEPT',
          key: 'ACCEPT',
          val: 'ACCEPT',
        },
        {
          id: 'REJECT',
          key: 'REJECT',
          val: 'REJECT',
        },
        {
          id: 'ASSIGN_DRIVER',
          key: 'Assign Driver',
          val: 'Assign Driver',
        },
        {
          id: 'OUT_FOR_DELIVERY',
          key: 'Out for Delivery',
          val: 'Out for Delivery',
        },
        {
          id: 'REQUEST_DRIVER',
          key: 'Request Driver',
          val: 'Request Driver',
        },
        {
          id: 'READY_FOR_PICKUP',
          key: 'Ready for Pickup',
          val: 'Ready for Pickup',
        },
        {
          id: 'RE_ASSIGN_DRIVER',
          key: 'Re-Assign Driver',
          val: 'Re-Assign Driver',
        },
        {
          id: 'OUTLET',
          key: 'OUTLET',
          val: 'OUTLET',
        },
        {
          id: 'ENABLE',
          key: 'ENABLE',
          val: 'ENABLE',
        },
        {
          id: 'DISABLE',
          key: 'DISABLE',
          val: 'DISABLE',
        },
        {
          id: 'ORDER_DETAIL',
          key: 'ORDER DETAIL',
          val: 'ORDER DETAIL',
        },
        {
          id: 'STATUS',
          key: 'STATUS',
          val: 'STATUS',
        },
        {
          id: 'TYPE',
          key: 'TYPE',
          val: 'TYPE',
        },
        {
          id: 'PAYMENT',
          key: 'PAYMENT',
          val: 'PAYMENT',
        },
        {
          id: 'AS_SOON_AS_POSSIBLE',
          key: 'As Soon As Possible',
          val: 'As Soon As Possible',
        },
        {
          id: 'ORDERED_TIME',
          key: 'Ordered Time',
          val: 'Ordered Time',
        },
        {
          id: 'ORDER_ID',
          key: 'ORDER ID',
          val: 'ORDER ID',
        },
        {
          id: 'ITEMS',
          key: 'ITEMS',
          val: 'ITEMS',
        },
        {
          id: 'SIZE',
          key: 'SIZE',
          val: 'SIZE',
        },
        {
          id: 'NOTES',
          key: 'NOTES',
          val: 'NOTES',
        },
        {
          id: 'TOTAL',
          key: 'TOTAL',
          val: 'TOTAL',
        },
        {
          id: 'SUBTOTAL',
          key: 'SUBTOTAL',
          val: 'SUBTOTAL',
        },
        {
          id: 'DISCOUNT',
          key: 'DISCOUNT',
          val: 'DISCOUNT',
        },
        {
          id: 'PACKING_FEE',
          key: 'PACKING FEE',
          val: 'PACKING FEE',
        },
        {
          id: 'DELIVERY_FEE',
          key: 'DELIVERY FEE',
          val: 'DELIVERY FEE',
        },
        {
          id: 'EXPRESS_DELIVERY_FEE',
          key: 'EXPRESS DELIVERY FEE',
          val: 'EXPRESS DELIVERY FEE',
        },
        {
          id: 'ROUND_OFF',
          key: 'ROUND OFF',
          val: 'ROUND OFF',
        },
        {
          id: 'TOTAL',
          key: 'TOTAL',
          val: 'TOTAL',
        },
        {
          id: 'WALLET_USED',
          key: 'WALLET USED',
          val: 'WALLET USED',
        },
        {
          id: 'TIPS',
          key: 'TIPS',
          val: 'TIPS',
        },
        {
          id: 'FINAL_AMOUNT',
          key: 'FINAL AMOUNT',
          val: 'FINAL AMOUNT',
        },
        {
          id: 'CARD_FEE',
          key: 'CARD FEE',
          val: 'CARD FEE',
        },
        {
          id: 'FINAL_PAY',
          key: 'FINAL PAYABLE',
          val: 'FINAL PAYABLE',
        },
        {
          id: 'CASHBACK',
          key: 'CASHBACK',
          val: 'CASHBACK',
        },
        {
          id: 'COUPON_CASHBACK',
          key: 'COUPON CASHBACK',
          val: 'COUPON CASHBACK',
        },
        {
          id: 'REFERRAL',
          key: 'REFERRAL',
          val: 'REFERRAL',
        },
        {
          id: 'COUPON',
          key: 'COUPON',
          val: 'COUPON',
        },
        {
          id: 'CUSTOMER_DETAIL',
          key: 'CUSTOMER DETAIL',
          val: 'CUSTOMER DETAIL',
        },
        {
          id: 'LANDMARK',
          key: 'LANDMARK',
          val: 'LANDMARK',
        },
        {
          id: 'PHONE',
          key: 'PHONE',
          val: 'PHONE',
        },
        {
          id: 'NAVIGATE',
          key: 'NAVIGATE',
          val: 'NAVIGATE',
        },
        {
          id: 'RATING',
          key: 'RATING',
          val: 'RATING',
        },
        {
          id: 'OVERALL',
          key: 'OVERALL',
          val: 'OVERALL',
        },
        {
          id: 'TASTE',
          key: 'TASTE',
          val: 'TASTE',
        },
        {
          id: 'QUANTITY',
          key: 'QUANTITY',
          val: 'QUANTITY',
        },
        {
          id: 'PACKING',
          key: 'PACKING',
          val: 'PACKING',
        },
        {
          id: 'DELIVERY',
          key: 'DELIVERY',
          val: 'DELIVERY',
        },
        {
          id: 'REVIEW',
          key: 'REVIEW',
          val: 'REVIEW',
        },
        {
          id: 'OTHER_DETAIL',
          key: 'OTHER DETAIL',
          val: 'OTHER DETAIL',
        },
        {
          id: 'DRIVER',
          key: 'DRIVER',
          val: 'DRIVER',
        },
        {
          id: 'LOGS',
          key: 'LOGS',
          val: 'LOGS',
        },
        {
          id: 'USER',
          key: 'USER',
          val: 'USER',
        },
        {
          id: 'TOTAL_TIME',
          key: 'TOTAL TIME',
          val: 'TOTAL TIME',
        },
        {
          id: 'DELIVERED',
          key: 'DELIVERED',
          val: 'DELIVERED',
        },
        {
          id: 'DATE',
          key: 'DATE',
          val: 'DATE',
        },
        {
          id: 'CANCELLED',
          key: 'CANCELLED',
          val: 'CANCELLED',
        },
        {
          id: 'OTHERS',
          key: 'OTHERS',
          val: 'OTHERS',
        },
        {
          id: 'PENDING',
          key: 'PENDING',
          val: 'PENDING',
        },
        {
          id: 'APPROVED',
          key: 'APPROVED',
          val: 'APPROVED',
        },
        {
          id: 'BECOME_A_DRIVER',
          key: 'BECOME A DRIVER',
          val: 'BECOME A DRIVER',
        },
        {
          id: 'E_MAIL',
          key: 'E-MAIL',
          val: 'E-MAIL',
        },
        {
          id: 'PASSWORD',
          key: 'PASSWORD',
          val: 'PASSWORD',
        },
        {
          id: 'CONFIRM_PASSWORD',
          key: 'CONFIRM PASSWORD',
          val: 'CONFIRM PASSWORD',
        },
        {
          id: 'MOBILE_NO',
          key: 'MOBILE NO',
          val: 'MOBILE NO',
        },
        {
          id: 'VEHICLE_NO',
          key: 'VEHICLE NO',
          val: 'VEHICLE NO',
        },
        {
          id: 'LOGIN',
          key: 'LOGIN',
          val: 'LOGIN',
        },
        {
          id: 'ALL_FIELDS_ARE_REQUIRED',
          key: 'All fields are required.',
          val: 'All fields are required.',
        },
        {
          id: 'PASSWORD_SHOULD_BE_MIN_6',
          key: 'Password Should be Minimum 6 Character',
          val: 'Password Should be Minimum 6 Character',
        },
        {
          id: 'PASSWORD_DOESNT_MATCH',
          key: 'Password does not match.',
          val: 'Password does not match.',
        },
        {
          id: 'INVALID_EMAIL',
          key: 'Invalid Email',
          val: 'Invalid Email',
        },
        {
          id: 'PLEASE_WAIT',
          key: 'Please Wait..',
          val: 'Please Wait..',
        },
        {
          id: 'THANKS_FOR_YOUR_REQUEST',
          key: 'Thanks for your request.',
          val: 'Thanks for your request.',
        },
        {
          id: 'RETRY_AGAIN',
          key: 'Try Again',
          val: 'Try Again',
        },
        {
          id: 'SUCCESSFULLY_SEND_THE_PASSWORD',
          key: 'Password sent successfully',
          val: 'Password sent successfully',
        },
        {
          id: 'RESTAURANT',
          key: 'RESTAURANT',
          val: 'RESTAURANT',
        },
        {
          id: 'SIGNING_IN',
          key: 'Signing In..',
          val: 'Signing In..',
        },
        {
          id: 'SUCCESSFULLY_LOGIN',
          key: 'Login Successful',
          val: 'Login Successful',
        },
        {
          id: 'CALL_SUPPORT',
          key: 'Call Support',
          val: 'Call Support',
        },
        {
          id: 'GO_OFFLINE',
          key: 'GO OFFLINE',
          val: 'GO OFFLINE',
        },
        {
          id: 'GO_ONLINE',
          key: 'GO ONLINE',
          val: 'GO ONLINE',
        },
        {
          id: 'YOU_ARE_OFFLINE_NOW',
          key: 'YOU ARE OFFLINE NOW',
          val: 'YOU ARE OFFLINE NOW',
        },
        {
          id: 'NEW_INCOMING_ORDERS',
          key: 'NEW INCOMING ORDERS',
          val: 'NEW INCOMING ORDERS',
        },
        {
          id: 'CUSTOMER_LOCATION',
          key: 'Customer Location',
          val: 'Customer Location',
        },
        {
          id: 'IGNORE',
          key: 'IGNORE',
          val: 'IGNORE',
        },
        {
          id: 'PICKED_UP',
          key: 'PICKED UP',
          val: 'PICKED UP',
        },
        {
          id: 'FROM_MANAGER',
          key: 'From Manager',
          val: 'From Manager',
        },
        {
          id: 'ENTER_THE_OTP_FROM_THE_MANAGER_APP',
          key: 'Enter the OTP from the Manager App',
          val: 'Enter the OTP from the Manager App',
        },
        {
          id: 'CANCEL',
          key: 'CANCEL',
          val: 'CANCEL',
        },
        {
          id: 'CONFIRM',
          key: 'CONFIRM',
          val: 'CONFIRM',
        },
        {
          id: 'INVALID_OTP',
          key: 'INVALID OTP',
          val: 'INVALID OTP',
        },
        {
          id: 'PLEASE_ENTER_THE_VALID_OTP',
          key: 'Please enter the correct OTP',
          val: 'Please enter the correct OTP',
        },
        {
          id: 'FROM_CUSTOMER',
          key: 'From Customer',
          val: 'Order History',
        },
        {
          id: 'ENTER_THE_OTP_FROM_THE_CUSTOMER_APP',
          key: 'Enter the OTP from the Customer App',
          val: 'Enter the OTP from the Customer App',
        },
        {
          id: 'TIME',
          key: 'TIME',
          val: 'TIME',
        },
        {
          id: 'ITEM_CASHBACK',
          key: 'ITEM CASHBACK',
          val: 'ITEM CASHBACK',
        },
        {
          id: 'DRIVERS_MAP',
          key: 'DRIVERS MAP',
          val: 'DRIVERS MAP',
        },
        {
          id: 'MANAGE_ITEM',
          key: 'MANAGE ITEM',
          val: 'MANAGE ITEM',
        },
        {
          id: 'GO_LIVE',
          key: 'GO LIVE',
          val: 'GO LIVE',
        },
        {
          id: 'FORGOT_PASSWORD',
          key: 'FORGOT PASSWORD',
          val: 'FORGOT PASSWORD',
        },
        {
          id: 'CHOOSE_LANGUAGE_TITLE',
          key: 'Choose Language',
          val: 'Choose Language',
        },
        {
          id: 'CHOOSE_LANGUAGE_BTN',
          key: 'Change Language',
          val: 'Change Language',
        },
        {
          id: 'USER_CHANGE_LANGUAGE',
          key: 'Change Language',
          val: 'Change Language',
        },
        {
          id: 'PLEASE_CHOOSE_LANGUAGE',
          key: 'Choose the language.',
          val: 'Choose the language.',
        },
        {
          id: 'PLEASE_CHOOSE_LANGUAGE_TEXT',
          key: 'You need to choose the language to proceed.',
          val: 'You need to choose the language to proceed.',
        },
        {
          id: 'ORD_PLACED',
          key: 'Order Placed',
          val: 'Order Placed',
        },
        {
          id: 'PROCESSING',
          key: 'Processing',
          val: 'Processing',
        },
        {
          id: 'RDY_PICKUP',
          key: 'Ready For Pickup',
          val: 'Ready For Pickup',
        },
        {
          id: 'RDY_DELIVERY',
          key: 'Ready For Delivery',
          val: 'Ready For Delivery',
        },
        {
          id: 'PICKED_UP',
          key: 'Picked Up',
          val: 'Picked Up',
        },
        {
          id: 'DELIVERED',
          key: 'Delivered',
          val: 'Delivered',
        },
        {
          id: 'CANCELLED',
          key: 'Cancelled',
          val: 'Cancelled',
        },
        {
          id: 'DELIVERY',
          key: 'Delivery',
          val: 'Delivery',
        },
        {
          id: 'TAKEAWAY',
          key: 'Takeaway',
          val: 'Takeaway',
        },
        {
          id: 'RESET_PASSWORD',
          key: 'Reset Password',
          val: 'Reset Password',
        },
        {
          id: 'UPCOMING_ORDERS',
          key: 'UPCOMING ORDERS',
          val: 'UPCOMING ORDERS',
        },
        {
          id: 'DRIVER_UNASSIGNED',
          key: 'DRIVER UNASSIGNED',
          val: 'DRIVER UNASSIGNED',
        },
        {
          id: 'MANAGE_ADDON',
          key: 'MANAGE ADDON',
          val: 'MANAGE ADDON',
        },
        {
          id: 'DISABLE_ADDON_OPTION',
          key: 'DISABLE ADDON OPTION',
          val: 'DISABLE ADDON OPTION',
        },
        {
          id: 'ITEM_COUNT',
          key: 'Item count',
          val: 'Item count',
        },
        {
          id: 'MINS_LEFT',
          key: 'mins left',
          val: 'mins left',
        },
        {
          id: 'PREP_TIME_MODAL_HEAD',
          key: 'Preparation Time',
          val: 'Preparation Time',
        },
        {
          id: 'PREP_TIME_MODAL_SUB_MSG',
          key: 'Enter the preparation mins for this order.',
          val: 'Enter the preparation mins for this order.',
        },
        {
          id: 'INVALID_MIN',
          key: 'Invalid Minutes',
          val: 'Invalid Minutes',
        },
        {
          id: 'PLEASE_ENTER_THE_VALID_MIN',
          key: 'Please enter the valid Minutes',
          val: 'Please enter the valid Minutes',
        },
        {
          id: 'APP_IF_SOLD_OUT_TITLE',
          key: 'If any item is sold out',
          val: 'If any item is sold out',
        },
        {
          id: 'APP_IF_SOLD_OUT_MERCHANT_RECOMMEND',
          key: 'Go with Merchant Recommendation',
          val: 'Go with Merchant Recommendation',
        },
        {
          id: 'APP_IF_SOLD_OUT_REFUND',
          key: 'Refund for this Item',
          val: 'Refund for this Item',
        },
        {
          id: 'APP_IF_SOLD_OUT_CONTACT_ME',
          key: 'Contact Customer',
          val: 'Contact Customer',
        },
      ],
    },
  ],
};
