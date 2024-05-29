import React from "react";
import {View, Text} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const Header = (props : any) => {
    return (
        <View 
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}>
            

            <View>
                <Text
                    style={{
                        fontFamily : 'Poppins-Bold',
                        fontSize: FontSize.large,
                        color: Colors.onPrimary,

                    }}
                >
                    {props.name}
                </Text>
            </View>
        </View>
    );
};

export default Header;
