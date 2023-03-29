
import { FlatList, SectionList, StyleSheet, View, SafeAreaView } from "react-native";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

import emergencyConditions from '../../utils/emergencyConditions.json'
import DropDown from "react-native-paper-dropdown";
import { Button, Card, Checkbox, Chip, Text } from "react-native-paper";

import MciIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';

const ALL_CONDITIONS_LABEL = "All Conditions";


const iconMap = new Map();
emergencyConditions.data.forEach( (value) => {
    iconMap.set(value.name, value.icon);
} )



export default function EmergenctList({ navigation }) {

    function EmergencyItem(props) {
        // const { name, provided, city, onPress } = props;
    
        const { name, provided, onPress } = props;
        let chips;
        if (provided) {
            chips = Object.entries(provided).map((item, index) => {
              if (item[1]){
                console.log(index)
                return (<Chip 
                    key={item} 
                    style={styles.providedChip} 
                    icon={() => <MciIcon name={iconMap.get(item[0])} size={30} color="#E90064" />}
                    >{item[0]}</Chip>)
            }})
          }
        
    
          
        const user  = users.filter((item) => {
            return item.id === name
        })[0]
        if (user){
        return (
            <Card style={styles.card} onPress={onPress}>
                <Card.Title
                    title={user.data.name}
                    //subtitle={city}
                />
                <Card.Content style={styles.cardContent}>
                    {chips}
                </Card.Content>
            </Card>
    
        )
    }}

    const [emergencies, setEmergencies] = useState([]);

    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [conditionSelection, setConditionSelection] = useState(null);

    const [onlyUser, setOnlyUser] = useState(false);

    const [users, setUsers] = useState([])



    const user = auth().currentUser;

    useEffect(() => {

        let newSub;
        if (conditionSelection && conditionSelection !== ALL_CONDITIONS_LABEL) {
            newSub = firestore().collection('emergencies').where(`conditions.${conditionSelection}`, '==', true).onSnapshot(
                {
                    next: (snapshot) => {
                        
                        const formattedData = snapshot.docs.map((item) => {
                            return {
                                data: item.data(),
                                id: item.id,
                            }
                        })
                        setEmergencies(formattedData);
                    }
                }
            );

        } else {
            newSub = firestore().collection('emergencies').onSnapshot(
                (querySnapshot) => {
                
                        const formattedData = querySnapshot.docs.map((item) => {
                            return {
                                data: item.data(),
                                id: item.id,
                            }
                        })
                        setEmergencies(formattedData);
                }
                
            );
        }
        let userSub = firestore().collection('users').onSnapshot(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((item) => {
                    return{
                        data: item.data(),
                        id: item.id
                    }
                })
                
            setUsers(data)
            }
        )

        console.log(emergencies)

        return () => {
            newSub();
            userSub();
        }
    }, [conditionSelection]);





    function addEmergency() {
        navigation.push("ChooseLocation");
    }

    function handleConditionSelection(condition) {
        setConditionSelection(condition);
    }

    const yourEmergencies = emergencies.filter((item) => {
        return item.data.userID === user.uid;
    })

    const cc = emergencyConditions.data.map((item) => {
        return({
            label: item.name,
            value: item.name
        }) 
    })
    
    const allConditions = [{
        label: ALL_CONDITIONS_LABEL,
        value: ALL_CONDITIONS_LABEL,
    }].concat(cc);
    console.log(allConditions)


    function handleCardPressEdit(id) {
        navigation.push("EditEmergency", { 
            emergencyID: id,
        });
    }

    function handleCardPressDisplay(id) {
        navigation.push("DisplayEmergency", { 
            emergencyID: id,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button onPress={addEmergency}>Add Emergency</Button>
            <DropDown
                label="Condition"
                mode='outlined'
                visible={isShowDropdown}
                showDropDown={() => setIsShowDropdown(true)}
                onDismiss={() => setIsShowDropdown(false)}
                value={conditionSelection}
                setValue={handleConditionSelection}
                list={allConditions}
            ></DropDown>
            <Checkbox.Item label="Only Your Emergencies" status={onlyUser ? 'checked' : 'unchecked'} onPress={() => setOnlyUser((current) => !current)} />

            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Emergencies</Text>
                <FlatList
                    data={onlyUser ? yourEmergencies : emergencies}
                    //onlyUser ? yourEmergencies : 
                    renderItem={({ item }) => <EmergencyItem 
                    name={item.data.userID} 
                    provided={item ? item.data.conditions: undefined} 
                    //city={item.data.city} 
                    onPress={ item.data.userID === user.uid ? () => handleCardPressEdit(item.id) : () => handleCardPressDisplay(item.id)} 
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
        backgroundColor: 'white',
        marginRight: 10,
    },
    card:{
        backgroundColor: '#f7c8e0'
    }

})