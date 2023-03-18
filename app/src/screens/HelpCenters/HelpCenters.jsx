import { FlatList, SectionList, StyleSheet, View, SafeAreaView } from "react-native";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import { Button, Card, Chip, Text } from "react-native-paper";

import auth from '@react-native-firebase/auth';



function HelpCenterItem(props) {
    const { name, provided, city } = props;

    let chips;
    if(provided) {
        chips = provided.map( (item) => {
            console.log("item", item)
            return( <Chip key={item} style={styles.providedChip}>{item}</Chip> )
        } )
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

    const user = auth().currentUser;

    useEffect(() => {

        fetchHelpCenters();

    }, []);


    async function fetchHelpCenters() {

        const newHelpCenters = await firestore().collection('helpCenters').get();
        const formattedData = newHelpCenters.docs.map((item) => {
            return {
                data: item.data(),
                id: item.id,
            }
        })
        setHelpCenters(formattedData);

    }

    function addHelpCenter() {
        navigation.navigate("AddHelpCenter");
    }
    console.log("help centers", helpCenters)

    const yourHelpCenters = helpCenters.filter( (item) => {
        return item.data.user === user.uid;
    } )

    return (
        <SafeAreaView style={{flex: 1}}>
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

            <View>
                <Text style={styles.sectionTitle}>Your Help Centers</Text>
                <FlatList
                    data={yourHelpCenters}
                    renderItem={({ item }) => <HelpCenterItem name={item.data.name} provided={item.data.needs} city={item.data.city} />}
                    keyExtractor={item => item.id}
                />
            </View>

            <View>
                <Text style={styles.sectionTitle}>Help Centers</Text>
                <FlatList
                    data={helpCenters}
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