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
    Button, TextInput
} from 'react-native-paper';



const OtherPersonInfo = ({route, navigation}) => {
    // const [emergency, setEmergency] = useState(route.params.emergency)
    
    // const handleName = (text) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, other_name: text}))
    // }
    // const handleNote = (text) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, other_note: text}))
    // }
    emergency = route.params.emergency

        return(
            <View>
                <TextInput 

                placeholder="Name"
                // onChangeText={(text) => handleName(text)}
                onChangeText={(text)=>emergency.otherName = text}
                >
                </TextInput>
                <TextInput 

                placeholder="Other Notes" 
                onChangeText={(text)=>emergency.otherNotes = text}
                ></TextInput>
                <Button onPress={ () => {
                    navigation.navigate("ChooseCondition",{emergency: emergency 
                    })
                    }   
                    }>Continue</Button>

            </View>
        )
}
export default OtherPersonInfo