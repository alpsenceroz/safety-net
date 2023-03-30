import React, { useState, useEffect } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Button,
    Avatar
} from 'react-native-paper';


import Icon from 'react-native-vector-icons/FontAwesome';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmergencyNavigation from '../../EmergencyNavigation';
import SelfProfile from '../Profiles/SelfProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();



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
            navigation.push('Emergency', {screen: "ChooseLocation"})
        } else  {
            navigation.push('UserProfile', {
                userId: user.uid,
                shouldContinueEmergency: true,
            })
        }

    }
      
    return (

        <View>
            <Pressable
            onPress={() =>{
                navigateProfile()
                }
            }>
            <Avatar.Image 
            style={{alignSelf: 'flex-start', marginStart: 20, marginTop: 20}} 
            size={44} source={require('../../assets/user.png')} 

            />
            </Pressable>
            <Button onPress={handleLogOut}>Log out</Button>
            <Button onPress={handleEmergencyButton}>Help</Button>

        </View>
    );

}