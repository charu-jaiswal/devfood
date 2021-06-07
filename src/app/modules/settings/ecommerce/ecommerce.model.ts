export interface Ecommerce {
  id?: string;
  prodTitle?: string;// 
  shortDesc?: string;//
  longDesc?: string;//
  stdSize?: number;//
  disPrice?: number;//
  variant?: Array<addvariantsize>;//
  rview?:Array<addreview>;
  imageUrl?: any[];
  sku?:string;
  tak?:string;
  // SKU-STRING
  // TAX-STRING(DROPDOWN 
}

interface addvariantsize {
  size?: number;
  price?: number;
}
interface addreview {
  revName?: string;//
  rview?: string;
  revRating?: number; //
  revDate?: string; // 
}
