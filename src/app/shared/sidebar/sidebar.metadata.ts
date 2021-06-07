// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  class: string;
  label: string;
  labelClass: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
