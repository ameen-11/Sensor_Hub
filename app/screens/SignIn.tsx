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

const SignIn: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  const signIn = async () => {
    if (value.email === '' || value.password === '') {
      setValue({...value, error: 'Please fill all the fields.'});
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(value.email, value.password);
      navigation.navigate('Home');
    } catch (error: any) {
      setValue({...value, error: error.message});
      return;
    }
  };

  const signUp = () => {
    navigation.navigate('SignUp');
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
              fontFamily: 'Poppins-Bold',
              marginVertical: Spacing * 3,
            }}>
            Login here
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: FontSize.large,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Welcome back you've been missed!
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
              fontFamily: 'Poppins-Regular',
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
              fontFamily: 'Poppins-Regular',
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
              fontFamily: 'Poppins-SemiBold',
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: 'flex-end',
            }}>
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={signIn}
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
              fontFamily: 'Poppins-Bold',
              color: Colors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signUp}
          style={{
            padding: Spacing,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.text,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: Colors.primary,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}>
            Or continue with
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

// const styles = StyleSheet.create({});

export default SignIn;
