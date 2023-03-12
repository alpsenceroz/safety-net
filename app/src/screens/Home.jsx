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

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmergencyNavigation from '../EmergencyNavigation';



export default function Home(props) {

    const { text, navigation } = props;


    async function handleLogOut() {
        await auth().signOut();
        navigation.replace('Authentication', {screen: "Login"});
    }


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