import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
} from 'react-native';

import {
    Button,
    Checkbox,
    TextInput
} from 'react-native-paper';

import globalStyles from '../../utils/Styles';



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

            <View style={{flex: 1}}backgroundColor = '#FAE3D9'>
                <Image
        style={{width: 350, height:300, alignSelf:'center', marginTop:80, marginBottom:80}}
        source={require('../../assets/condition.png')}
      />
                <View style={{backgroundColor:'#ffffff'}}>
                <Checkbox.Item
                label="Need Evacuation"
                color='#e90064'
                style={{marginTop: 0, backgroundColor:'#ffffff'}}
                status={evacuation ? 'checked' : 'unchecked'}
                onPress={() => { 
                    // handleCheckBox("needEvacuation")
                    setEvacuation(!emergency.conditions['evacuation'] )
                    emergency.conditions['evacuation'] = !emergency.conditions['evacuation']

                    }}/>
                <Checkbox.Item
                label="Injured"
                color='#e90064'
                status={injured ? 'checked' : 'unchecked'}
                onPress={() => { 
                    // handleCheckBox("isInjured")
                    setInjured(!emergency.conditions['injured'] )
                    emergency.conditions['injured']= !emergency.conditions['injured']
                    }}/>
                <TextInput 
                    multiline={true}
                    mode="outlined"
                    outlineColor='#e90064'

                    placeholder="Notes" 
                    onChangeText={(text)=>emergency.notes = text}
                    />
                    </View>
                <Button buttonColor= {globalStyles.button1.buttonColor} textColor={globalStyles.button1.textColor} style={ {...globalStyles.button1.style, marginTop: 20, alignSelf: 'center', width: 100, justifyContent:'center'} }onPress= {() => {
                    navigation.replace("EmergencyReported", {emergency: emergency})
                   //navigation.reset()

                
            }}>Continue</Button>
            </View>
        )

}
export default ChooseCondition