export interface MembershipClub {
  name?: string;
  desc?: {
    desc?: string;
    terms?: string;
  };
  plans?: {
    cost?: number;
    validity?: number;
  };
  incentives?: {
    type?: string;
    percAmnt?: string;
    fixedAmnt?: string;
    maxPercAmnt?: string;
    isFreeDel?: boolean;
    isNoMinOrder?: boolean;
  };
}
