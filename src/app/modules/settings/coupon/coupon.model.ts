export interface Coupon {
  id?: string;
  name?: string;
  code?: string;
  dispApp?: boolean;
  desc?: {
    dispName?: string;
    desc?: string;
    image?: string;
  };
  condition?: {
    minCartAmnt?: number;
    maxUsage?: number;
    isOnePerUser?: boolean;
    applyOutlet?: {
      outType?: string;
      singleOutlet?: {
        id?: string;
        applyOn?: string;
        catID?: string;
        item?: Array<string>;
        category?: Array<string>;
      };
      multioutlet?: Array<string>;
    };
    applyType?: {
      isDelivery?: boolean;
      isPickup?: boolean;
      isTableRes?: boolean;
    };
    couponFor?: {
      app?: boolean;
      web?: boolean;
      iOS?: boolean;
      android?: boolean;
    };
    dateFrom: string;
    dateTo: string;
    application?: string;
  };
  happyHrs?: Array<HappyHr>;
  logic?: {
    calcAt?: string;
    type?: string;
    percAmnt?: number;
    fixedAmnt?: number;
    maxPercAmnt?: number;
  };
}

interface HappyHr {
  day: string;
  fromTime: string;
  toTime: string;
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}

export const dayList: SelectFormVal = [
  { label: 'Everyday', value: 'Everyday' },
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];
