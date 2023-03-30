import { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View, useColorScheme } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');


    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const user = auth().currentUser;

    useEffect(() => {
        if (user && !user.emailVerified) {
            navigation.replace("Verification");
        }
    }, [])



    function handleMailChange(text) {
        setMail(text);
        setEmailError(false);
    }

    function handlePasswordChange(text) {
        setPassword(text);
        setPasswordError(false);
    }

    function handleLogin() {
        if (!mail) {
            setEmailError(true);
            return;
        }

        if (!password) {
            setPasswordError(true);
            return;
        }

        auth().signInWithEmailAndPassword(mail, password)
            .then((value) => {
                if (value.user.emailVerified) {
                    navigation.replace('Main', { screen: "Home" });
                } else {
                    navigation.replace('Verification');
                }
            })
            .catch((err) => {
                ToastAndroid.show(err.message, ToastAndroid.LONG);
            })


    }

    async function handleForgotPassword() {
        try {
            if (mail) {
                await auth().sendPasswordResetEmail(mail);
                ToastAndroid.show("Verification sent successfully!", ToastAndroid.LONG);
            } else {
                ToastAndroid.show("Invalid Mail Format", ToastAndroid.LONG);
                setEmailError(true);
            }


        } catch (err) {
            ToastAndroid.show(err.message, ToastAndroid.LONG);
            setEmailError(true);
        }

    }

    function handleSignUp() {
        navigation.navigate('Signup')
    }

    return (
        <View>
            <Text>For data accuracy users need to login</Text>
            <TextInput
                style={styles.textInput}
                mode="outlined"
                label="E-mail"
                textContentType='emailAddress'
                //placeholder="E-mail"
                error={emailError}
                onChangeText={(text) =>
                    handleMailChange(text)} />
            <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Password"
                textContentType='password'
                secureTextEntry
                //placeholder="E-mail"
                error={passwordError}
                onChangeText={(text) =>
                    handlePasswordChange(text)} />

            <Button onPress={handleForgotPassword}>Forgot Your Password</Button>
            <Button onPress={handleLogin} style={styles.loginButton} mode='contained'>Login</Button>
            <Text>Don't have an account?</Text>
            <Button onPress={handleSignUp}>Sign Up</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {

    },
    loginButton: {

    },

})