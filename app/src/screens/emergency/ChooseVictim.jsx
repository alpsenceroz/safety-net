import React, {useState, useEffect} from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
} from 'react-native';

import {
    Button
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/Styles';




const ChooseVictim = ({navigation, route}) => {

    emergency = {
        userID: null,
        other: false,
        otherName: null,
        conditions: {
            evacuation: false,
            injured: false,
        },
        // isInjured: false,
        // needEvacuation: false,
        notes: null,
        coordinates:{
            latitude: route.params.location.latitude,
            longitude: route.params.location.longitude,
        },
        timestamp: `${(new Date())}`,
        rescued: false
        }

    useEffect( ()=>{
        const id = auth().currentUser.uid
        emergency.userID = id


    },[])

    return(
        <View  style={{flex: 1}} backgroundColor = '#FAE3D9'>
             <Image
        style={{width: 400, height:300, alignSelf:'center', marginTop:-20}}
        source={require('../../assets/victim.png')}
      />
            <Pressable
             style={{ flexDirection: 'column',...globalStyles.button1.style, width: 300, height:150, alignItems: 'center',
                backgroundColor: globalStyles.button1.buttonColor, textColor:globalStyles.button1.textColor,
                borderRadius: 20, marginTop: 50, justifyContent:'center', alignSelf: 'center'
            }}
            onPress={() => {
                // handleVictimSelect(false)
                emergency.other = true
                console.log(emergency)
                navigation.replace("OtherPersonInfo", {emergency: emergency})
                }   
                }>
                    <Text style={{color: 'white'}}>
                    For Someone else
                    </Text>
                    </Pressable>
                
                <Pressable
             style={{ flexDirection: 'column',...globalStyles.button1.style, width: 300, height:150, alignItems: 'center',
                backgroundColor: globalStyles.button1.buttonColor, textColor:globalStyles.button1.textColor,
                borderRadius: 20, marginTop: 20, justifyContent:'center', alignSelf: 'center'
            }}
            onPress={() => {
                // handleVictimSelect(false)
                emergency.other = false
                console.log(emergency)
                navigation.replace("ChooseCondition", {emergency: emergency})
                }   
                }>
                    <Text style={{color: 'white'}}>
                    For Myself
                    </Text>
                    </Pressable>
            

        </View>
    )
}
export default ChooseVictim