import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

import {
    Button,
    Checkbox
} from 'react-native-paper';


const ChooseCondition = ({route, navigation}) => {
    // const [emergency, setEmergency] = useState(route.params.emergency);
    const [evacuation, setEvacuation] = useState(emergency.needEvacuation)
    const [injured, setInjured] = useState(emergency.isInjured)
    
    // useEffect(() => {
    //     console.log('CONDITION:', emergency);
    //   }, [emergency]
    // )
    // const handleCheckBox = (key) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, [key]: !prevEmergency[key]}))
    // }

 
    emergency = route.params.emergency

        return(
            <View>
                <Checkbox.Item
                label="Need Evacuation"
                status={evacuation ? 'checked' : 'unchecked'}
                onPress={() => { 
                    // handleCheckBox("needEvacuation")
                    setEvacuation(!emergency['needEvacuation'] )
                    emergency.needEvacuation = !emergency['needEvacuation'] 

                    }}/>
                <Checkbox.Item
                label="Injured"
                status={injured ? 'checked' : 'unchecked'}
                onPress={() => { 
                    // handleCheckBox("isInjured")
                    setInjured(!emergency['isInjured'] )
                    emergency['isInjured']= !emergency['isInjured']
                    }}/>
                <Button onPress= {() => {
                    navigation.navigate("EmergencyReported", {emergency: emergency})

                
            }}>Continue</Button>
            </View>
        )

}
export default ChooseCondition