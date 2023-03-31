import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Pressable
} from 'react-native';

import {
    Button,
    Avatar
} from 'react-native-paper';


import Icon from 'react-native-vector-icons/FontAwesome5';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmergencyNavigation from '../../EmergencyNavigation';



export default function Home({navigation}) {


    const user = auth().currentUser;
    const [userName, setUserName] = useState(false)


    useEffect(()=>{
    const userSub = firestore()
      .collection('users').doc(user.uid)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot.get('name'))
        setUserName(querySnapshot.get('name'))
      })
      return () => {
        userSub()
      }
    }
    ,[])


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

        <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <Pressable style={{flexDirection: 'row'}}
            onPress={() =>{
                navigateProfile()
                }
            }>
            <Avatar.Image 
            style={{alignSelf: 'flex-start', marginStart: 20}} 
            size={44} source={require('../../assets/user.png')} 
            />
            {userName ? <Text style={{marginTop: 9, marginLeft: 10, color: "#000000", fontSize: 16}}>{userName}</Text>: <></>}
            </Pressable>

            <Pressable style={{marginTop: 5, marginRight: 10}}
            onPress={() =>{
                handleLogOut()
                }
            }>
            <Icon name="door-open" size={25} color='#000000' ></Icon>
            </Pressable>

            </View>
            <View style={{...styles.circle1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 200}}>
                <View style={{...styles.circle2, justifyContent: 'center', alignItems: 'center'}}>
                <Pressable style={{...styles.circle3, justifyContent: 'center', alignItems: 'center'}}
                onPress={handleEmergencyButton}
                >
                <Text style={{color: '#ffffff', fontSize: 30, fontFamily: 'sans-serif-medium'}}>Help</Text>
                </Pressable>

                </View>
            </View>
            {/* <Button onPress={handleLogOut}>Log out</Button> */}
            {/* <Button onPress={handleEmergencyButton}>Help</Button> */}
            {/* <Button onPress={ navigateProfile }>Edit Profile</Button> */}

        </View>
    );

}

const styles = StyleSheet.create({
    circle1: {
      width: 300,
      height: 300,
      borderRadius: 300 / 2,
      backgroundColor: "#FCEDEE",
    },
    circle2: {
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        backgroundColor: "#F8D1D2",
      },
    circle3: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: "#EA5753",
    },
  });