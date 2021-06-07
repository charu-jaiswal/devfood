export interface Reports {
  address?: {
    coords?: {
      lat: number;
      lon: number;
    };
    locality: string;
    name: string;
    text: string;
  };
  carts?: any;
  created_at?: string;
  driver?: {
    condition?: {
      isAllOutlet: boolean;
      outlets: string;
      driverID: string;
      email: string;
      id: string;
      name: string;
    };
  };
  order_id?: number;
  order_type?: string;
  other?: {
    cusEmail: string;
    cusName: string;
  };
  outletId?: string;
  payment?: string;
  status?: string;
  timeslot?: string;
  total?: {
    amount: number;
    discount_amount: number;
    final_amount: number;
  };
  uid?: string;
}

export const defaultReports = {
  address: {
    coords: {
      lat: 0,
      lon: 0,
    },
    locality: '',
    name: '',
    text: '',
  },
  created_at: '',
  driver: {
    condition: {
      isAllOutlet: false,
      outlets: '',
      driverID: '',
      email: '',
      id: '',
      name: '',
    },
  },
  order_id: 0,
  order_type: '',
  other: {
    cusEmail: '',
    cusName: '',
  },
  outletName: '',
  payment: '',
  status: '',
  timeslot: '',
  total: {
    amount: 0,
    discount_amount: 0,
    final_amount: 1.64765431,
  },
  uid: '',
};

export const listSelectCol = [
  // {
  //   id: 'outlet',
  //   label: 'Outlet',
  //   show: true,
  // },
  {
    id: 'customerName',
    label: 'Customer Name',
    show: true,
  },
  {
    id: 'payment',
    label: 'Payment',
    show: true,
  },
  {
    id: 'type',
    label: 'Type',
    show: true,
  },
  {
    id: 'orderId',
    label: 'Order ID',
    show: true,
  },
  {
    id: 'status',
    label: 'Status',
    show: true,
  },
  {
    id: 'orderTime',
    label: 'Order Time',
    show: true,
  },
  {
    id: 'finalAmt',
    label: 'Total',
    show: true,
  },
  {
    id: 'mobileNo',
    label: 'Mobile No',
    show: true,
  },
  // {
  //   id: 'action',
  //   label: 'Actions',
  //   show: true,
  // },
];

export const ratingCol = [
  {
    id: 'orderTime',
    label: 'Order Time',
    show: true,
  },
  {
    id: 'subtotal',
    label: 'Subtotal',
    show: true,
  },
  {
    id: 'overall',
    label: 'Rating',
    show: true,
  },
  {
    id: 'taste',
    label: 'Taste',
    show: true,
  },
  {
    id: 'quantity',
    label: 'Quantity',
    show: true,
  },
  {
    id: 'packing',
    label: 'Packing',
    show: true,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    show: true,
  },
  {
    id: 'review',
    label: 'Review',
    show: true,
  },
];

export const listCol = [
  // {
  //   id: 'outlet',
  //   label: 'Outlet',
  //   show: true,
  // },
  {
    id: 'type',
    label: 'Type',
    show: true,
  },
  {
    id: 'payment',
    label: 'Payment',
    show: true,
  },
  {
    id: 'orderTime',
    label: 'Order Time',
    show: true,
  },
  {
    id: 'orderId',
    label: 'Order ID',
    show: true,
  },
  {
    id: 'status',
    label: 'Status',
    show: true,
  },
  {
    id: 'subtotal',
    label: 'Subtotal',
    show: true,
  },
  {
    id: 'discountAmt',
    label: 'Discount Amount',
    show: true,
  },

  {
    id: 'tax',
    label: 'Tax',
    show: true,
  },
  {
    id: 'charge',
    label: 'Charge',
    show: true,
  },
  {
    id: 'packingFee',
    label: 'Packing Fee',
    show: true,
  },
  {
    id: 'deliveryFee',
    label: 'Delivery Fee',
    show: true,
  },
  {
    id: 'roundOff',
    label: 'Round Off',
    show: true,
  },
  {
    id: 'total',
    label: 'Total',
    show: true,
  },
  {
    id: 'walletUse',
    label: 'Wallet Use',
    show: true,
  },
  {
    id: 'tips',
    label: 'Tips',
    show: true,
  },
    {
    id: 'finalAmt',
    label: 'Final Amount',
    show: true,
  },
  {
    id: 'cardFee',
    label: 'Card Fee',
    show: true,
  },
  {
    id: 'finalPay',
    label: 'Final Payable',
    show: true,
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    show: true,
  },
  {
    id: 'addressName',
    label: 'Address Name',
    show: true,
  },
  {
    id: 'addressStreet',
    label: 'Address Street',
    show: true,
  },
  {
    id: 'mobileNo',
    label: 'Mobile No',
    show: true,
  },
  {
    id: 'driverName',
    label: 'Driver Name',
    show: true,
  },
  {
    id: 'itemCashback',
    label: 'Item Cashback',
    show: true,
  },
  {
    id: 'couponCashback',
    label: 'Coupon Cashback',
    show: true,
  },
  {
    id: 'couponCode',
    label: 'Coupon Code',
    show: true,
  },
  {
    id: 'overallRating',
    label: 'Overall Rating',
    show: true,
  },
   // {
  //   id: 'action',
  //   label: 'Actions',
  //   show: true,
  // },
];
