import React from "react";
import Spacing from '../constants/Spacing';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import FontSize from '../constants/FontSize';
import { RouteProp } from "@react-navigation/native";
import {accelerometerData} from '../Home'
type RootStackParamList = {
  SensorData: { accelerometerData: { x: number, y: number, z: number } };
};

type SensorDataScreenRouteProp = RouteProp<RootStackParamList, 'SensorData'>;

type Props = {
  route: SensorDataScreenRouteProp;
};

const SensorData: React.FC<Props> = ({ route }) => {
  const  accelerometerData  = route.params;

  const { x: ax, y: ay, z: az } = accelerometerData;

    return (
        <ScrollView>
            <View style={styleSheet.container}>
                <View style={styleSheet.accelerometerContainer}>
                    <Text>Accelerometer data:</Text>
                    <Value name="Ax" value={ax} />
                    <Value name="Ay" value={ay} />
                    <Value name="Az" value={az} />
                </View>
                <View style={styleSheet.accelerometerContainer}>
                    <Text>gyroscope data:</Text>
                    <Value name="Gx" value={gx} />
                    <Value name="Gy" value={gy} />
                    <Value name="Gz" value={gz} />
                    <Value name="Roll" value={rollData} />
                </View>
                <View style={styleSheet.accelerometerContainer}>
                    <Text>magnetometer data:</Text>
                    <Value name="Gx" value={mx} />
                    <Value name="Gy" value={my} />
                    <Value name="Gz" value={mz} />
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

export default SensorData;
