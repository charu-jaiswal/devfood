export interface Tax {
  id?: string;
  name?: string;
  dispName?: string;
  desc?: string;
  condition?: {
    isBackward?: boolean;
    isAllItems?: boolean;
    isAllOutlets?: boolean;
    outlets?: string;
  };
  logic?: {
    percAmnt?: number;
  };
}
