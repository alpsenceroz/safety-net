import { StyleSheet, ToastAndroid, View } from "react-native";
import { Button, Text } from "react-native-paper";

import auth from '@react-native-firebase/auth';
import { useEffect } from "react";

export default function ({ navigation }) {



    const user = auth().currentUser;


    useEffect( () => {
        
        const verificationLoop = setInterval( async () => {
            try {
                if(auth().currentUser) {
                    await auth().currentUser.reload()
                    if( auth().currentUser.emailVerified ) {
                        navigation.replace('Main', {screen: "Home"});
                    }
                }
            } catch(e) {

            }


        }, 1000 );
        

        return () => {
            clearInterval(verificationLoop);
        }
    }, [] )

    async function logOut() {
        await auth().signOut();
        navigation.replace('Login');
    }

    async function handleVerification() {
        await user.sendEmailVerification();
        ToastAndroid.show("Verification code has been sent", ToastAndroid.LONG);
    }


    return (
        <View>
            { user && <Text style={styles.message}>Verification code has been sent to {user.email}</Text>}
            <Button style={styles.verificationButton} onPress={handleVerification} mode='contained'>Send Verification Code</Button>
            <Button style={styles.logOutButton} onPress={logOut} mode='contained'>Log Out</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {

    },
    verificationButton: {

    },
    logOutButton:{

    },

})