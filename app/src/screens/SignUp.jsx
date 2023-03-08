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

import MapView from 'react-native-maps';

export default function SignUp(props) {

    const { text } = props;

    Geolocation.getCurrentPosition(info => console.log(info));

    return (

        <View>
            <Text>Sign Up</Text>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );

}