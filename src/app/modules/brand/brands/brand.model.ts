export interface Brand {
  name?: string;
  isDisabled?: boolean;
  bizModel?: string;
  features?: {
    isPickup?: boolean;
    isDelivery?: boolean;
    isTableRes?: boolean;
    isWallet?: boolean;
    isReferral?: boolean;
    isMembership?: boolean;
  };
  image?: {
    outlet?: string;
    logo?: string;
  };
  address?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: any;
    lat?: number;
    long?: number;
  };
  contact?: {
    email?: string;
    website?: string;
    mobile?: string;
    landline?: string;
    taxID?: string;
  };
  appSettings?: {
    pColor?: string;
    sColor?: string;
    image?: string;
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}
