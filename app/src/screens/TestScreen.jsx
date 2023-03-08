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


export default function TestScreen(props) {

    const { text, navigation } = props;

    async function saveToFirestore() {
        await firestore().collection('Tests').add({
            name:"Test1",
            age: 25,
        })
    }

async function signInTest() {
    auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
  
      console.error(error);
    });
}



    return (

        <View>
            <Text>Sign In</Text>
            <Button onPress={ () => navigation.navigate( "SignUp" ) }>Navigate</Button>
            <Icon name="rocket" size={30} color="#900" />
            <Button onPress={saveToFirestore}>Save to Firestore</Button>
            <Button onPress={signInTest}>Sign in test</Button>
        </View>
    );

}