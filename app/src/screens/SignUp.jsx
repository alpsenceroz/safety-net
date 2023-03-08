import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default function SignUp(props) {

    const { text } = props;

    Geolocation.getCurrentPosition(info => console.log(info));

    return (

        <View>
            <Text>Sign Up</Text>
        </View>
    );

}