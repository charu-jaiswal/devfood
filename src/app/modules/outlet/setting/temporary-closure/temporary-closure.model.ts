 export interface TemporaryClosure {
  id?: string;
  dateFrom?: string;
  dateTo?: string;
  reason?: string;
  apply?: {
    isDelivery?: boolean;
    isPickup?: boolean;
    isTableRes?: boolean;
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}

export const disableList: SelectFormVal = [
  { label: 'Delivery Only', value: 'Delivery Only' },
  { label: 'Pickup & Delivery', value: 'Pickup & Delivery' },
];
