import { FlatList, SectionList, StyleSheet, View, SafeAreaView } from "react-native";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

import needsNeeds from '../../utils/userNeeds.json'
import DropDown from "react-native-paper-dropdown";
import getCities from "../../utils/getCities";
import { Button, Card, Checkbox, Chip, Text } from "react-native-paper";

import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';

const ALL_CITIES_LABEL = "All Cities";

const iconMap = new Map();
needsNeeds.data.forEach( (value) => {
    iconMap.set(value.name, value.icon);
} )

function NeedsItem(props) {
    const { name, provided, city, onPress } = props;

    let chips;
    if (provided) {
        chips = provided.map((item) => {
            return (<Chip 
                key={item} 
                style={styles.providedChip} 
                icon={() => <MciIcon name={iconMap.get(item)} size={30} color="#0e4ff1" />}
                >{item}</Chip>)
        })
    }


    return (
        <Card onPress={onPress}>
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

export default function Needs({ navigation }) {


    const [needs, setHelpCenters] = useState([]);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [citySelection, setCitySelection] = useState(null);

    const [onlyUser, setOnlyUser] = useState(false);



    const user = auth().currentUser;

    useEffect(() => {

        let newSub;

        if (citySelection && citySelection !== ALL_CITIES_LABEL) {
            newSub = firestore().collection('otherNeeds').where("city", "==", citySelection).onSnapshot(
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
            newSub = firestore().collection('otherNeeds').onSnapshot(
                (querySnapshot) => {
                
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
        navigation.navigate("AddNeeds");
    }

    function handleCitySelection(city) {
        setCitySelection(city);
    }

    const yourHelpCenters = needs.filter((item) => {
        return item.data.user === user.uid;
    })


    const allCities = [{
        label: ALL_CITIES_LABEL,
        value: ALL_CITIES_LABEL,
    }, ...getCities()];


    function handleCardPressEdit(id) {
        navigation.push("EditNeeds", {
            needsId: id,
        });
    }

    function handleCardPressDisplay(id) {
        navigation.push("DisplayNeeds", {
            needsId: id,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button onPress={addHelpCenter}>Add Needs</Button>
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
            <Checkbox.Item label="Only Your Needs" status={onlyUser ? 'checked' : 'unchecked'} onPress={() => setOnlyUser((current) => !current)} />

            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Needs</Text>
                <FlatList
                    data={onlyUser ? yourHelpCenters : needs}
                    renderItem={({ item }) => <NeedsItem 
                    name={item.data.name} 
                    provided={item.data.needs} 
                    city={item.data.city} 
                    onPress={ item.data.user === user.uid ? () => handleCardPressEdit(item.id) : () => handleCardPressDisplay(item.id)} 
                    />
                }
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
        backgroundColor: 'lightblue',
        marginRight: 10,

    },

})