import React, { useState, useEffect } from 'react';
import {
  accelerometer,
  gyroscope,
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { Subscription } from 'rxjs';

const SensorComponent = ({ onStart, onStop }: any ) => {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [rollData, setRollData] = useState(0);
  const [pitchData, setPitchData] = useState(0);
  const [azimuthData, setAzimuthData] = useState(0);
  const [subscriptionRefs, setSubscriptionRefs] = useState<Subscription[]>([]); // Array to hold sensor subscriptions

  const startSensors = async () => {
    const accelerometerSubscription =  accelerometer.subscribe(({ x, y, z }) => {
      setAccelerometerData({ x, y, z });
      const pitch = Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
      setPitchData(pitch);
      const roll = Math.atan2(y, x) * (180 / Math.PI);
      setRollData(roll);
      const azimuth = Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
      setAzimuthData(azimuth);
    });

    const gyroscopeSubscription =  gyroscope.subscribe(({ x, y, z }) => {
      setGyroscopeData({ x, y, z });
    });

    const magnetometerSubscription =  magnetometer.subscribe(({ x, y, z }) => {
      setMagnetometerData({ x, y, z });
    });

    setSubscriptionRefs([accelerometerSubscription, gyroscopeSubscription, magnetometerSubscription]);
    onStart?.(); // Call the optional onStart callback
  };

  const stopSensors = async () => {
    subscriptionRefs.forEach((subscription) => subscription.unsubscribe());
    setSubscriptionRefs([]);
    onStop?.(); // Call the optional onStop callback
  };

  useEffect(() => {
    return () => {
      subscriptionRefs.forEach((subscription) => subscription.unsubscribe());
    };
  }, [subscriptionRefs]);

  return (
    <View style={styleSheet.container}>
      <TouchableOpacity style={styleSheet.btnTouchableOp} onPress={startSensors}>
        <Text style={styleSheet.btnText}>Start Sensors</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styleSheet.btnTouchableOp} onPress={stopSensors}>
        <Text style={styleSheet.btnText}>Stop Sensors</Text>
      </TouchableOpacity>
      <View style={styleSheet.accelerometerContainer}>
        <Text>Accelerometer:</Text>
        <Text>X: {accelerometerData.x}</Text>
        <Text>Y: {accelerometerData.y}</Text>
        <Text>Z: {accelerometerData.z}</Text>
        <Text>Pitch: {pitchData.toFixed(2)}</Text>
        <Text>Roll: {rollData.toFixed(2)}</Text>
        <Text>Azimuth: {azimuthData.toFixed(2)}</Text>
      </View>
      <View style={styleSheet.accelerometerContainer}>
        <Text>Gyroscope:</Text>
        <Text>X: {gyroscopeData.x}</Text>
        <Text>Y: {gyroscopeData.y}</Text>
        <Text>Z: {gyroscopeData.z}</Text>
      </View>
      <View style={styleSheet.accelerometerContainer}>
        <Text>Magnetometer:</Text>
        <Text>X: {magnetometerData.x}</Text>
        <Text>Y: {magnetometerData.y}</Text>
        <Text>Z: {magnetometerData.z}</Text>
      </View>
    </View>
  );
};

export default SensorComponent;

const styleSheet = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  btnTouchableOp: {
    margin: Spacing * 2,
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  btnText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
  },
  accelerometerContainer: {
    marginVertical: Spacing * 3,
  },

  gyroscopeContainer: {
    marginVertical: Spacing * 3,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing,
  },
  valueName: {
    fontSize: FontSize.medium,
    color: Colors.text,
  },
  valueValue: {
    fontSize: FontSize.medium,
    color: Colors.text,
  },
  startstopbtn: {
    margin: Spacing,
    padding: Spacing,
    backgroundColor: Colors.primary,
    borderRadius: Spacing,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing / 2,
    },

    shadowOpacity: 0.3,
    justifyContent: 'space-between',
    shadowRadius: Spacing,
    flex: 1,
  },
});

