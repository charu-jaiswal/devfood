export interface Payment {
  // title?: string;
  // body?: string;
  // image?: string;
  // device?: string;
  payment?: { // checkbox
    cash?: boolean;
    razorpay?: boolean;
    stripe?: boolean;
    paypal?: boolean;
  };
  defaultGateway?: string;
  features?: { // checkbox
    cardFee?: boolean;
    tips?: boolean;
  };
  pymtDetail?: {
    cash?: {
      name?: string;
      desc?: string;
      minAmnt?: number;
      maxAmnt?: number;
      isCash?: boolean;
    };
    cod?: {
      name?: string;
      desc?: string;
      minAmnt?: number;
      maxAmnt?: number;
      isCash?: boolean;
    };
    razorpay?: {
      name?: string;
      desc?: string;
      key?: string;
      minAmnt?: number;
      maxAmnt?: number;
      isCash?: boolean;
      image?: string;
      config?: {
        bizName?: string;
        desc?: string;
        currency?: string;
        color?: string;
      };
    };
    paypal?: {
      name?: string;
      desc?: string;
      key?: string;
      currency?: string;
      convRate?: number;
      minAmnt?: number;
      maxAmnt?: number;
      isCash?: boolean;
      merchantId?: string;
      publicKey?: string;
      privateKey?: string;
    };
    stripe?: {
      name?: string;
      desc?: string;
      key?: string;
      api?: string;
      currency?: string;
      minAmnt?: number;
      maxAmnt?: number;
      isCash?: boolean;
    };
  };
  cardFee?: {
    name?: string;
    perc?: number;
    flat?: number;
  };
  tips?: {
    default?: number;
    type?: string; // Selectbox = 'perc', 'flat',
    tipList?: Array<number>; // Validate to be 1,3,4,6
    perc?: number;
    flat?: number;
  };
}
