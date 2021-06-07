export interface AppAppearance {
  icon?: string;
  color?: {
    primary?: string;
    secondary?: string;
  };
  layout?: {
    outlet?: string;
    menu?: string;
  };
}
