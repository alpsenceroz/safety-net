import React, {useState, useEffect} from 'react';

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,

  } from 'react-native';
  import {
    Button
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import globalStyles from '../../utils/Styles';

  
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
        <View style={{flex: 1, justifyContent: 'space-between'}} backgroundColor = '#FAE3D9'>
            {/* <Text>Victim:{route.params.emergency.other ? route.params.emergency.otherName: "Myself" }</Text> */}
            {/* <Text>Need evacuation: {route.params.emergency.conditions.evacuation? "yes":"no"}</Text>
            <Text>Injured: {route.params.emergency.conditions.injured ? 'yes' : 'no' }</Text> */}
            <Text style={{alignSelf:'center', fontSize:20, color: 'black', marginTop: 100}} >Your situation is reported. Stay calm.</Text>
            <Image
        style={{width: 300, height:300, alignSelf:'center', marginTop:-180}}
        source={require('../../assets/Ambulance-pana.png')}
      />
            {/* <Text>Your location is: </Text> */}

            {/* <Text>Latitude: {JSON.stringify(emergency.coordinates.latitude)}</Text>
            <Text>Longitude: {JSON.stringify(emergency.coordinates.longitude)}</Text> */}
            {/* <Button onPress={ () => navigation.navigate("Main", {screen: 'Home'})}>Return to home screen</Button> */}
            {/* <Button buttonColor='#e90064' textColor='#ffffff' style={{ justifyContent: 'center', alignContent: 'flex-end', alignSelf: 'center', marginBottom: 70, width: 150, height: 40}} onPress={ () => navigation.pop()}>Return back</Button> */}
            <Button onPress={ () => navigation.pop()}>Return back</Button>

        </View>
    )
    }

export default EmergencyReported