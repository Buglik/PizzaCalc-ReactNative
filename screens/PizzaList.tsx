import * as React from 'react';
import {View} from '../components/Themed';
import IPizzaProps from "../types/PizzaProps";
import Pizza, {Dimensions} from "../types/Pizza";
import {List, Text} from 'react-native-paper';
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

    const pizzasGroupedByPizzeria = groupBy(pizzaItems, "pizzeriaName");

    const getPizzaDimensions = (dimensions: Dimensions) => {
        if (dimensions.diameter) {
            return dimensions.diameter + ' cm | '
        } else if (dimensions.length && dimensions.width) {
            return dimensions.width + 'x' + dimensions.length + ' cm | '
        } else {
            return ""
        }
    }


    return (
        <ScrollView style={styles.container}>
            {pizzasGroupedByPizzeria?.map((pizzas: Pizza[], index: number) => (
                <List.Section key={`${pizzas}${index}`} style={styles.listSection}>
                    <List.Subheader
                        style={styles.listSectionHeader}>{pizzas[0].pizzeriaName || 'Pizzeria undefined'}</List.Subheader>
                    {pizzas.map((pizza: Pizza, pIndex: number) => (
                        <List.Item key={pizza.id}
                                   style={styles.listItem}
                                   title={pizza.name}
                                   description={getPizzaDimensions(pizza.dimensions) + pizza.cost + 'zł'}
                                   left={props => <List.Icon
                                       icon={pizza.shape === Shape.round ? 'circle' : 'rectangle'}/>}
                                   right={() => (
                                       <View>
                                           <Text style={{
                                               textAlign: 'center',
                                               color: 'green',
                                               fontSize: 16
                                           }}>{pizza?.result}</Text>
                                           <List.Icon icon='delete'/>
                                       </View>)}/>
                    ))}
                </List.Section>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 20,
    },
    listItem: {
        // backgroundColor: '#555555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listSection: {
        // borderBottomColor: '#2f95dc',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    listSectionHeader: {
        margin: 0,
        padding: 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        // marginVertical: 30,
        // height: 1,
        width: '80%',
    },
});
