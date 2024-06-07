/* eslint-disable react-native/no-inline-styles */
import { 
    SafeAreaView, 
    StyleSheet, 
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
import { Image } from 'react-native';

type SingInScreenNavigationProp = NativeStackNavigationProp< 
RootStackParamList, 
'SignIn' >; 
type Props = { navigation: SingInScreenNavigationProp; };
type userInfo = { 
    email : string; 
    password: string; 
    error: string | null;
};

const SignUp: React.FC<Props> = ({navigation}) => {
    const [value, setValue] = React.useState<userInfo>({
        email: '',
        password: '',
        error: '',
    });

    const [ isLoading, setLoading ] = React.useState(false);

    const signUp = async () => {
        if (value.email === '' || value.password === '') {
            setValue({...value, error: 'Please fill all the fields.'});
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value.email)) {
            setValue({...value, error: 'Please enter a valid email address.'});
            return;
        }

        try {
            setLoading(true);
            await auth().createUserWithEmailAndPassword(
                value.email.replace(' ',''),
                value.password
            );
            setLoading(false);
        } catch (error: any) {
            if(
                error.code == 'auth/email-already-exists' 
                || error.code == 'auth/email-already-in-use'
            ) {
                setValue({...value, error: 'email already exists'});
                setLoading(false);
                return;
            }else if(error.code === 'auth/weak-password') {
                setValue({...value, error: 'weak-password'});
                setLoading(false);
                return;
            }

            setValue({
                ...value,
                error: 'internal server error or check your internet connection'
            });
            console.log(error.code);
            setLoading(false);
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
            style={styleSheet.heading1}>
            Create a new account
          </Text>
          <Text
            style={styleSheet.heading2}>
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
            style={styleSheet.textIn}
          />
          <TextInput
            placeholderTextColor={Colors.darkText}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setValue({...value, password: text})}
            style={styleSheet.textIn}
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
        
        {value.error != null && 
            <View>
                <Text style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: FontSize.small,
                    color: 'red'
                }}>
                    {value.error}
                </Text>
            </View>
        }

        <TouchableOpacity
            onPress={signUp}
            style={styleSheet.btnTouchableOp}>
            <Text
                style={styleSheet.btnText}>
                {isLoading ? 'Creating account' : 'Sign Up'}
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
              fontFamily: 'poppins-semiBold',
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
              fontFamily: 'poppins-semiBold',
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
              style={styleSheet.iconsTouchableOp}>
               <Image source={require('../../assets/facebook.png')}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styleSheet.iconsTouchableOp}>
               <Image source={require('../../assets/search.png')}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styleSheet.iconsTouchableOp}>
               <Image source={require('../../assets/microsoft.png')}/>
            </TouchableOpacity>
         </View>

        </View>

      </View>
    </SafeAreaView>
  );
};

    const styleSheet = StyleSheet.create({
        heading1 : {
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: 'Poppins-Bold',
            marginVertical: Spacing * 3,
        },
        heading2 : { 
            fontFamily: 'Poppins-SemiBold',
            fontSize: FontSize.large,
            maxWidth: '60%',
            textAlign: 'center',
        }, 
        textIn :{
            fontFamily: 'Poppins-Regular',
            fontSize: FontSize.small,
            padding: Spacing * 2,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            marginVertical: Spacing,
        } ,
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
        iconsTouchableOp: {
            padding: Spacing,
            backgroundColor: Colors.gray,
            borderRadius: Spacing / 2,
            marginHorizontal: Spacing,
        },
    });


export default SignUp;

