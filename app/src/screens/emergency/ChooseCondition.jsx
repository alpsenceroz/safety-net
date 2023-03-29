import React, {useEffect, useState} from 'react';
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
    Checkbox,
    TextInput
} from 'react-native-paper';



const ChooseCondition = ({route, navigation}) => {
    // const [emergency, setEmergency] = useState(route.params.emergency);
    const [evacuation, setEvacuation] = useState(emergency.needEvacuation)
    const [injured, setInjured] = useState(emergency.isInjured)
    const [conditions, setConditions] = useState([])
    
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
                    setEvacuation(!emergency.conditions['evacuation'] )
                    emergency.conditions['evacuation'] = !emergency.conditions['evacuation']

                    }}/>
                <Checkbox.Item
                label="Injured"
                status={injured ? 'checked' : 'unchecked'}
                onPress={() => { 
                    // handleCheckBox("isInjured")
                    setInjured(!emergency.conditions['injured'] )
                    emergency.conditions['injured']= !emergency.conditions['injured']
                    }}/>
                <TextInput 
                    multiline={true}

                    placeholder="Notes" 
                    onChangeText={(text)=>emergency.notes = text}
                    />
                <Button onPress= {() => {
                    navigation.replace("EmergencyReported", {emergency: emergency})
                   //navigation.reset()

                
            }}>Continue</Button>
            </View>
        )

}
export default ChooseCondition