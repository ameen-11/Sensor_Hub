import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Text, StyleSheet} from "react-native";

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';


type HomeScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Test: React.FC<Props> = ({navigation}) => {

    return (
        <SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header : {
        height: '100%',
        width: '100%',
    },
});

export default Test;
