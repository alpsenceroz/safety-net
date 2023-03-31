import { useState } from "react";
import { NativeAppEventEmitter, StyleSheet, ToastAndroid, View, useColorScheme, Image } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";


import auth from '@react-native-firebase/auth';
import globalStyles from "../../utils/Styles";

export default function SignUp({ navigation }) {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function handleMailChange(text) {
        setMail(text);
        setEmailError(false);
    }

    function handlePasswordChange(text) {
        setPassword(text);
        setPasswordError(false);
    }



    function handleSignUp() {

        if (!mail) {
            setEmailError(true);
            return;
        }

        if (!password) {
            setPasswordError(true);
            return;
        }

        auth().createUserWithEmailAndPassword(mail, password)
            .then((value) => {
                value.user.sendEmailVerification();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Verification' }],
                  });
            })
            .catch((err) => {
                ToastAndroid.show(err.message, ToastAndroid.LONG);
            })
    }

    return (
        <View style={{...globalStyles.mainView, justifyContent: 'center'}}>
            <View style={{marginHorizontal: 20}}>
            <Image
        style={{width: 300, height:300, alignSelf:'center', marginTop:-100}}
        source={require('../../assets/sign-up.png')}
      />
                <TextInput
                    style={{...styles.textInput, marginTop: 20}}
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

                <Button onPress={handleSignUp} style={styles.signUpButton} mode='contained'>Sign Up</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {

    },
    signUpButton: {
        marginTop: 20,
        ...globalStyles.smallAddButtonBlack,
        backgroundColor: '#EA5753'

    },

})