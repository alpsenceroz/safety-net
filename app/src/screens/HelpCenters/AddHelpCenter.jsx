import { View } from "react-native";
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import helpCenterNeeds from '../../utils/helpCenterNeeds.json'
import { useState } from "react";
import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";

export default function AddHelpCenter({ navigation }) {

    const [chipsData, setChipsData] = useState(helpCenterNeeds.data);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    function setSelectionData(index) {
        const newChipsData = chipsData.map((value) => value);
        const newValue = newChipsData[index].selected ? !newChipsData[index].selected : true;
        newChipsData[index].selected = newValue;
        setChipsData(newChipsData);
    }

    const chips = chipsData.map((data, index) => {
        return (

            <Checkbox.Item
                key={index}
                label={data.name}
                status={data.selected ? 'checked' : 'unchecked'}
                onPress={() => setSelectionData(index)}
            />)
    });



    async function addHelpCenter() {

        filteredNeeds = chipsData.filter( (value) => {
            return value.selected ? value.selected : false;
        } );

        const newHelpCenter = {
            name: name,
            city: citySelection,
            needs: filteredNeeds.map( (value) => value.name ),
        }
        console.log(newHelpCenter)

        await firestore().collection('helpCenters').add(newHelpCenter);

        navigation.pop();
    }

    function handleNameChange(text) {
        setName(text);
    }

    console.log(chipsData)

    return (

        <View>
            <TextInput
                mode="outlined"
                label="Name"
                //placeholder="E-mail"
                error={nameError}
                onChangeText={(text) =>
                    handleNameChange(text)} />
            <DropDown
                label="City"
                mode='outlined'
                visible={isShowDropdown}
                showDropDown={() => setIsShowDropdown(true)}
                onDismiss={() => setIsShowDropdown(false)}
                value={citySelection}
                setValue={setCitySelection}
                list={getCities()}
            ></DropDown>
            {chips}
            <Button onPress={addHelpCenter}>Add Help Center</Button>
        </View>
    )
}