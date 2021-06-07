export interface Addon {
  id?: string;
  name?: string;
  machine?: string;
  desc?: string;
  isMultiChoice?: boolean;
  isDisable?: boolean;
  minChoice?: number;
  maxChoice?: number;
  item?: Array<Row>;
}

interface Row {
  name: string;
  desc?: string;
  price: number;
  isDisable?: boolean;
}
