import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function PizzaList({ pizzaItems, setPizzaItems }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List</Text>

      {pizzaItems?.map((item: any, index: number) => (
        <Text key={`${item}${index}`}>{item}</Text>
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
