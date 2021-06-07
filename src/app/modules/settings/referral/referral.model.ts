export interface Referral {
  id?: string;
  name?: string;
  desc?: {
    terms?: string;
    shareTitle?: string;
    shareBody?: string;
    shareURL?: string;
  };
  forReferee?: string;
  forReferrer?: {
    type?: string;
    percAmnt?: number;
    fixedAmnt?: number;
    maxPercAmnt?: number;
    maxReferral?: number;
  };
}
