


import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    // Modal,
    // Pressable
} from 'react-native';

import {
    Button,
    List,
    TextInput,
    RadioButton,
    Checkbox
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';



const EditEmergency = ({route, navigation}) => {
    const emergencyID = route.params.emergencyID;
    const [emergency, setEmergency] = useState({"doesUserNeed": true, 
    "isInjured": true, "latitude": 36, "longitude": 42, 
    "needEvacuation": true, "otherName": '', "otherNotes": '', 
    "userID": ''})
    useEffect(() => {
        console.log('BBBBBBBBBBBBBBB')
        const subscription = firestore().collection('emergencies').doc(emergencyID).onSnapshot(
            (snapshot) => {
                setEmergency(snapshot.data())
                console.log(snapshot.data())
            })
        return ()=>{
            subscription()
            }
    }
,[])

    return(
        <View>
            <TextInput
            mode="outlined"
            label="Notes"
            value={emergency.otherNotes}
            // error={nameError}
            onChangeText={(text) => setEmergency((prevEmergency) => ({...prevEmergency, needEvacuation: text}))} />
            <Checkbox.Item
            key={'Injured'}
            label={'Injured'}
            status={emergency?.isInjured ? 'checked' : 'unchecked'}
            onPress={ () =>  setEmergency((prevEmergency) => ({...prevEmergency, isInjured: !emergency.isInjured}))}
            />
            <Checkbox.Item
            key={'Need Evacuation'}
            label={'Need Evacuation'}
            status={emergency?.needEvacuation ? 'checked' : 'unchecked'}
            onPress={ () =>  setEmergency((prevEmergency) => ({...prevEmergency, needEvacuation: !emergency.needEvacuation}))}
            />
            <Button onPress={ async()=> {
                await firestore().collection('emergencies').doc(emergencyID).set(emergency)
                navigation.pop()

            }}>Save Changes</Button>
            <Button onPress={ async()=> {
                await firestore().collection('emergencies').doc(emergencyID).delete()
                navigation.pop()

            }}>Delete Emergency</Button>
            <Button>Mark as rescued</Button>
        </View>
    )
    
}



export default EditEmergency