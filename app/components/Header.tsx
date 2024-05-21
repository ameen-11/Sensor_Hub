import React from "react";
import {View, Text} from "react-native";
import Colors from "../constants/Colors";

const Header = (props : any) => {
    return (
        <View>
            <View>
                
            </View>

            <View>
                <Text
                    style={{
                        fontFamily : 'Poppins-Bold',
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
