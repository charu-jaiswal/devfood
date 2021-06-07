export interface OutletCategory {
  id?: string;
  title?: string;
  subTitle?: string;
  sort?: number;
  isDisabled?: boolean;
  hideCusineFilter?: boolean;
  image?: string;
  outlets?: Array<string>;
  filters?: Array<string>;
  lang?: any;
}
