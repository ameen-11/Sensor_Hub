import React, {useState, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
  magnetometer,
} from 'react-native-sensors';

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import {Subscription} from 'rxjs';
import {init, insertData} from '../db';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const logOut = async () => {
    await auth().signOut();
  };

  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelSubscription, setSubscription] = useState<Subscription | null>(
    null,
  );

  const startAccelerometer = () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000);

    const newSubscription = accelerometer.subscribe(
      ({x, y, z}) => {
        setAccelerometerData({x, y, z});
        const pitch =
          Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
        setPitchData(pitch);
        const roll = Math.atan2(y, x) * (180 / Math.PI);
        setRollData(roll);
        const azimuth =
          Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
        setAzimuthData(azimuth);
      },
      error => {
        console.log('The sensor is not available', error);
      },
    );

    setSubscription(newSubscription);
  };

  const {x: ax, y: ay, z: az} = accelerometerData;

  const stopAccelerometer = () => {
    if (accelSubscription) {
      accelSubscription.unsubscribe();
      setSubscription(null);
      setAccelerometerData({x: 0, y: 0, z: 0});
    }
  };

  //   gyroscope

  const [gyroscopeData, setGyroscopeData] = useState({x: 0, y: 0, z: 0});
  const [gyroscopeSubscription, setGyroscopeSubscription] =
    useState<Subscription | null>(null);
  const startGyroscope = () => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 1000);
    const newSubscription = gyroscope.subscribe(
      ({x, y, z}) => setGyroscopeData({x, y, z}),
      error => console.log('The sensor is not available', error),
    );
    setGyroscopeSubscription(newSubscription);
  };
  const stopGyroscope = () => {
    if (gyroscopeSubscription) {
      gyroscopeSubscription.unsubscribe();
      setGyroscopeSubscription(null);
      setGyroscopeData({x: 0, y: 0, z: 0});
    }
  };

  const {x: gx, y: gy, z: gz} = gyroscopeData;
  //   rollData
  const [rollData, setRollData] = useState(0);
  // pitchData
  const [pitchData, setPitchData] = useState(0);

  // azimuth
  const [azimuthData, setAzimuthData] = useState(0);

  // magnetometer
  const [magnetometerData, setMagnetometerData] = useState({x: 0, y: 0, z: 0});
  const [magnetometerSubscription, setMagnetometerSubscription] =
    useState<Subscription | null>(null);
  const startMagnetometer = () => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 1000);
    const newSubscription = magnetometer.subscribe(
      ({x, y, z}) => setMagnetometerData({x, y, z}),
      error => console.log('The magnetometer is not available', error),
    );
    setMagnetometerSubscription(newSubscription);
  };
  const stopmagnetometer = () => {
    if (magnetometerSubscription) {
      magnetometerSubscription.unsubscribe();
      setMagnetometerSubscription(null);
      setMagnetometerData({x: 0, y: 0, z: 0});
    }
  };
  useEffect(() => {
    return () => {
      if (magnetometerSubscription) {
        magnetometerSubscription.unsubscribe();
      }
    };
  }, [magnetometerSubscription]);

  const {x: mx, y: my, z: mz} = magnetometerData;
  // HACC
  const [accuracy, setAccuracy] = useState<number | string>('Calculating...');
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {accuracy} = position.coords;
        setAccuracy(accuracy.toFixed(2)); // Set accuracy (HACC) from GPS data
      },
      error => {
        console.error('Error fetching location:', error);
        setAccuracy('Error'); // Set accuracy to 'Error' if fetching fails
      },
      {enableHighAccuracy: true, distanceFilter: 10}, // Options for GPS accuracy and distance filter
    );

    return () => Geolocation.clearWatch(watchId); // Cleanup function to clear GPS watch
  }, []);

  // lattitude and longitude
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [altitude, setAltitude] = useState<number | null>(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAltitude(position.coords.altitude);
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        console.log('Altitude:', position.coords.altitude);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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
          },
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

  const pushDataToDataBase = async () => {
    const timestamp = new Date().getTime();
    const data = {
      timestamp: timestamp,
      ax: accelerometerData.x,
      ay: accelerometerData.y,
      az: accelerometerData.z,
      pitch: pitchData,
      roll: rollData,
      azimuth: azimuthData,
      avx: gyroscopeData.x,
      avy: gyroscopeData.y,
      avz: gyroscopeData.z,
      mfx: magnetometerData.x,
      mfy: magnetometerData.y,
      mfz: magnetometerData.z,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
      hacc: accuracy,
    };
    console.log(data);
    await insertData(data);
  };

  const setDatabaseConnection = async () => {
    try {
      await init();
    } catch (err) {
      return 'ERROR_DATABASE';
    }
    return 'SUCCESS';
  };

  const dataBaseUpdation = async () => {
    console.log('inside database updation');
    try {
      setDatabaseConnection(); //also checks if table is created or not if not creates table
    } catch (err) {
      console.log(err);
    }

    try {
      await pushDataToDataBase();
    } catch (err) {
      console.log(err);
    }
    return;
  };

  let timeoutid: ReturnType<typeof setTimeout>;
  let intervalId: ReturnType<typeof setInterval>;

  const startSensors = () => {
    startAccelerometer();
    startGyroscope();
    startMagnetometer();
    console.log('started collecting data');
    intervalId = setInterval(async () => {
      console.log('database call');
      await pushDataToDataBase();
    }, 1000);

    timeoutid = setTimeout(() => {
      magnetometerSubscription?.unsubscribe();
      accelSubscription?.unsubscribe();
      gyroscopeSubscription?.unsubscribe();
      setGyroscopeSubscription(null);
      setSubscription(null);
      setMagnetometerSubscription(null);
      clearInterval(intervalId);
      console.log('fired the timeout');
    }, 5 * 1000);
  };
  const stopSensors = () => {
    stopAccelerometer();
    stopGyroscope();
    stopmagnetometer();
    clearTimeout(timeoutid);
  };

  //set interval of 1 minutes after the sensors are started and updated the database
  // after the sensors are stopped or the timeinterval is cleared the updation
  // of database should be stopeed

  useEffect(() => {
    console.log('still sensors collection running');
    console.log(magnetometerData);
  }, [magnetometerData]);

  return (
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
  );
};
type value = {
  name: string;
  value: number | string | null;
};

const Value = ({name, value}: value) => (
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
