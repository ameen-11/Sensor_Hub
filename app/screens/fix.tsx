import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  
  const logOut = () => {};
  const startSensors = () => {};
  const stopSensors = () => {};

  const [ax, setAx] = React.useState({});



  return (
      <SafeAreaProvider>
      <ScrollView>
      <View style={styleSheet.container}>
        <View>
          <Text>Logged In</Text>
        </View>
        <TouchableOpacity
          style={styleSheet.startstopbtn}
          onPress={startSensors}>
          <Text style={styleSheet.btnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styleSheet.startstopbtn} onPress={stopSensors}>
          <Text style={styleSheet.btnText}>Stop</Text>
        </TouchableOpacity>

        <View style={styleSheet.accelerometerContainer}>
          <Text>Accelerometer data:</Text>
          <Value name="Ax" value={ax} />
          <Value name="Ay" value={ay} />
          <Value name="Az" value={az} />
          <Value name="pitch" value={pitchData} />
          <Value name="Roll" value={rollData} />
          <Value name="Azimuth" value={azimuthData} />
        </View>
        <View style={styleSheet.accelerometerContainer}>
          <Text>gyroscope data:</Text>
          <Value name="Gx" value={gx} />
          <Value name="Gy" value={gy} />
          <Value name="Gz" value={gz} />
        </View>

        <View style={styleSheet.accelerometerContainer}>
          <Text>magnetometer data:</Text>
          <Value name="Mx" value={mx} />
          <Value name="My" value={my} />
          <Value name="Mz" value={mz} />
        </View>
        <View style={styleSheet.accelerometerContainer}>
          <Text> hacc: </Text>
          <Value name="hacc" value={accuracy} />
          <Value name="latitude" value={latitude} />
          <Value name="longitude" value={longitude} />
          <Value name="Altitude" value={altitude} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SensorMap')}
          style={styleSheet.btnTouchableOp}>
          <Text style={styleSheet.btnText}>View Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styleSheet.btnTouchableOp}
          onPress={() => navigation.navigate('SensorData')}>
          <Text style={styleSheet.btnText}>Sensor Data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logOut} style={styleSheet.btnTouchableOp}>
          <Text style={styleSheet.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaProvider>
  );
};

type value = {
  name: string;
  value: number | string | null;
};

const Value = ({ name, value }: value) => (
  <View style={styleSheet.valueContainer}>
    <Text style={styleSheet.valueName}>{name}:</Text>
    <Text style={styleSheet.valueValue}>{value}</Text>
  </View>
);

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

export default Home;
