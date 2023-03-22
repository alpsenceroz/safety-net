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
    const emergency = route.params.emergency
    const [location, setLocation] = useState({
         latitude: 37.78825,
            longitude: -122.432,
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                console.log(emergency)
                saveToFirestore()

                // Geolocation.getCurrentPosition(info => {
                //     console.log(info.coords)
                //     setLocation(info.coords)
                //     emergency.latitude = info.coords.latitude
                //     emergency.longitude = info.coords.longitude
                //     console.log(emergency)
                //     saveToFirestore()
                // },
                // error => {
                //     // See error code charts below.
                //     console.log(error.code, error.message);},
                // {enableHighAccuracy: true, timeout: 15000, maximumAge: 0}
                // );
    
          });
          return unsubscribe;
    }, [navigation])

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

            <Text>Latitude: {JSON.stringify(emergency.latitude)}</Text>
            <Text>Longitude: {JSON.stringify(emergency.longitude)}</Text>
            <Button onPress={ () => navigation.navigate("Main", {screen: 'Home'})}>Return to home screen</Button>

        </View>
    )
    }

export default EmergencyReported