import {Shape} from "./Shape";

export default interface Pizza {
    name: string;
    shape: Shape;
    cost: number;
    result: number;
    dimensions: {
        diameter?: number;
        width?: number;
        length?: number;
    }
    pizzeriaName: string;
}