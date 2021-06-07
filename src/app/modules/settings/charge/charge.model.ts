export interface Charge {
  id?: string;
  name?: string;
  dispName?: string;
  desc?: string;
  logic?: {
    type?: string;
    percAmnt?: string;
    fixedAmnt?: string;
  };
  condition?: {
    isAllOutlets?: boolean;
    outlets?: string;
  };
  enableTax?: Boolean;
  tax?: Array<any>;
}
