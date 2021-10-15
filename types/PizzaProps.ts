import Pizza from "./Pizza";
import {Dispatch, SetStateAction} from "react";

export default interface IPizzaProps {
    pizzaItems: Pizza[];
    setPizzaItems: Dispatch<SetStateAction<Pizza[]>>
}