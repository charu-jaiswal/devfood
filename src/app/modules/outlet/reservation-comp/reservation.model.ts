export interface Reservation {
  id?: string;
  name?: string;
  desc?: string;
  category?: Array<string>;
  catGroup?: Array<string>;
  sort?: number;
  available?: {
    isDelivery?: boolean;
    isPickup?: boolean;
  };
  opHrs?: Array<OpHr>;
}

export interface OpHr {
  fromTime: string;
  toTime: string;
  day: string;

  maxperson?: number;
  carges?: number;
 
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
