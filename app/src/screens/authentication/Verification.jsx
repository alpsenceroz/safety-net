import { StyleSheet, ToastAndroid, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";

import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import globalStyles from "../../utils/Styles";

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
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View style={{marginHorizontal: 20, marginTop: 100}}>
            <Image
                style={{width: 300, height:300, alignSelf:'center'}}
                source={require('../../assets/verify.png')}
            />
            { user && <Text style={styles.message}>Verification link has been sent to {user.email}</Text>}
            <Button style={styles.verificationButton} onPress={handleVerification} mode='contained'>Send Verification Again</Button>
            <Button style={styles.logOutButton} onPress={logOut} mode='contained'>Log Out</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        color: 'black',
        alignSelf: 'center',
    },
    verificationButton: {
        marginTop: 20,
        ...globalStyles.smallAddButtonBlack,
        backgroundColor: '#EA5753',
    },
    logOutButton:{
        ...globalStyles.smallAddButtonBlack,
        marginTop: 0
    },

})