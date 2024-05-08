import React from 'react';
import {
  SafeAreaView,
  // StyleSheet,
  Text,
  View,
} from 'react-native';
import {Pressable} from 'react-native';

import auth from '@react-native-firebase/auth';

const Home = () => {
  const logOut = async () => {
    await auth().signOut();
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Logged In</Text>
        <View>
          <Pressable>
            <Text onPress={logOut}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
