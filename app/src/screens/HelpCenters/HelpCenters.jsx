import { FlatList, SectionList, StyleSheet, View, SafeAreaView } from "react-native";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import { Button, Card, Checkbox, Chip, Text } from "react-native-paper";

import auth from '@react-native-firebase/auth';

const ALL_CITIES_LABEL = "All Cities";

function HelpCenterItem(props) {
    const { name, provided, city } = props;

    let chips;
    if (provided) {
        chips = provided.map((item) => {
            console.log("item", item)
            return (<Chip key={item} style={styles.providedChip}>{item}</Chip>)
        })
    }


    return (
        <Card>
            <Card.Title
                title={name}
                subtitle={city}
            />
            <Card.Content style={styles.cardContent}>
                {chips}
            </Card.Content>
        </Card>

    )
}

export default function HelpCenters({ navigation }) {


    const [helpCenters, setHelpCenters] = useState([]);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    const [onlyUser, setOnlyUser] = useState(false);



    const user = auth().currentUser;

    useEffect(() => {

        let newSub;

        if (citySelection && citySelection !== ALL_CITIES_LABEL) {
            newSub = firestore().collection('helpCenters').orderBy("timestamp").where("city", "==", citySelection).onSnapshot(
                {
                    next: (snapshot) => {
                        
                        const formattedData = snapshot.docs.map((item) => {
                            return {
                                data: item.data(),
                                id: item.id,
                            }
                        })
                        setHelpCenters(formattedData);
                    }
                }
            );

        } else {
            newSub = firestore().collection('helpCenters').onSnapshot(
                (querySnapshot) => {
                
                        console.log("snapshot", querySnapshot)
                        const formattedData = querySnapshot.docs.map((item) => {
                            return {
                                data: item.data(),
                                id: item.id,
                            }
                        })
                        setHelpCenters(formattedData);
                }
                
            );
        }


        return () => {
            newSub();
        }
    }, [citySelection]);





    function addHelpCenter() {
        navigation.navigate("AddHelpCenter");
    }
    console.log("help centers", helpCenters)

    function handleCitySelection(city) {
        setCitySelection(city);
    }

    const yourHelpCenters = helpCenters.filter((item) => {
        return item.data.user === user.uid;
    })


    const allCities = [{
        label: ALL_CITIES_LABEL,
        value: ALL_CITIES_LABEL,
    }, ...getCities()];



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button onPress={addHelpCenter}>Add Help Center</Button>
            <DropDown
                label="City"
                mode='outlined'
                visible={isShowDropdown}
                showDropDown={() => setIsShowDropdown(true)}
                onDismiss={() => setIsShowDropdown(false)}
                value={citySelection}
                setValue={handleCitySelection}
                list={allCities}
            ></DropDown>
            <Checkbox.Item label="Only Your Help Centers" status={onlyUser ? 'checked' : 'unchecked'} onPress={() => setOnlyUser((current) => !current)} />

            <View>
                <Text style={styles.sectionTitle}>Help Centers</Text>
                <FlatList
                    data={onlyUser ? yourHelpCenters : helpCenters}
                    renderItem={({ item }) => <HelpCenterItem name={item.data.name} provided={item.data.needs} city={item.data.city} />}
                    keyExtractor={item => item.id}
                />

            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    textInput: {

    },
    locationText: {
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        textAlign: 'center',
    },
    cardContent: {
        flexDirection: 'row',
    },
    providedChip: {
        backgroundColor: 'green',
    },

})