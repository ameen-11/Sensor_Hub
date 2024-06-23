/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  HomeDrawer: {screen: keyof RootStackParamList};
  SensorMap: undefined;
  SensorData: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  verifyEmail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
