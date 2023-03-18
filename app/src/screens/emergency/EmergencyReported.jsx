import React, {useState, useEffect} from 'react';

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform
  } from 'react-native';
  import {
    Button
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

  
//   //import all the components we are going to use.
//   import Geolocation from '@react-native-community/geolocation';

// import {
//     Button
// } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';

// Function to get permission for location

 
const EmergencyReported = ({route, navigation}) => {
    // import all the components we are going to use
    const [location, setLocation] = useState(null);

    useEffect(() => {
        try {
            console.log(route.params.emergency)
            Geolocation.getCurrentPosition(info => {
                console.log(info.coords)
                setLocation(info)
                emergency.latitude = info.coords.latitude
                emergency.longitude = info.coords.longitude
                console.log(emergency)
                saveToFirestore()
            });
        } catch (e) {

        }

    }, [])

    async function saveToFirestore() {
        await firestore().collection('emergencies').add(emergency)
    }
  

  

    return(
        <View>
            <Text>Victim:{route.params.emergency.doesUserNeed ? "Myself" : route.params.emergency.otherName}</Text>
            <Text>Need evacuation: {route.params.emergency.needEvacuation? "yes":"no"}</Text>
            <Text>Injured: {route.params.emergency.isInjured ? 'yes' : 'no' }</Text>
            <Text>Your situation is reported. Stay calm.</Text>
            <Text>Your location is: </Text>

            <Text>Latitude: {location ? JSON.stringify(location.coords.latitude) : null}</Text>
            <Text>Longitude: {location ? JSON.stringify(location.coords.longitude)  : null}</Text>
            <Button onPress={ () => navigation.navigate("Main", {screen: 'Home'})}>Return to home screen</Button>

        </View>
    )
    }

export default EmergencyReported