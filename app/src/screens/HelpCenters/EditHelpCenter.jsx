import { StyleSheet, ToastAndroid, View } from "react-native";
import { Button, Checkbox, Chip, Modal, Portal, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import helpCenterNeeds from '../../utils/helpCenterNeeds.json'
import { useState, useEffect } from "react";
import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import SelectLocationModal from "../../components/SelectLocationModal";
import globalStyles from '../../utils/Styles';

import auth from '@react-native-firebase/auth';

export default function EditHelpCenter({route, navigation}) {
    useEffect(() => {
        navigation.setOptions({ title: 'Help Center Information' });
      }, []);

    const {helpCenterId} = route.params;

    


    useEffect( () => {
        
        const newSub = firestore().collection('helpCenters').doc(helpCenterId).onSnapshot(
            (snapshot) => {
                const data = snapshot.data()
                setName(data.name);
                setCitySelection(data.city);
                setAddress(data.address);
                setModalSelection(data.location);
                
                const newChipsData = helpCenterNeeds.data.map( (value) => {
                    if( data.needs.includes(value.name) ) {
                        return {
                            ...value,
                            selected: true,
                        };
                   } else {
                    return value;
                   }
                } );

                setChipsData(newChipsData);

            }
        );


        return () => {
            newSub();
        }

    }, [] );



    const [chipsData, setChipsData] = useState(helpCenterNeeds.data);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalSelection, setModalSelection] = useState(false);

    const [address, setAddress] = useState();

    function setSelectionData(index) {
        const newChipsData = chipsData.map((value) => {return {...value}});
        const newValue = newChipsData[index].selected ? !newChipsData[index].selected : true;
        newChipsData[index].selected = newValue;
        setChipsData(newChipsData);
    }

    const chips = chipsData.map((data, index) => {
        return (

            <Checkbox.Item
                key={data.name}
                label={data.name}
                status={data.selected ? 'checked' : 'unchecked'}
                onPress={() => setSelectionData(index)}
            />)
    });



    async function editHelpCenter() {

        filteredNeeds = chipsData.filter((value) => {
        
            return value.selected ? value.selected : false;
        });

        const userId = auth().currentUser.uid;

        if( !(name && citySelection && address && modalSelection && userId) ) {
            ToastAndroid.show('Missing information!', ToastAndroid.LONG);
            return;
        }

        const newHelpCenter = {
            name: name,
            city: citySelection,
            address: address,
            location: modalSelection,
            needs: filteredNeeds.map((value) => value.name),
            user: userId,
            timestamp: (new Date()),
        }

        await firestore().collection('helpCenters').doc(helpCenterId).set(newHelpCenter);

        navigation.pop();
    }

    function handleNameChange(text) {
        setName(text);
    }

    function handleAddressChange(text) {
        setAddress(text);
    }

    function handleSelectLocation() {
        setModalVisible(true);
    }

    function hideModal() {
        setModalVisible(false);
    }


    function handleModalConfirm(coordinates) {
        setModalSelection(coordinates);
        setModalVisible(false);
    }


    return (

        <View style={globalStyles.mainView}>
            <View style={globalStyles.editView}>
            <Portal>
    
                    <SelectLocationModal
                    isModalVisible={isModalVisible}
                    hideModal={hideModal}
                    onConfirm={handleModalConfirm}
                    modalSelection={modalSelection}
                />
                    
                </Portal>
                <TextInput
                    mode="outlined"
                    label="Name"
                    value={name}
                    //placeholder="E-mail"
                    error={nameError}
                    onChangeText={(text) =>
                        handleNameChange(text)} />
                <TextInput
                    mode="outlined"
                    label="Address"
                    value={address}
                    //placeholder="E-mail"
                    //error={addressError}
                    onChangeText={(text) =>
                        handleAddressChange(text)} />
                <DropDown
                    label="City"
                    mode='outlined'
                    visible={isShowDropdown}
                    showDropDown={() => setIsShowDropdown(true)}
                    onDismiss={() => setIsShowDropdown(false)}
                    value={citySelection}
                    setValue={setCitySelection}
                    list={getCities()}
                    dropDownItemStyle={{backgroundColor: "#FCEDEE",}}
                    dropDownItemSelectedStyle={{backgroundColor: "#F8D1D2",}}
                ></DropDown>
                <Button style={globalStyles.smallAddButton} buttonColor='#D0342C' textColor='white' onPress={handleSelectLocation}>Select Location</Button>
                {modalSelection ?
                    <Text style={styles.locationText}>Location: {modalSelection.latitude.toFixed(3)}, {modalSelection.longitude.toFixed(3)}</Text>
                    :
                    <Text style={styles.locationText}>Location: Not Selected</Text>
                }
                <Text style={styles.providedText}>Provided</Text>
                {chips}
                <Button onPress={editHelpCenter}>Edit Help Center</Button>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {

    },
    locationText: {
        textAlign: 'center',
    },
    modalContainerStyle: {
        backgroundColor: 'white',
        padding: 40,
        margin: 20,
        flex: 1,
    },
    providedText:{

    },
})

