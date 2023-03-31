import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { ToastAndroid, View } from 'react-native';

import DatePicker from 'react-native-date-picker'

import bloodTypes from '../../utils/bloodTypes.json';
import DropDown from 'react-native-paper-dropdown';
import globalStyles from '../../utils/Styles';

const bloodTypeList = bloodTypes.types.map( (item) => {
    return {
        label: item,
        value: item,
    }

} )

//name (with surname), blood gender, birth date, phone number



export default function SelfProfile({ route, navigation }) {

    const { userId, shouldContinueEmergency } = route.params;

    const [name, setName] = useState();
    const [bloodType, setBloodType] = useState();
    const [birthDate, setBirthDate] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState();

    const [birthDateOpen, setBirthDateOpen] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {

        firestore().collection('users').doc(userId).onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const userData = snapshot.data();

                setName(userData.name);
                setBloodType(userData.bloodType);
                const timestamp = userData.birthDate.seconds * 1000;
                setBirthDate(new Date(timestamp));
                setPhoneNumber(userData.phoneNumber);
            }

        });

    }, []);


    async function saveToFirestore() {

        if( !(name && bloodType && birthDate && phoneNumber) ) {
            ToastAndroid.show('Missing information!', ToastAndroid.LONG);
            return;
        }

        const newUserData = {
            name,
            bloodType,
            birthDate,
            phoneNumber,
        }

        await firestore().collection('users').doc(userId).set(newUserData);
        ToastAndroid.show("Your profile has been updated successfully.", ToastAndroid.LONG);

        if(shouldContinueEmergency) {
            //navigation.replace('Emergency', {screen: "ChooseVictim"});
            navigation.reset({
                index: 1,
                routes: [{ name: 'HomeScreen' }, {name: 'Emergency'}],
              });
        } else {
            navigation.pop();
        }

    }

 

    return (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View style={{marginHorizontal: 20}}>

            <DatePicker
                modal
                open={birthDateOpen}
                date={birthDate}
                mode='date'
                onConfirm={(date) => {
                    setBirthDateOpen(false)
                    setBirthDate(date)
                }}
                onCancel={() => {
                    setBirthDateOpen(false)
                }}
            />



            <TextInput
                mode='outlined'
                label={'Name'}
                value={name}
                onChangeText={setName}
            />
            <DropDown
              label={"Blood Type"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={bloodType}
              setValue={setBloodType}
              list={bloodTypeList}
              dropDownItemStyle={{backgroundColor: "#FCEDEE",}}
              dropDownItemSelectedStyle={{backgroundColor: "#F8D1D2",}}
            />
            <TextInput
                mode='outlined'
                label={'Phone Number'}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button labelStyle={{color: '#ffffff'}} style={globalStyles.smallAddButtonBlack} onPress={() => setBirthDateOpen(true)} mode='outlined'>Birth Date {birthDate ? `(${birthDate.getDate()}.${birthDate.getMonth() + 1}.${birthDate.getFullYear()})` : '(Not Selected)'}</Button>



            <Button  style={globalStyles.smallAddButtonBlack} mode='contained' onPress={saveToFirestore}>Save</Button>
            </View>
        </View>
    )

}