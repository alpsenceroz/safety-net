import React, {useState, useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';




const ChooseVictim = ({navigation, route}) => {
    
    emergency = {
        userID: null,
        other: false,
        otherName: null,
        conditions: {
            evacuation: false,
            injured: false,
        },
        // isInjured: false,
        // needEvacuation: false,
        notes: null,
        coordinates:{
            latitude: route.params.location.latitude,
            longitude: route.params.location.longitude,
        },
        timestamp: `${(new Date())}`,
        rescued: false
        }

    useEffect( ()=>{
        const id = auth().currentUser.uid
        emergency.userID = id


    },[])

    return(
        <View>
            <Button 
            onPress={() => {
                // handleVictimSelect(true)
                console.log(emergency)
                navigation.replace("ChooseCondition", {emergency: emergency})

                }
                }>For myself</Button>
            <Button 
            onPress={() => {
                // handleVictimSelect(false)
                emergency.other = true
                console.log(emergency)
                navigation.replace("OtherPersonInfo", {emergency: emergency})
                }   
                }>For someone else</Button>
        </View>
    )
}
export default ChooseVictim