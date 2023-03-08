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

export default function Login(props) {

    const { text, navigation } = props;

    async function saveToFirestore() {
        await firestore().collection('Tests').add({
            name:"Test1",
            age: 25,
        })
    }

    return (

        <View>
            <Text>Sign In</Text>
            <Button onPress={ () => navigation.navigate( "SignUp" ) }>Navigate</Button>
            <Icon name="rocket" size={30} color="#900" />
            <Button onPress={saveToFirestore}>Save to Firestore</Button>
        </View>
    );

}