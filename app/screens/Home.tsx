import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import {Pressable} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

import auth from '@react-native-firebase/auth';

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
                <View>
                    <Pressable>
                        <Text onPress={logOut}>Logout</Text>
                    </Pressable>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SensorMap')}
                    style={{
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
                    }}>
                    <Text
                        style={{
                            fontFamily: Font['poppins-bold'],
                            color: Colors.onPrimary,
                            textAlign: 'center',
                            fontSize: FontSize.large,
                        }}>
                        View Maps
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default Home;
