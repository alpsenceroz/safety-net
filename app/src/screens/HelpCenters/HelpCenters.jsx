import { SectionList, View } from "react-native";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import { Button } from "react-native-paper";



export default function HelpCenters({navigation}) {


    const [helpCenters, setHelpCenters] = useState([]);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    useEffect(() => {

        fetchHelpCenters();

    }, []);


    async function fetchHelpCenters() {

        const newHelpCenters = await firestore().collection('helpCenters').get();
        setHelpCenters(newHelpCenters);

    }

    function addHelpCenter() {
        navigation.navigate("AddHelpCenter");
    }

    return (
        <View>
            <Button onPress={addHelpCenter}>Add Help Center</Button>
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
            
        </View>
    )

}