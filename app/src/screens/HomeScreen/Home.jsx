import React, { useState, useEffect } from 'react';
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


import Icon from 'react-native-vector-icons/FontAwesome';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmergencyNavigation from '../../EmergencyNavigation';



export default function Home({navigation}) {


    const user = auth().currentUser;


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

    async function navigateProfile() {
        navigation.navigate('UserProfile', {
            userId: user.uid,
            shouldContinueEmergency: false,
        });
    }

    async function handleEmergencyButton() {

        const userData = await firestore().collection('users').doc(user.uid).get();
        if(userData.exists) {
            navigation.navigate('Emergency', {screen: "ChooseVictim"})
        } else  {
            navigation.push('UserProfile', {
                userId: user.uid,
                shouldContinueEmergency: true,
            })
        }

    }
      
    return (

        <View>
            <Button onPress={handleLogOut}>Log out</Button>
            <Button onPress={handleEmergencyButton}>Help</Button>
            <Button onPress={ navigateProfile }>Edit Profile</Button>

        </View>
    );

}