export interface Admin {
  outletLimit?: number;
  isAppDisabled?: boolean;
  isNewLogin?: boolean;
  isDisableLogin?: boolean;
  appShutText?: string;
  isSandwich?: boolean;
  isMultiLang?: boolean;
  adminPass?: string;
  deletePassCode?: string;
  billing?: any;
  isReward?: boolean;
  isEcommerce?:boolean;
  isQuiqup?: boolean;
  isPostStripe?: boolean;
  rewardConv?: number;
  takeRewardConv?: number;
  posRewardConv?: number;
  appVersion?: {
    iosVersionLogic?: string; // Select option = OPTIONAL, NO_CHECK, FORCE
    currentIosVersion?: string;
    androidVersionLogic?: string; // Select option = OPTIONAL, NO_CHECK, FORCE
    currentAndroidVersion?: string;
  };
  googleMap?: {
    android?: string;   // required
    ios?: string;   // required
    web?: string;   // required
    isMapPremium?: boolean;
  };
  adminApp?: {
    hideDriver?: boolean;  // Checkbox
    hideAdmin?: boolean;  // Checkbox
    hideManager?: boolean;  // Checkbox
    hideManAssignDriver?: boolean;
    autoAssignDriver?: boolean;
    driverOTPCust?: boolean;
    driverOTPMngr?: boolean;
    dateFormat?: string;
  };
  orderApp?: {
    showBrandTitle?: boolean;
    showBrandLogo?: boolean;
    hideCancelOrder?: boolean;
    hideCouponProfile?: boolean;
  };
  email?: {
    senderID?: string;  // Email Validation
    senderName?: string;
  };
  push?: {
    googleProjectId?: string;
    adminApp?: {
      appID?: string;
      appKey?: string;
      appIcon?: string; // image upload
    };
    orderApp?: {
      appID?: string;
      appKey?: string;
      appIcon?: string; // image upload
    };
  };
  server?: {
    backendURL?: string; // URL validator
  };
  adminPopup?: {
    adminPopupConf?: boolean;
    closeable?: boolean;
    link?: string; // URL validator
    btnLabel?: string;
    smsText?: string;
  };
}
