import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import auth from '@react-native-firebase/auth';

import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';

type HomeScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Home:React.FC<Props>  = ({navigation}) => {
    const logOut = async () => {
        await auth().signOut();
    };

    return (
        <SafeAreaView>
            <View>

                <View>
                    <Text>Logged In</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SensorMap')}
                    style={styleSheet.btnTouchableOp}>
                    <Text
                        style={styleSheet.btnText}>
                        View Maps
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styleSheet.btnTouchableOp}
                    onPress={() => navigation.navigate('Test')}
                >
                    <Text
                        style={styleSheet.btnText}>
                        Test
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styleSheet.btnTouchableOp}>

                    <Text
                        style={styleSheet.btnText}>
                        Start 
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styleSheet.btnTouchableOp}
                >
                    <Text
                        style={styleSheet.btnText}>

                        Stop 
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={logOut}
                    style={styleSheet.btnTouchableOp}>
                    <Text
                        style={styleSheet.btnText}>
                        Logout
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styleSheet = StyleSheet.create({
    btnTouchableOp : {
        margin:Spacing*2,
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
    btnText : {
        fontFamily: 'Poppins-Bold',
        color: Colors.onPrimary,
        textAlign: 'center',
        fontSize: FontSize.large,
    },
});


export default Home;
