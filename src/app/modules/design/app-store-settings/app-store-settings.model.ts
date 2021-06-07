export interface AppStoreSettings {
  name?: string;
  desc?: {
    short?: string;
    long?: string;
  };
  keywords?: Array<string>;
  url?: {
    support?: string;
    privacy?: string;
  };
  login?: {
    android?: {
      gemail?: string;
      gpass?: string;
    };
    ios?: {
      aemail?: string;
      apass?: string;
    };
  };
  screen?: {
    ios?: {
      img1?: string;
      img2?: string;
      img3?: string;
      img4?: string;
      img5?: string;
    };
    android?: {
      img1?: string;
      img2?: string;
      img3?: string;
      img4?: string;
      img5?: string;
    };
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}
