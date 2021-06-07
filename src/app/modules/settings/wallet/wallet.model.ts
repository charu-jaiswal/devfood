 export interface Wallet {
  name?: string;
  setting?: {
    termsDesc?: string;
    minOrderAmnt?: number;
    maxPercOrder?: number;
    minBalance?: number;
    maxBalance?: number;
    isDisUseCoup?: boolean;
    isWalletTopup?: boolean;
  };
  login?: {
    pin?: number;
  };
}
