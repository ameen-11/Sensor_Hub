import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SensorMap from '../screens/SensorMap';
// import Test from '../screens/Test';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import FontSize from '../constants/FontSize';
import SensorData from '../screens/SensorData';
import SensorCharts from '../screens/SensorCharts';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeDrawer"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle : {
                    fontSize : FontSize.large,
                }
            }}   
        >

            <Drawer.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerTitle: "Home",
                }}
            /> 

            <Drawer.Screen 
                name="Profile" 
                component={Profile}
            />

            <Drawer.Screen 
                name="Settings" 
                component={Settings} 
            />

            <Drawer.Screen 
                name="SensorData" 
                component={SensorData} 
            />
            <Drawer.Screen 
                name="SensorCharts" 
                component={SensorCharts} 
            />
        </Drawer.Navigator>
    );
};


const RootStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="HomeDrawer"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                } 
            }}   
        >
            <Stack.Screen 
                name="HomeDrawer"
                component={HomeDrawer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                            name="SensorData"
                            component={SensorData}
                            options={{
                                headerShown: false
                            }}
                        />

            <Stack.Screen 
                name="SensorMap"
                component={SensorMap}
                options={{
                    headerTitle: () => <Header name="Sensor Map"/>,
                }}
            />

        </Stack.Navigator>
    );
};

export default RootStack;
