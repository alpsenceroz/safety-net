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



const ChooseVictim = ({navigation}) => {
    return(
        <View>
            <Button onPress={ () => navigation.navigate("ChooseCondition")}>For myself</Button>
            <Button onPress={ () => navigation.navigate("ChooseCondition")}>For someone else</Button>
        </View>
    )
}
export default ChooseVictim