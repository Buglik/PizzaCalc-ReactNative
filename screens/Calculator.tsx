import React, {useEffect, useState} from 'react';
import {Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {Button, TextInput, ToggleButton} from 'react-native-paper';
import {Shape} from "../types/Shape";
import NumericInput from "react-native-numeric-input"
import Pizza from "../types/Pizza";
import IPizzaProps from "../types/PizzaProps";
import uuid from 'react-native-uuid';


const DismissKeyboard = ({children}: { children: any }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function Calculator({pizzaItems, setPizzaItems}: IPizzaProps) {
    const [price, setPrice] = useState<number>(0);
    const [pizzaShape, setPizzaShape] = useState<Shape>(Shape.round);
    const [diameter, setDiameter] = useState<number>();
    const [length, setLength] = useState<number>();
    const [width, setWidth] = useState<number>();

    const [result, setResult] = useState<number>(0);
    const [pizzaName, setPizzaName] = useState<string>('');
    const [pizzeriaName, setPizzeriaName] = useState<string>('');

    const calcCircleResult = () =>
        diameter && price ? Math.round(((diameter / 2) * (diameter / 2) * 3.14) / price) : 0;

    const calcRectangleResult = () =>
        width && length && price ? Math.round((width * length) / price) : 0;

    const addItem = () => {
        if (pizzeriaName || pizzaName) {
            const newPizza: Pizza = {
                id: uuid.v4(),
                name: pizzaName,
                pizzeriaName: pizzeriaName,
                cost: price,
                dimensions: {
                    diameter,
                    width,
                    length
                },
                shape: pizzaShape,
                result
            }
            setPizzaItems([...pizzaItems, newPizza]);
            setPizzeriaName('');
        }
    };

    useEffect(() => {
        pizzaShape === Shape.round ? setResult(calcCircleResult()) : setResult(calcRectangleResult())
    }, [price, diameter, width, length, pizzaShape]);

    return (
        <DismissKeyboard>
            <SafeAreaView style={styles.container}>
                <NumericInput
                    onChange={setPrice}
                    value={price}
                    rounded
                    minValue={0}
                    // style={styles.input}
                    // keyboardType={'numeric'}
                />
                <Text style={styles.label}>
                    Pizza shape
                </Text>
                <ToggleButton.Row
                    onValueChange={(value: string) => {
                        value === Shape.round ? setPizzaShape(Shape.round) : setPizzaShape(Shape.square)
                    }}
                    value={pizzaShape}
                    style={{margin: 10}}
                >
                    <ToggleButton icon="circle" value={Shape.round}/>
                    <ToggleButton icon="rectangle" value={Shape.square}/>
                </ToggleButton.Row>

                {pizzaShape === Shape.round ?
                    <View style={{margin: 10}}>
                        <NumericInput
                            onChange={setDiameter}
                            value={diameter}
                            rounded
                            minValue={0}
                            // label="Diameter (cm)"
                            // style={styles.inputCircle}
                            // keyboardType={'numeric'}
                        />
                    </View>
                    :
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 10,
                        }}
                    >
                        <NumericInput
                            onChange={setLength}
                            value={length}
                            rounded
                            minValue={0}
                            // label="Length (cm)"
                            // style={styles.inputRectangle}
                            // keyboardType={'numeric'}
                        />
                        <NumericInput
                            onChange={setWidth}
                            value={width}
                            rounded
                            minValue={0}
                            // label="Width (cm)"
                            // style={styles.inputRectangle}
                            // keyboardType={'numeric'}
                        />
                    </View>
                }
                <Text style={styles.result}>Result: {result}</Text>
                <TextInput
                    onChangeText={setPizzeriaName}
                    value={pizzeriaName}
                    label="Pizzeria"
                    style={{margin: 10}}
                ></TextInput>
                <TextInput
                    onChangeText={setPizzaName}
                    value={pizzaName}
                    label="Pizza name"
                    style={{margin: 10}}
                ></TextInput>
                <Button mode="contained" style={{margin: 10}} onPress={addItem}>
                    Add to list
                </Button>
            </SafeAreaView>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // height: 300,
        margin: 20,
    },
    label: {
        margin: 10,
    },
    input: {margin: 10},
    inputCircle: {},
    inputRectangle: {
        // height: 40,
        // fontSize: 15,
        width: 150,
    },
    result: {
        fontSize: 30,
        margin: 10,
    },
});
