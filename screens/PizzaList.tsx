import * as React from 'react';
import {View} from '../components/Themed';
import IPizzaProps from "../types/PizzaProps";
import Pizza, {Dimensions} from "../types/Pizza";
import {IconButton, List, Text} from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';
import {Shape} from "../types/Shape";

export default function PizzaList({pizzaItems, setPizzaItems}: IPizzaProps) {

    function groupBy(collection: any, property: string) {
        var i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }

    function deletePizza(id: any) {
        setPizzaItems(pizzaItems.filter((el) => el.id != id));
    }

    const pizzasGroupedByPizzeria = groupBy(pizzaItems, "pizzeriaName");

    const getPizzaDimensions = (dimensions: Dimensions) => {

        if (dimensions.length && dimensions.width) {
            return dimensions.width + 'x' + dimensions.length + ' cm | '
        } else if (dimensions.diameter) {
            return dimensions.diameter + ' cm | '
        } else {
            return ""
        }
    }

    const sortPizzasByResult = (a: Pizza, b: Pizza) => {
        const aInt: number = parseInt(a.result);
        const bInt: number = parseInt(b.result);
        return bInt - aInt;
    }

    return (
        <ScrollView style={styles.container}>
            {pizzasGroupedByPizzeria?.map((pizzas: Pizza[], index: number) => (
                <List.Section key={`${pizzas}${index}`} style={styles.listSection}>
                    <List.Subheader
                        style={styles.listSectionHeader}>{pizzas[0].pizzeriaName || 'Pizzeria undefined'}</List.Subheader>
                    {pizzas.sort(sortPizzasByResult).map((pizza: Pizza, pIndex: number) => (
                        <List.Item key={pizza.id}
                                   style={styles.listItem}
                                   title={pizza.name}
                                   description={getPizzaDimensions(pizza.dimensions) + pizza.cost + 'zł'}
                                   left={props => <List.Icon style={{display: 'flex', alignItems: 'center'}}
                                                             icon={pizza.shape === Shape.round ? 'circle' : 'rectangle'}/>}
                                   right={() => (
                                       <View>
                                           <Text style={{
                                               textAlign: 'center',
                                               fontSize: 16
                                           }}>{pizza?.result}</Text>
                                           <IconButton color='red' icon='delete' onPress={() => deletePizza(pizza.id)}>
                                           </IconButton>
                                       </View>)}/>
                    ))}
                </List.Section>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listSection: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    listSectionHeader: {
        paddingBottom: 0,
        lineHeight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        width: '80%',
    },
});
