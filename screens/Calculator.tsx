import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput, ToggleButton } from "react-native-paper";
import { Shape } from "../types/Shape";
import Pizza from "../types/Pizza";
import IPizzaProps from "../types/PizzaProps";
import uuid from "react-native-uuid";

const themeColor = "#2F95DC";

const theme = {
  colors: {
    primary: themeColor,
  },
};
//
// const themeColor= {{ colors: { text: this.props.style.color } }}

const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Calculator({ pizzaItems, setPizzaItems }: IPizzaProps) {
  const [price, setPrice] = useState<string>("");
  const [pizzaShape, setPizzaShape] = useState<Shape>(Shape.round);
  const [diameter, setDiameter] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  const [result, setResult] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzeriaName, setPizzeriaName] = useState<string>("");

  const calcCircleResult = () => {
    if (diameter && price) {
      return (
        ((parseInt(diameter) / 2) * (parseInt(diameter) / 2) * 3.14) /
        parseInt(price)
      )
        .toFixed(0)
        .toString();
    } else return "0";
  };

  const calcRectangleResult = () => {
    if (width && length && price) {
      return ((parseInt(width) * parseInt(length)) / parseInt(price))
        .toFixed(0)
        .toString();
    } else return "0";
  };

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
          length,
        },
        shape: pizzaShape,
        result,
      };
      setPizzaItems([...pizzaItems, newPizza]);
      setPizzeriaName("");
    }
  };

  useEffect(() => {
    pizzaShape === Shape.round
      ? setResult(calcCircleResult())
      : setResult(calcRectangleResult());
  }, [price, diameter, width, length, pizzaShape]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.upContainer}>
          <TextInput
            onChangeText={setPrice}
            value={price}
            label="Price (zł)"
            style={styles.input}
            keyboardType={"numeric"}
            theme={theme}
          />
          <Text style={styles.label}>Pizza shape</Text>
          <ToggleButton.Row
            onValueChange={(value: string) => {
              value === Shape.round
                ? setPizzaShape(Shape.round)
                : setPizzaShape(Shape.square);
            }}
            value={pizzaShape}
            style={{ margin: 10 }}
          >
            <ToggleButton icon="circle" value={Shape.round} />
            <ToggleButton icon="rectangle" value={Shape.square} />
          </ToggleButton.Row>
          {pizzaShape === Shape.round ? (
            <View style={{ margin: 10 }}>
              <TextInput
                onChangeText={setDiameter}
                value={diameter}
                label="Diameter (cm)"
                style={styles.inputCircle}
                keyboardType={"numeric"}
                theme={theme}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <TextInput
                onChangeText={setLength}
                value={length}
                label="Length (cm)"
                style={styles.inputRectangle}
                keyboardType={"numeric"}
                theme={theme}
              />
              <TextInput
                onChangeText={setWidth}
                value={width}
                label="Width (cm)"
                style={styles.inputRectangle}
                keyboardType={"numeric"}
                theme={theme}
              />
            </View>
          )}
        </View>

        <View
          style={{
            padding: 10,
            borderRadius: 100,
            borderColor: "grey",
            borderWidth: 2,
            width: 120,
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.result}>{result}</Text>
        </View>

        <View style={styles.addInput}>
          <TextInput
            onChangeText={setPizzeriaName}
            value={pizzeriaName}
            label="Pizzeria"
            style={styles.input}
            theme={theme}
          ></TextInput>
          <TextInput
            onChangeText={setPizzaName}
            value={pizzaName}
            label="Pizza name"
            style={styles.input}
            theme={theme}
          ></TextInput>
          <Button
            mode="contained"
            style={{ margin: 10, backgroundColor: themeColor }}
            onPress={addItem}
          >
            Add to list
          </Button>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    // margin: 20,
    // marginBottom: 60,
  },
  upContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    // margin: 10,
  },
  input: { margin: 10, width: 300, color: themeColor },
  inputCircle: { margin: 10, width: 300, color: themeColor },
  inputRectangle: {
    marginHorizontal: 5,
    marginVertical: 10,
    fontSize: 15,
    width: 150,
  },
  result: {
    fontSize: 30,
    // marginBottom: 100,
  },
  addInput: {
    marginBottom: 30,
  },
});
