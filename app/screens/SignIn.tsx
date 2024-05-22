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
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

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
React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: "799001895781-l03tk5816d294si6655kifcumtdf19lj.apps.googleusercontent.com",
      offlineAccess: true
    });
  }, [])
  const GoogleSignUp = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn().then(result => { console.log(error) });
        navigation.navigate('Home');
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert('User cancelled the login flow !');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          alert('Signin in progress');
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert('Google play services not available or outdated !');
          // play services not available or outdated
        } else {
          console.log(error)
        }
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
            Login here
          </Text>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
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
              fontFamily: Font['poppins-bold'],
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
              fontFamily: Font['poppins-semiBold'],
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
              fontFamily: Font['poppins-semiBold'],
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
                padding: Spacing*2,
                backgroundColor: Colors.gray,
                borderRadius: Spacing/2,
                marginHorizontal: Spacing,
       }}
               onPress={GoogleSignUp}
              >
              {/* <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing*2,
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
                padding: Spacing*2,
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
