export interface OrderSetting {
  void?: Array<string>;
  comp?: Array<string>;
  refund?: Array<string>;
  invSequence?: {
    prefix?: string;
    suffix?: string;
    reset?: string;
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}

export const RefundList: SelectFormVal = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Yearly', value: 'Yearly' },
  { label: 'Yearly (Starts March)', value: 'YearMarch' },
];
