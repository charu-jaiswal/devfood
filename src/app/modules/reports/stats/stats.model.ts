export interface Total {
  subtotal: number;
  pretotal: {
    deliFee: number;
    packFee: number;
    charge: number;  // Altered from array of charges to cumulated amount
    tax: number;
    tips: number;
    roundOff: number;
  };
  amount: number;  // Subtotal + sumation of pretotal
  discount: number;
  finalAmnt: number; // amount - discount = finalAmnt
  walletUse: number;
  finalPay: number; // finalAmnt - walletUse = finalPay
  cashback: {
    item: number;
    coupon: number;
    total: number;  //new
  };
};