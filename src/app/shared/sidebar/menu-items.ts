import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/reports/main', title: 'Dashboard', class: '', label: '', labelClass: '', extralink: false, submenu: [],
  },
  {
    path: '/outlet/outlets', title: 'Outlet', class: '', label: '', labelClass: '', extralink: false, submenu: [],
  },
  {
    path: '', title: 'Process', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/orders/orders', title: 'Order', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/orders/table-booking', title: 'Table Booking', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/orders/payment', title: 'Payment Pending', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ],
  },
  {
    path: '', title: 'Reports', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/reports/list', title: 'Order Report', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/rating', title: 'Rating and Feedbacks', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/customer-list', title: 'Customer List', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/stats', title: 'Statistics', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/date-wise-sales', title: 'Date Wise Sales', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/outlet-wise-sales', title: 'Outlet Wise Sales', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/driver', title: 'Driver Report', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/driver-order', title: 'Driver Order', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/outlet-commission', title: 'Outlet Commission', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/order-coupon', title: 'Coupon Usage', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/order-user', title: 'User Leaderboard', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/reports/item', title: 'Item Wise Report', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/brand/new-loc/list', title: 'New Location Request', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ],
  },
  {
    path: '/settings/coupons/list', title: 'Promo', class: '', label: '', labelClass: '', extralink: false, submenu: [],
  },
  {
    path: '', title: 'Configurations', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      // { path: '/settings/tax/list', title: 'Tax', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/settings/charge/list', title: 'Charge', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/settings/zone/list', title: 'Zone', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      // { path: '/settings/reward/list', title: 'Reward', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/settings/referral/settings', title: 'Referral', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/settings/wallet/setting', title: 'Wallet', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/brand/push-notification/list', title: 'Push Notification', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ],
  },
  {
    path: '', title: 'Settings', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/brand/brands/setting', title: 'Brand', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '', title: 'Settings', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
          { path: '/brand/global-setting/setting', title: 'Global Settings', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/brand/logic/setting', title: 'Logic Settings', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/brand/notification/list', title: 'Notification', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ],
      },
      {
        path: '', title: 'Design', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
          { path: '/design/ad-banner/list', title: 'Ad Banner', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/design/outlet-category/list', title: 'Outlet Category', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/design/walk-through/list', title: 'Walk Through', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ],
      },
      {
        path: '', title: 'Single Language', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
          { path: '/brand/language/setting', title: 'Customer', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/brand/adminLang/setting', title: 'Admin', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ],
      },
      {
        path: '/brand/multiLang/setting', title: 'Multi Language', class: '', label: '', labelClass: '', extralink: false, submenu: []
      },
      {
        path: '', title: 'Driver', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
          { path: '/brand/driver/list', title: 'Driver List', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/brand/driver/becomeList', title: 'Driver Approval', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ],
      },
      {
        path: '', title: 'Integration', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
          { path: '/brand/integration/setting', title: 'Others', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/brand/payment/setting', title: 'Payment', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ],
      },
    ],
  },
  { path: '/brand/billing/list', title: 'Billing', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
  // { path: '/tutorial/help', title: 'Help', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
];
