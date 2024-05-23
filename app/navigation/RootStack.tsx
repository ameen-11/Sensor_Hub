import React from 'react';
import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from "react-native-vector-icons/Entypo";

import SensorMap from '../screens/SensorMap';
import Test from '../screens/Test';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import { DrawerActions} from '@react-navigation/native';
import { RootStackParamList } from '../types';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

type UserStackNavigation = NativeStackNavigationProp<
RootStackParamList
>;

type Props = {
    navigation: UserStackNavigation;
};

//navigation using stacks
const UserStack : React.FC<Props> = ({navigation}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft : () => {
                    return (
                        <Icon
                            name="menu"
                            onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())}
                            size={30}
                            color="white"
                        />
                    );
                }
            }}
        >
            <Stack.Screen 
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => <Header name="Home"/>,
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    }
                }}
            />
            <Stack.Screen 
                name="SensorMap"
                component={SensorMap}
                options={{
                    headerTitle: () => <Header name="Sensor Map"/>,
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    }
                }}
            />
            <Stack.Screen
                name="Test"
                component={Test}
                options={{
                    headerTitle: () => <Header name="Test"/>,
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    }
                }}

            /> 
        </Stack.Navigator>
    );
};

//navigation in the drawer
const RootStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="UserStack"
        >
            <Drawer.Screen 
                name="UserStack" 
                component={UserStack} 
                options={{
                    headerShown: false,
                }}
            /> 
            <Drawer.Screen 
                name="Profile" 
                component={Profile}
            />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    );
};

export default RootStack;
