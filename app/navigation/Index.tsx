import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthStack from './AuthStack';
import RootStack from './RootStack';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const RootNavigation = () => {
  const user: FirebaseAuthTypes.User | null = useAuth();

  return user ? <RootStack /> : <AuthStack />;
};

export default RootNavigation;
