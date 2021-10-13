import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import { RootTabScreenProps } from '../types';
import { Button, ToggleButton, TextInput } from 'react-native-paper';

const DismissKeyboard = ({ children }: { children: any }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [price, setPrice] = useState('');

  const [pizzaShape, setPizzaShape] = useState('circle');

  const [diameter, setDiameter] = useState('');
  const [circleResult, setCircleResult] = useState('');

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [rectangleResult, setRectangleResult] = useState('');

  const calcCircleResult = () => {
    return (
      ((parseInt(diameter) / 2) * (parseInt(diameter) / 2) * 3.14) /
      parseInt(price)
    )
      .toFixed(0)
      .toString();
  };

  const calcRectangleResult = () => {
    return ((parseInt(width) * parseInt(length)) / parseInt(price))
      .toFixed(0)
      .toString();
  };

  useEffect(() => {
    if (price && diameter) {
      const result = calcCircleResult();
      if (result !== 'NaN') setCircleResult(result);
      else setCircleResult('Wrong input');
    }

    if (price && width && length) {
      const result = calcRectangleResult();
      if (result !== 'NaN') setRectangleResult(result);
      else setRectangleResult('Wrong input');
    }
  }, [price, diameter, width, length]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <TextInput
          onChangeText={setPrice}
          value={price}
          label="Price (zł)"
          style={styles.input}
          keyboardType={'numeric'}
        />
        <Text style={styles.label}>
          {pizzaShape === 'circle' ? 'Circle' : 'Rectangle'}
        </Text>
        <ToggleButton.Row
          onValueChange={(value) => setPizzaShape(value)}
          value={pizzaShape}
          style={{ margin: 10 }}
        >
          <ToggleButton icon="circle" value="circle" />
          <ToggleButton icon="rectangle" value="rectangle" />
        </ToggleButton.Row>

        {pizzaShape === 'circle' ? (
          <View style={{ margin: 10 }}>
            <TextInput
              onChangeText={setDiameter}
              value={diameter}
              label="Diameter (cm)"
              style={styles.inputCircle}
              keyboardType={'numeric'}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}
          >
            <TextInput
              onChangeText={setLength}
              value={length}
              label="Length (cm)"
              style={styles.inputRectangle}
              keyboardType={'numeric'}
            />
            <TextInput
              onChangeText={setWidth}
              value={width}
              label="Width (cm)"
              style={styles.inputRectangle}
              keyboardType={'numeric'}
            />
          </View>
        )}
        {pizzaShape === 'circle' ? (
          <Text style={styles.result}>Result: {circleResult}</Text>
        ) : (
          <Text style={styles.result}>Result: {rectangleResult}</Text>
        )}
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
  input: { margin: 10 },
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
