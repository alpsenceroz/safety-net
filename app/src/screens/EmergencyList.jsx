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
    List
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';



const EmergencyList = ({navigation}) => {
    


    const [emergencies, setEmergencies] = useState([])
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [modalVisible, setModalVisible] = useState(false);
    const [viewType, setViewType] = useState(0)
    const [coordinates, setCoordinates] = useState({latitude: 39, longitude: 40})



    
    const getEmergencies = async () => {
      setLoading(true)
      temp = []
        const unsubscribe = firestore()
        .collection('emergencies')
        .onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc) => {
            temp.push({'ID': doc.id, ...doc.data()})
          })
        })
        console.log(temp)
        setEmergencies(temp)
        setLoading(false)

    
    }

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

          getEmergencies()
          Geolocation.getCurrentPosition(info => 
            {
              console.log(info.coords)
              setCoordinates(info.coords)

            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);},
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            )
            

      })
    return unsubscribe
  }
    , [navigation])
  if(!loading){

    if (viewType === 1){
      return(
        <View>
          <Button onPress={() => setViewType(0)}> Switch View</Button>
          <Text>map view</Text>

          <MapView
            provider={ PROVIDER_GOOGLE }
            showsUserLocation={ true }
            followsUserLocation = { true }
            style={{
              width : 500 ,
              height : 800 
            }}
            initialRegion={{
               latitude: coordinates.latitude ,
               longitude: coordinates.longitude,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
             }}
          >
 {emergencies[0] != null && emergencies.map((marker, index) => (
            <Marker
                key = {index}
                coordinate = {{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                title = { marker.UserID}
            />
        ))
 }

            </MapView>
        </View>

      )
    }
    else {
      console.log(emergencies)
      return(

      <View>
      <Button onPress={() => setViewType(1)}> Switch View</Button>
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
}

export default EmergencyList