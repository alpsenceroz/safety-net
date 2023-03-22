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
    
    // const [emergency, setEmergency] = useState({
    //     doesUserNeed: true,
    //     other_name: null,
    //     isInjured: false,
    //     needEvacuation: false,
    //     other_notes: null
    // })
    // useEffect(() => {
    //     console.log('VICTIM:', emergency);
    //     if (emergency.doesUserNeed){
    //         navigation.navigate("ChooseCondition", {emergency: emergency})
    //     }
    //     else{
    //         navigation.navigate("OtherPersonInfo", {emergency: emergency})
    //     }
    //   }, [emergency]
    // )
    // const handleVictimSelect = (value) =>{
    //     setEmergency((prevEmergency) => ({...prevEmergency, "doesUserNeed": value}))
    // }
    emergency = {
        userID: null,
        doesUserNeed: true,
        otherName: null,
        isInjured: false,
        needEvacuation: false,
        otherNotes: null,
        latitude: route.params.location.latitude,
        longitude: route.params.location.longitude,
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
                emergency.doesUserNeed = true
                console.log(emergency)
                navigation.navigate("ChooseCondition", {emergency: emergency})

                }
                }>For myself</Button>
            <Button 
            onPress={() => {
                // handleVictimSelect(false)
                emergency.doesUserNeed = false
                console.log(emergency)
                navigation.navigate("OtherPersonInfo", {emergency: emergency})
                }   
                }>For someone else</Button>
        </View>
    )
}
export default ChooseVictim