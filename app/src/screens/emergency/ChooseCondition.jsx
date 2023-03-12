import React, {useState} from 'react';
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
    Button,
    Checkbox
} from 'react-native-paper';




const ChooseCondition = ({navigation}) => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    return(
        <View>
            <Checkbox.Item
            label="Need Evacuation"
            status={checked1 ? 'checked' : 'unchecked'}
            onPress={() => { setChecked1(!checked1);}}/>
            <Checkbox.Item
            label="Injured"
            status={checked2 ? 'checked' : 'unchecked'}
            onPress={() => { setChecked2(!checked2);}}/>
            <Button onPress={ () => navigation.navigate("EmergencyReported")}>Continue</Button>
        </View>
    )
}
export default ChooseCondition