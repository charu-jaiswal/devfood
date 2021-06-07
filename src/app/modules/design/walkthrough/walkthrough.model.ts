export interface WalkThrough {
  title?: string;
//  type?: string;
  desc?: string;
  image?: string;
  button?: string;
  sort?: number;
  color?: {
    title?: string;
    desc?: string;
    bg?: string;
    button?: string;
  };
}

export interface SelectFormVal {
  [index: number]: {
    label: string;
    value: string;
  };
}

