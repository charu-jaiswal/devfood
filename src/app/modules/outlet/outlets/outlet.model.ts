export interface Outlet {
  id?: string;
  name?: string;
  sort?: number;
  outletURLID?: string;
  isDisabled?: boolean;
  isDisableInApp?: boolean;
  isHidden?: boolean;
  isCategory?: boolean;
  isIfSoldOut?: boolean;
  isAdultAgree?: boolean;
  isPostDeliTime?: boolean;
  catDefaultImg?: string;
  lang?: any;
  info?: {
    subTitle?: string;
    desc?: string;
    image?: string;
    video?: string;
    textDisplay?: string;
    bgColor?: string;
    textColor?: string;
  };
  postDeliTime?: {
    timeRange?: Array<{
      fromTime?: string;
      toTime?: string;
      price?: number;
      maxOrders?: number;
    }>;
    offsetTime?: number;
    isExpressDeli?: boolean;
    expressDeli?: {
      timeRange?: Array<{
        fromTime?: string;
        toTime?: string;
      }>;
      title?: string;
      price?: number;
    }
  },
  address?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    lat?: number;
    long?: number;
    location?: any;
  };
  contact?: {
    email?: string;
    mobile?: string;
    landLine?: string;
    taxID?: string;
  };
  config?: {
    cuisines?: Array<string>;
    tags?: Array<string>;
    filter?: Array<string>;
    avgCost?: number;
    avgCost1?: string;
    isVeg?: boolean;
    isAlcohol?: boolean;
    isRoundOff?: boolean;
    isPreOrder?: boolean;
    preOrderDay?: number;
    preTime?: number;
    outletRate?: number;
    rating?: number;
    showUnavailableAlert?: boolean;
    unavailableAlert?: string;
  };
  features?: {
    isDelivery?: boolean;
    isPickup?: boolean;
    isTableRes?: boolean;
  };
  opHrs?: Array<OpHr>;
  notify?: {
    sms?: Array<number>;
    email?: Array<string>;
    call?: Array<number>;
  };
  disPayment?: any;
  integration?: any;
  table?: {
    timing?: {
      blockMins?: number;
      prebook?: number;
    };
    charge?: {
      enable?: boolean;
      type?: string;
      amount?: number;
    };
  };
  isCommission?: boolean;
  commission?: {
    isTableRes?: boolean;
    isDelivery?: boolean;
    isTakeAway?: boolean;
    tableRes?: {
      perc?: number;
      flat?: number;
    };
    delivery?: {
      perc?: number;
      flat?: number;
    };
    takeAway?: {
      perc?: number;
      flat?: number;
    };
  };
}

interface OpHr {
  fromTime: string;
  toTime: string;
  day: string;
}
export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}
export const dayList: SelectFormVal = [
  { label: 'Everyday', value: 'Everyday' },
  { label: 'Weekday', value: 'Weekday' },
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];
export const cityList: SelectFormVal = [
  { label: 'New York', value: 'New York' },
  { label: 'Bengluru', value: 'Bengluru' },
  { label: 'Gujrat', value: 'Gujrat' },
  { label: 'Los Angelos', value: 'Los Angelos' },
];
