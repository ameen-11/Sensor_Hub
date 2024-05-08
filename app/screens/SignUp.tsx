/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  // StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import auth from '@react-native-firebase/auth';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type SingInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type Props = {
  navigation: SingInScreenNavigationProp;
};

const SignUp: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  const signUp = async () => {
    if (value.email === '' || value.password === '') {
      setValue({...value, error: 'Please fill all the fields.'});
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(value.email, value.password);
    } catch (error: any) {
      setValue({...value, error: error.message});
      return;
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font['poppins-bold'],
              marginVertical: Spacing * 3,
            }}>
            Create a new account
          </Text>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: FontSize.large,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Create an account to know your sensor data
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}>
          <TextInput
            placeholderTextColor={Colors.darkText}
            placeholder="Email"
            value={value.email}
            onChangeText={text => setValue({...value, email: text})}
            style={{
              fontFamily: Font['poppins-regular'],
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
          />
          <TextInput
            placeholderTextColor={Colors.darkText}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setValue({...value, password: text})}
            style={{
              fontFamily: Font['poppins-regular'],
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: 'flex-end',
            }}>
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={signUp}
          style={{
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
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SignIn')}
          style={{
            padding: Spacing,
          }}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              color: Colors.text,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Already have an account ?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              color: Colors.primary,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Or Sign Up with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}>
              {/* <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}>
              {/* <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}>
              {/* <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

// const styles = StyleSheet.create({});
