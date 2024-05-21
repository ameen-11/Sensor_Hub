import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SensorMap from '../screens/SensorMap';
import Test from '../screens/Test';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
                headerTitle: () => <Header name="Home"/>,
                headerStyle: {
                    backgroundColor: Colors.primary,
                }
            }} />
      <Stack.Screen name="SensorMap" component={SensorMap} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default UserStack;
