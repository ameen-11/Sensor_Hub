import React from "react";
import Spacing from '../constants/Spacing';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import FontSize from '../constants/FontSize';
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Test: { accelerometerData: { x: number, y: number, z: number } };
};

type TestScreenRouteProp = RouteProp<RootStackParamList, 'Test'>;

type Props = {
  route: TestScreenRouteProp;
};

const Test: React.FC<Props> = ({ route }) => {
  const { accelerometerData } = route.params;
  const { x: ax, y: ay, z: az } = accelerometerData;

  return (
    <ScrollView>
      <View style={styleSheet.container}>
        <View>
          <Text>Accelerometer data:</Text>
          <Value name="Ax" value={ax} />
          <Value name="Ay" value={ay} />
          <Value name="Az" value={az} />
        </View>
      </View>
    </ScrollView>
  );
};

type ValueProps = {
  name: string;
  value: number;
};

const Value: React.FC<ValueProps> = ({ name, value }) => (
  <View style={styleSheet.valueContainer}>
    <Text style={styleSheet.valueName}>{name}:</Text>
    <Text style={styleSheet.valueValue}>{value.toFixed(2)}</Text>
  </View>
);

const styleSheet = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  accelerometerContainer: {
    marginVertical: Spacing * 3,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing,
  },
  valueName: {
    fontSize: FontSize.medium,
    color: 'black',
  },
  valueValue: {
    fontSize: FontSize.medium,
    color: 'black',
  },
});

export default Test;
