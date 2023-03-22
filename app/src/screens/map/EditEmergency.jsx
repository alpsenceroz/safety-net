


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
} from 'react-native';

import {
    Button,
    List,
    TextInput,
    RadioButton,
    Checkbox,
    Portal
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import SelectLocationModal from "../../components/SelectLocationModal";




const EditEmergency = ({route, navigation}) => {
    const emergencyID = route.params.emergencyID;
    const [emergency, setEmergency] = useState({"doesUserNeed": true, 
    "isInjured": true, "latitude": 36, "longitude": 42, 
    "needEvacuation": true, "otherName": '', "otherNotes": '', 
    "userID": ''})
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalSelection, setModalSelection] = useState(false);
    const [user, setUser] = useState(false)

    
    function handleSelectLocation() {
        setModalVisible(true);
    }

    function hideModal() {
        setModalVisible(false);
    }


    function handleModalConfirm(coordinates) {
        setModalSelection(coordinates);
        setEmergency((prevEmergency) => ({...prevEmergency, latitude: coordinates.latitude, longitude:coordinates.longitude}))
        setModalVisible(false);
    }

    useEffect(() => {
        console.log('BBBBBBBBBBBBBBB')
        const subscription = firestore().collection('emergencies').doc(emergencyID).onSnapshot(
            (snapshot) => {
                setEmergency(snapshot.data())
                console.log(snapshot.data())
                setModalSelection({latitude: snapshot.data().latitude, longitude: snapshot.data().longitude})
            })
        return ()=>{
            subscription()
            }
    }
,[])

    return(
        <View>
            <Portal>
                <SelectLocationModal
                isModalVisible={isModalVisible}
                hideModal={hideModal}
                onConfirm={handleModalConfirm}
                modalSelection={modalSelection}
                />  
            </Portal>
            <Text>Name: {emergency.doesUserNeed ? "": emergency.otherName}</Text>
            <TextInput
            mode="outlined"
            label="Notes"
            value={emergency.otherNotes}
            // error={nameError}
            onChangeText={(text) => setEmergency((prevEmergency) => ({...prevEmergency, otherNotes: text}))} />
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
            <Checkbox.Item
            key={'Rescued'}
            label={'Rescued'}
            status={emergency?.rescued ? 'checked' : 'unchecked'}
            onPress={ () =>  setEmergency((prevEmergency) => ({...prevEmergency, rescued: !emergency.rescued}))}
            />
            <Button onPress={handleSelectLocation}>Edit Location</Button>
            <Button onPress={ async()=> {
                await firestore().collection('emergencies').doc(emergencyID).set(emergency)
                navigation.pop()

            }}>Save Changes</Button>
            <Button onPress={ async()=> {
                await firestore().collection('emergencies').doc(emergencyID).delete()
                navigation.pop()

            }}>Delete Emergency</Button>
            {/* <Button onPress={ async () =>  {
                await firestore().collection('emergencies').doc(emergencyID).set({...emergency, rescued: true})
                navigation.pop()
                }}>Mark as rescued</Button> */}
        </View>
    )
    
}



export default EditEmergency