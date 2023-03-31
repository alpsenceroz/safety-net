import { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View, useColorScheme, Image } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import auth from '@react-native-firebase/auth';
import globalStyles from "../../utils/Styles";

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
        <View style= {{flex: 1, backgroundColor:'#ffffff'}}>
            <View style={{marginHorizontal: 20}}>
            <Image
                style={{width: 300, height:300, alignSelf:'center', marginTop: 80 }}
                source={require('../../assets/sign-in.png')}
            />
            {/* <Text style={{marginTop: 20, textAlign: 'center', color: '#545454', marginBottom: 20 }}>For data accuracy users need to login</Text> */}
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

            <Button labelStyle={{color: '#EA5753'}} style={{alignSelf: 'center', flexWrap: 'wrap'}} onPress={handleForgotPassword}>Forgot Your Password?</Button>
            <Button labelStyle={{fontSize: 20}} onPress={handleLogin} style={{...globalStyles.smallAddButtonBlack, ...styles.loginButton, backgroundColor: '#EA5753'}} mode='contained'>Login</Button>
            <Text style={{alignSelf: 'center', marginTop: 20, color: '#545454'}}>Don't have an account?</Text>
            <Button labelStyle={{color: '#EA5753'}} style={{alignSelf: 'center', flexWrap: 'wrap'}} onPress={handleSignUp}>Sign Up</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {

    },
    loginButton: {
        alignSelf: 'center',
        width: 150,

        justifyContent: 'center',


    },

})