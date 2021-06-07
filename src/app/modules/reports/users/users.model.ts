export interface Users {
  name?: string;
  email?: string;
  uid?: string;
  created_at?: number;
  isBan?: boolean;
  wallet?: {
    amount?: number;
    type?: string;
    time?: string;
    orderID?: string;
  };
}
export const defaultReports = {
  name: '',
  email: '',
  uid: '',
};
