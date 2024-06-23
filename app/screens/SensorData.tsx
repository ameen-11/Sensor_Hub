// create this page to read data from the database
import {useState, useEffect} from 'react';
import React from 'react';
//read data from the database using readData function from db.ts
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Spacing from '../constants/Spacing';

const SensorData = ({navigation}) => {
  useEffect(() => {
  }, []);

  const p = [1];
  return (
    <View style={styles.container}>
      <ScrollView>
        {p.map((item, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.item}>{JSON.stringify(item)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: Spacing,
  },
  item: {
    padding: Spacing,
    marginVertical: Spacing / 2,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});

export default SensorData;
