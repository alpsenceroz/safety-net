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

import {
    Button
} from 'react-native-paper';


const EmergencyReported = ({navigation}) => {
    return(
        <View>
            <Text>Your situation is reported. Stay calm.</Text>
            <Button onPress={ () => navigation.navigate("Home")}>Return to home screen</Button>
        </View>
    )
}

export default EmergencyReported