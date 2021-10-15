import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import IPizzaProps from "../types/PizzaProps";
import Pizza from "../types/Pizza";

export default function PizzaList({ pizzaItems, setPizzaItems }: IPizzaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List</Text>

      {pizzaItems?.map((item: Pizza, index: number) => (
        <Text key={`${item}${index}`}>{item.name} {item.pizzeriaName}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
