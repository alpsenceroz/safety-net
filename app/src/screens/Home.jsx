import React from 'react';
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

import SignUp from './SignUp';

import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmergencyNavigation from '../EmergencyNavigation';



export default function Home(props) {

    const { text, navigation } = props;


    async function handleLogOut() {
        await auth().signOut();
        navigation.replace('Authentication', {screen: "Login"});
    }


    // Geolocation.getCurrentPosition(
    //     //Will give you the current location
    //     (position) => {
    //       //getting the Longitude from the location json
    //       const currentLongitude =
    //         JSON.stringify(position.coords.longitude);
      
    //       //getting the Latitude from the location json
    //       const currentLatitude =
    //         JSON.stringify(position.coords.latitude);
            
    //      }, (error) => alert(error.message), { 
    //        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
    //      }
    //   );
      
    return (

        <View>
            <Text>Sign In</Text>
            <Button onPress={ () => navigation.navigate( "SignUp" ) }>Navigate</Button>
            <Icon name="rocket" size={30} color="#900" />
            <Button onPress={handleLogOut}>Log out</Button>
            <Button onPress={ () => navigation.navigate('Emergency', {screen: "ChooseVictim"})} >Help</Button>

        </View>
    );

}