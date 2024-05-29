import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import auth from '@react-native-firebase/auth';

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
  magnetometer,
} from "react-native-sensors";

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { Subscription } from 'rxjs';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
type ValueProps = {
  name: string; // Explicitly define the type for 'name' as string
  value: number; // Assuming 'value' is a number
};
const Home: React.FC<Props> = ({ navigation }) => {
  const logOut = async () => {
    await auth().signOut();
  };

const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] =useState<Subscription | null>(null);

  const startAccelerometer = () => {

    setUpdateIntervalForType(SensorTypes.accelerometer, 400);

    const newSubscription = accelerometer.subscribe(
      ({ x, y, z }) => setAccelerometerData({ x, y, z }),
      (error) => {
        console.log('The sensor is not available', error);
      }
    );

    setSubscription(newSubscription);
  };
  useEffect(() => {
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, [subscription]);

    const { x:ax, y:ay, z:az } = accelerometerData;


  const stopAccelerometer = () => {
    if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
      setAccelerometerData({x:0,y:0,z:0})
    }
  };




//   gyroscope

  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);
const startGyroscope = () => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 400);
    const newSubscription = gyroscope.subscribe(
      ({ x, y, z }) => {setGyroscopeData({ x, y, z });
         const roll = Math.atan2(y, x) * (180 / Math.PI);
            setRollData(roll);
      },
      (error) => console.log('The sensor is not available', error)
    );
    setGyroscopeSubscription(newSubscription);
  };
  const stopGyroscope = () => {
    if (gyroscopeSubscription) {
      subscription.unsubscribe();
      setGyroscopeSubscription(null);
      setGyroscopeData({ x: 0, y: 0, z: 0 });
    }
  };

  useEffect(() => {
    return () => {
      if (gyroscopeSubscription) {
        gyroscopeSubscription.unsubscribe();
      }
    };
  }, [subscription]);
  const { x:gx, y:gy, z:gz } = gyroscopeData;
const [rollData, setRollData] = useState(0);
// magnetometer
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);

const startMagnetometer = () => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 400);
    const newSubscription = magnetometer.subscribe(
      ({ x, y, z }) => setMagnetometerData({ x, y, z }),
      (error) => console.log('The magnetometer is not available', error)
    );
    setMagnetometerSubscription(newSubscription);
  };
  const stopmagnetometer = () => {
      if (magnetometerSubscription) {
        subscription.unsubscribe();
        setMagnetometerSubscription(null);
        setMagnetometerData({ x: 0, y: 0, z: 0 });
      }
    };
  useEffect(() => {
    return () => {
      if (magnetometerSubscription) {
        magnetometerSubscription.unsubscribe();
      }
    };
  }, [subscription]);

  const { x:mx, y:my, z:mz } = magnetometerData;



export 

  const startSensors = () =>{
   startAccelerometer();
   startGyroscope();
   startMagnetometer();
  }
    const stopSensors = () => {
    stopAccelerometer();
    stopGyroscope();
    stopmagnetometer();
    }



  return (
    <ScrollView>
      <View style={styleSheet.container}>
        <View>
          <Text>Logged In</Text>
        </View>
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




        <TouchableOpacity
          onPress={() => navigation.navigate('SensorMap')}
          style={styleSheet.btnTouchableOp}>
          <Text style={styleSheet.btnText}>View Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styleSheet.btnTouchableOp}
          onPress={() => navigation.navigate('Test')}>
          <Text style={styleSheet.btnText}>Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styleSheet.btnTouchableOp}
         onPress={startSensors}
         >
          <Text style={styleSheet.btnText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styleSheet.btnTouchableOp}
        onPress={stopSensors}
        >
          <Text style={styleSheet.btnText}>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logOut} style={styleSheet.btnTouchableOp}>
          <Text style={styleSheet.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Value = ({ name, value }) => (
  <View style={styleSheet.valueContainer}>
    <Text style={styleSheet.valueName}>{name}:</Text>
    <Text style={styleSheet.valueValue}>{value.toFixed(2)}</Text>
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
});

export default Home;
