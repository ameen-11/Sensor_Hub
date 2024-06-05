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
import { startSensors, stopSensors } from '../hooks/sensor';

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
