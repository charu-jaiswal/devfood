import { environment } from '../../environments/environment';

const URL_CONFIG = {
  getListOrder: environment.cloudFuncURL + 'getReportAllOrders',
  reSyncMongoDBResta: environment.cloudFuncURL + 'reSyncMongoDBResta',
  searchMenuItemInApp: environment.cloudFuncURL + 'searchMenuItemInApp',
  getStats: environment.cloudFuncURL + 'getReportAggStatistics',
  getoutletWiseSales: environment.cloudFuncURL + 'getReportAggOutlet',
  getDateWiseSales: environment.cloudFuncURL + 'getReportAggDatewise',
  getReportAggTimewise: environment.cloudFuncURL + 'getReportAggTimewise',
  importOutletMenuCSV: environment.cloudFuncURL + 'importOutletMenuItemCSV',
  exportOutletMenuCSV: environment.cloudFuncURL + 'exportOutletMenuItemCSV',
  getDriverData: environment.cloudFuncURL + 'getDriverAggDatewise',
  getUserListData: environment.cloudFuncURL + 'getReportAllUsers',
  getOutletCommission: environment.cloudFuncURL + 'getReportAggOutletOrdType',
  getItemWise: environment.cloudFuncURL + 'getReportAggItem',
  getReportAggUser: environment.cloudFuncURL + 'getReportAggUser',
  getReportAggCoupon: environment.cloudFuncURL + 'getReportAggCoupon',
  getReportAggHeatmap: environment.cloudFuncURL + 'getReportAggHeatmap',
  getReportAllRewardTrans: environment.cloudFuncURL + 'getReportAllRewardTrans',
  getReportAllReward: environment.cloudFuncURL + 'getReportAllReward',
};

// const URL_CONFIG = {
//   getListOrder: 'https://us-central1-test-devfood.cloudfunctions.net/getReportAllOrders',
//   getStats: 'https://us-central1-test-devfood.cloudfunctions.net/getReportAggStatistics',
//   getoutletWiseSales: 'https://us-central1-test-devfood.cloudfunctions.net/getReportAggOutlet',
//   getDateWiseSales: 'https://us-central1-test-devfood.cloudfunctions.net/getReportAggDatewise',
//   importOutletMenuCSV: 'https://us-central1-test-devfood.cloudfunctions.net/importOutletMenuItemCSV',
// };

// const URL_CONFIG = {
//   getListOrder: 'https://localhost:3000/order',
//   getStats: 'https://localhost:3000/getReportAggStatistics',
//   getoutletWiseSales: 'https://localhost:3000/getReportAggOutlet',
// };

export default URL_CONFIG;
