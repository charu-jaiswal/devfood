export interface MenuItem {
  id?: string;
  isDisabled?: boolean;
  name?: string;
  category?: string;
  uom?: string;
  ingredient?: Array<string>;
  upsell?: string;
  display?: {
    desc?: string;
    longDesc?: string;
    image?: string;
    video?: string;
    itemIcons?: any;
    serve?: string;
    ribbon?: string;
    sort?: number;
    cashback?: number;
    ribbonBgColor?: string;
    ribbonColor?: string;
  };
  addon?: {
    addons?: Array<string>;
    size?: Array<Row>;
  };
  price?: {
    cost?: number;
    retail?: number;
    price?: number;
    packing?: number;
  };
  stock?: {// give stock.current
    isAdjust: boolean;
    current: number;
    maxQty: number;
  };
  tax?: {
    tax?: Array<string>;
    isNonTax?: boolean;
    isNonDisc?: boolean;
  };
}
interface Row {
  name: string;
  price: number;
  addons: Array<string>;
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}
export const displayRibbonList: SelectFormVal = [
  { label: 'None', value: 'None' },
  { label: 'Best Seller', value: 'Best Seller' },
  { label: 'Chef`s Special', value: 'Chef`s Special' },
  { label: 'Recommended', value: 'Recommended' },
  { label: 'Low Calorie', value: 'Low Calorie' },
  { label: 'Spicy', value: 'Spicy' },
  { label: 'Healthy', value: 'Healthy' },
  { label: 'Trending', value: 'Recommended' },
];
