import { PermissionsAndroid } from "react-native";

const requestPermissionForLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Sensor Hun needs Location Permission',
        message:
          'Sensor hub needs your location to track your location' +
          'so we can give markers on the map',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the gps');
      return { message: 'success' };
    } else {
      console.log('location permission denied');
      return {meesage: 'failed'};
    }
  } catch (err) {
    console.warn(err);
  }
};


export default requestPermissionForLocation;
