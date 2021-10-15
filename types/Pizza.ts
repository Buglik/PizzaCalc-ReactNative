import {Shape} from "./Shape";

export default interface Pizza {
    name: string;
    shape: Shape;
    cost: number;
    result: number;
    dimensions: Dimensions
    pizzeriaName: string;
}

export interface Dimensions {
    diameter?: number;
    width?: number;
    length?: number;
}