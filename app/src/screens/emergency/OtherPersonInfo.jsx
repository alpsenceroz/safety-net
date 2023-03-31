import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    useColorScheme,
    View,
} from 'react-native';

import {
    Button, TextInput
} from 'react-native-paper';
import globalStyles from '../../utils/Styles';



const OtherPersonInfo = ({route, navigation}) => {
    // const [emergency, setEmergency] = useState(route.params.emergency)
    
    // const handleName = (text) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, other_name: text}))
    // }
    // const handleNote = (text) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, other_note: text}))
    // }
    emergency = route.params.emergency

    const handleContinue = () => {
        if(emergency.otherName) {
            navigation.replace("ChooseCondition",{emergency: emergency})
        } else {
            ToastAndroid.show("Missing name", ToastAndroid.LONG);
        }
        
    }

        return(
            <View style={{flex: 1}}backgroundColor = '#FAE3D9'>
                <TextInput 
                   mode="outlined"
                   outlineColor='#e90064'
                placeholder="Name"
                // onChangeText={(text) => handleName(text)}
                onChangeText={(text)=>emergency.otherName = text}
                >
                </TextInput>
                
                <Button 
                buttonColor= {globalStyles.button1.buttonColor} 
                textColor={globalStyles.button1.textColor} 
                style={ {...globalStyles.button1.style, marginTop: 20, alignSelf: 'center', width: 100, justifyContent:'center'}}
                onPress={ () => {
                        handleContinue()
                    }   
                    }>Continue</Button>

            </View>
        )
}
export default OtherPersonInfo