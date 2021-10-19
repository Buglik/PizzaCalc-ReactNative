import { Shape } from './Shape';

export default interface Pizza {
  id: any;
  name: string;
  shape: Shape;
  cost: string;
  result: string;
  dimensions: Dimensions;
  pizzeriaName: string;
}

export interface Dimensions {
  diameter?: string;
  width?: string;
  length?: string;
}
