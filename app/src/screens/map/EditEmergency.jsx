


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
    const {userID} = route.params;
    const [emergency, setEmergency] = useState(null)
    useEffect(() => {
        console.log('BBBBBBBBBBBBBBB')
        const subscription = firestore().collection('emergencies').doc(userID).onSnapshot(
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
            label="Name"
            value={emergency?.name}
            // error={nameError}
            onChangeText={(text) => setEmergency((prevEmergency) => ({...prevEmergency, needEvacuation: text}))} />
            <Checkbox.Item
            key={'Injured'}
            label={'Injured'}
            status={emergency?.isInjured ? 'checked' : 'unchecked'}
            onPress={ () =>  setEmergency((prevEmergency) => ({...prevEmergency, isInjured: !emergency.isInjured}))}
            />
            <Checkbox.Item
            key={'Need Help'}
            label={'Need Help'}
            status={emergency?.needEvacuation ? 'checked' : 'unchecked'}
            onPress={ () =>  setEmergency((prevEmergency) => ({...prevEmergency, needEvacuation: !emergency.needEvacuation}))}
            />
            <Button>Save Changes</Button>
            <Button>Delete Emergency</Button>
        </View>
    )
    
}



export default EditEmergency