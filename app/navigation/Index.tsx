import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const RootNavigation = () => {
  const user: FirebaseAuthTypes.User | null = useAuth();

  return user ? <UserStack /> : <AuthStack />;
};

export default RootNavigation;
