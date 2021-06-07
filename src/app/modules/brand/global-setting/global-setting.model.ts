export interface GlobalSetting {
  general?: {
    cuisines?: Array<string>;
    tags?: Array<string>;
    outletFilter?: Array<string>;
    city?: Array<string>;
    zoneRadius?: number;
    isPreOrder?: Boolean;
    preOrderDay?: number;
  };
  currency?: {
    currency?: {
      symbol: string;
      name: string;
      symbol_native: string;
      decimal_digits: string;
      rounding: number;
      code: string;
      name_plural: string;
    };
    symbPlace?: string;
    seperator?: string;
    decimal?: number;
  };
  time?: {
    interval?: number;
    zone?: string;
    from?: number;
    to?: number;
  };
  temporaryClosure?: {
    dateFrom?: string;
    dateTo?: string;
    reason?: string;
    apply?: {
      isDelivery?: boolean;
      isPickup?: boolean;
      isTableRes?: boolean;
    };
  };
  seqOrder?: {
    prefix?: string;
    reset?: string; // values and label - day, month, year
    resetMonth?: number; // only if reset is year... label - month name, values - month number
  };
  appearance?: {
    layout?: {
      outlet?: string;
      menu?: string;
    };
    isRTL?: boolean;
    is24Hour?: boolean;
    isAddressRequired?: boolean;
    isHomeOutletName?: boolean;
  };
  itemIcons?: Array<{
    title?: string;
    url?: string;
  }>;
  links?: Array<{
    title?: string;
    icon?: string;
    url?: string;
  }>;
  driverFee?: {
    isDistance?: boolean;
    isTime?: boolean;
    isOrder?: boolean;
    distance?: number;
    time?: number;
    order?: number;
    commissionType?: string;
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: any;
  };
}

export const curSymPlcList: SelectFormVal = [
  { label: 'Before Amount', value: 'Before Amount' },
  { label: 'After Amount', value: 'After Amount' },
];
export const decSepList: SelectFormVal = [
  { label: ',', value: ',' },
  { label: '.', value: '.' },
];

export const timeIntList: SelectFormVal = [
  { label: '15 Min', value: 15 },
  { label: '30 Min', value: 30 },
  { label: '60 Min', value: 60 },
];

export interface DeliverySetup {
  id?: string;
  paths?: any;
  name?: string;
  minCartAmnt?: number;
  minFreeDel?: number;
  deliveryFee?: number;
  deliveryTime?: number;
}
