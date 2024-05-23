import React, { useEffect } from 'react';
import {View, Text, PermissionsAndroid, Alert, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type SensorMapsNavigationProp = NativeStackNavigationProp<
RootStackParamList
>;

type Props = {
    navigation: SensorMapsNavigationProp ;
};

const SensorMap : React.FC<Props> = ({navigation}) => {
    
    
    const [backgroundLocation , setBackgroundLocation] = React.useState(false); 

    //checks the permissions for background location on entry to the maps screen

    useEffect(()=>{
        const checkPermissions = async () => {
            try {
                const locationPromise = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
                setBackgroundLocation(locationPromise);
                if(locationPromise == false) {
                    Alert.alert('Location Acess Denied', 'Background Location access not available', [
                        {
                            text: 'Settings',
                            onPress: () => Linking.openSettings(),
                        },
                        {text: 'OK', onPress: () => navigation.navigate('Home') }, 
                    ]);
                }

            } catch(error) {
                navigation.navigate('Home');
            }
        };

         checkPermissions();

    },[])


    return (
        <SafeAreaView>
            <View
                style={styles.container}
            >
                <MapView
                    provider={PROVIDER_GOOGLE} 
                    showsUserLocation={true}
                    style={styles.map}
                />
            </View>
        </SafeAreaView>
    );
};

// docs used
// https://www.oneclickitsolution.com/blog/integrate-google-maps-in-react-native/
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    map: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        borderWidth:2,
    },
}); 

export default SensorMap;


   
