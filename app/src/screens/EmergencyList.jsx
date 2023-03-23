import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    // Modal,
    // Pressable
} from 'react-native';

import {
    Button,
    List,
    SegmentedButtons,
    Portal
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import MapView, { Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AddNewMarker from '../components/AddNewMarker';



const EmergencyList = ({navigation}) => {
    


    const [emergencies, setEmergencies] = useState([])
    const [loading, setLoading] = useState(true); // Set loading to true on component mount

    useEffect(  () => {
      console.log('AAAAAAAAAAAAAAAAAAAA')
      setLoading(true)
   
      // get emergencies
      const t1 = firestore()
        .collection('emergencies')
        .onSnapshot((querySnapshot) =>{
          setEmergencies( querySnapshot.docs.map((doc) => {
            return({'ID': doc.id, ...doc.data()})
          }))
        })

        setLoading(false)
        return () => {
          t1()
        }
      }, [])


  if(!loading){

      return(

      <View>
          <FlatList
            data ={ emergencies }
            extraData={ emergencies }
            renderItem={({item}) => <List.Item
              title={item.ID}
              description={`Need Evacuation: ${item.needEvacuation ? 'yes' : 'no'}`}
              left={props => <List.Icon {...props} icon="folder" />}
              // onPress={() => setModalVisible(!modalVisible)}
            />}
            keyExtractor={(item) => {
              return item.ID;
            }}

          />
      </View>
      )
    }

  
}

export default EmergencyList