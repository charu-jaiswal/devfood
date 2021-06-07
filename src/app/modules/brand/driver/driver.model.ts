export interface Driver {
  id?: string;
  name?: string;
  email?: string;
  pass?: string;
  mobileNo?: string;
  licenseNo?: string;
  vehicleNo?: string;
  vehicleName?: string;
  licensePlate?: string;
  condition?: {
    isAllOutlet?: boolean;
    condType?: string;
    outlets?: Array<string>;
    zone?: string;
  };
}
