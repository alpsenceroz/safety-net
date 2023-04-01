import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Image, Chip, Modal, Portal, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import helpCenterNeeds from '../../utils/helpCenterNeeds.json'
import { useState, useEffect, createRef } from "react";
import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import SelectLocationModal from "../../components/SelectLocationModal";

import auth from '@react-native-firebase/auth';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import globalStyles from '../../utils/Styles';

export default function DisplayHelpCenter({ route, navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Help Center Information' });
      }, []);

    const { helpCenterId } = route.params;



    useEffect(() => {

        const newSub = firestore().collection('helpCenters').doc(helpCenterId).onSnapshot(
            (snapshot) => {
                const data = snapshot.data()
                setName(data.name);
                setCitySelection(data.city);
                setAddress(data.address);
                setModalSelection(data.location);

                const newChipsData = helpCenterNeeds.data.map((value) => {
                    if (data.needs.includes(value.name)) {
                        return {
                            ...value,
                            selected: true,
                        };
                    } else {
                        return value;
                    }
                });

                setChipsData(newChipsData);


            }
        );


        return () => {
            newSub();
        }

    }, []);


    const [doesShowMap, setShowMap] = useState(false);
    const [chipsData, setChipsData] = useState(helpCenterNeeds.data);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalSelection, setModalSelection] = useState(false);

    const [address, setAddress] = useState();

    function setSelectionData(index) {
        const newChipsData = chipsData.map((value) => { return { ...value } });
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
                disabled={true}
            />)
    });


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

    function handleShowMap() {
        setShowMap( (current) => !current );
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
                disabled={true}
                //placeholder="E-mail"
                error={nameError}
                onChangeText={(text) =>
                    handleNameChange(text)} />
            <TextInput
                mode="outlined"
                label="Address"
                value={address}
                disabled={true}
                //placeholder="E-mail"
                //error={addressError}
                onChangeText={(text) =>
                    handleAddressChange(text)} />
            <TextInput
                mode="outlined"
                label="City"
                value={citySelection}
                disabled={true} />

            {modalSelection ?
                <Text style={styles.locationText}>Location: {modalSelection.latitude.toFixed(3)}, {modalSelection.longitude.toFixed(3)}</Text>
                :
                <Text style={styles.locationText}>Location: Not Selected</Text>
            }
            <Text style={styles.providedText}>Provided</Text>
            {chips}

            <Checkbox.Item 
            status={doesShowMap ? 'checked' : 'unchecked'}
            onPress={handleShowMap}
            label="Show On Map"
            />

            {modalSelection && doesShowMap &&

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1, margin: 20 }}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: modalSelection.latitude,
                        longitude: modalSelection.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                    {modalSelection && <Marker coordinate={modalSelection} />}
                </MapView>
            }
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

