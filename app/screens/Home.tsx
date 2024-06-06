import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';

import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes,
    magnetometer,
} from "react-native-sensors";
import { startSensors, stopSensors } from '../hooks/sensor';

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
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

const Value = ({ name, value }) => (
    <View style={styleSheet.valueContainer}>
        <Text style={styleSheet.valueName}>{name}:</Text>
        <Text style={styleSheet.valueValue}>{value.toFixed(2)}</Text>
    </View>
);

const Home: React.FC<Props> = ({ navigation }) => {
    const logOut = async () => {
        await auth().signOut();
    };

    return (
        <ScrollView>
            <View style={styleSheet.container}>
                <View>
                    <Text>Logged In</Text>
const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] =useState<Subscription | null>(null);

  const startAccelerometer = () => {

    setUpdateIntervalForType(SensorTypes.accelerometer, 400);

   const newSubscription = accelerometer.subscribe(
        ({ x, y, z }) => {setAccelerometerData({ x, y, z });
                const pitch = Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
                      setPitchData(pitch);
               const roll = Math.atan2(y, x) * (180 / Math.PI);
                    setRollData(roll);
                const azimuth=Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
                setAzimuthData(azimuth);
             },
       (error) => {
         console.log('The sensor is not available', error);
       }
     );

    setSubscription(newSubscription);
  ;}
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
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState<Subscription | null>(null);
const startGyroscope = () => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 400);
    const newSubscription = gyroscope.subscribe(
      ({ x, y, z }) => setGyroscopeData({ x, y, z }),
      (error) => console.log('The sensor is not available', error)
    );
    setGyroscopeSubscription(newSubscription);
  };
  const stopGyroscope = () => {
    if (gyroscopeSubscription) {
      gyroscopeSubscription.unsubscribe();
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
//   rollData
const [rollData, setRollData] = useState(0);
// pitchData
const [pitchData, setPitchData] = useState(0);

// azimuth
const [azimuthData, setAzimuthData] = useState(0);

// magnetometer
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerSubscription, setMagnetometerSubscription] = useState<Subscription | null>(null);
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
        magnetometerSubscription.unsubscribe();
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
// HACC
 const [accuracy, setAccuracy] = useState<number | string>('Calculating...');
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { accuracy } = position.coords;
        setAccuracy(accuracy.toFixed(2)); // Set accuracy (HACC) from GPS data
      },
      error => {
        console.error('Error fetching location:', error);
        setAccuracy('Error'); // Set accuracy to 'Error' if fetching fails
      },
      { enableHighAccuracy: true, distanceFilter: 10 } // Options for GPS accuracy and distance filter
    );

    return () => Geolocation.clearWatch(watchId); // Cleanup function to clear GPS watch
  }, []);


// lattitude and longitude
const [latitude, setLatitude] = useState(0);
const [longitude, setLongitude] = useState(0);
  const [altitude, setAltitude] = useState<number | null>(null);



  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAltitude(position.coords.altitude);
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        console.log('Altitude:', position.coords.altitude);
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
        } else {
          getLocation();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      getLocation();
    }
  };




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
                <TouchableOpacity
                    onPress={() => navigation.navigate('SensorMap')}
                    style={styleSheet.btnTouchableOp}>
                    <Text style={styleSheet.btnText}>View Maps</Text>
                </TouchableOpacity>
                <View style={styleSheet.accelerometerContainer}>
                                  <Text>magnetometer data:</Text>
                                  <Value name="Mx" value={mx} />
                                  <Value name="My" value={my} />
                                  <Value name="Mz" value={mz} />
                                </View>
            <View style={styleSheet.accelerometerContainer}>
            <Text> hacc: </Text>
            <Value name="hacc" value={accuracy}/>
            <Value name="latitude" value={latitude}/>
            <Value name="longitude" value={longitude}/>
             <Value name="Altitude" value={altitude}/>
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
});

export default Home;
