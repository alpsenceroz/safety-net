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
import MapView, { Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';



const EmergencyList = ({navigation}) => {
    


    const [emergencies, setEmergencies] = useState([])
    const [helpCenters, setHelpCenters] = useState([])
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [modalVisible, setModalVisible] = useState(false);
    const [viewType, setViewType] = useState(0)
    const [coordinates, setCoordinates] = useState({latitude: 38, longitude: 40})

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
      // get help centers
      const t2 = firestore()
        .collection('helpCenters')
        .onSnapshot((querySnapshot) =>{
          setHelpCenters( querySnapshot.docs.map((doc) => {
            return ({'ID': doc.id, ...doc.data()})
          }))
        })

      // get current location
      Geolocation.getCurrentPosition(info => {
          console.log(info.coords)
          setCoordinates(info.coords)
        },
        error => {
          console.log(error.code, error.message);},
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )
        setLoading(false)
        return () => {
          t1()
          t2()
        }
      }, [])


  if(!loading){
 
    if (viewType === 1){
      console.log(helpCenters)
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
               latitudeDelta: 0.1,
               longitudeDelta: 0.1,
             }}
          >
          {emergencies[0] != null && emergencies.map(marker => (
            <Marker
            key = {marker.ID}
            coordinate = {{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                title = { marker.ID}
            >
              <Callout onPress={() => {
                  navigation.navigate('MapNav', {screen: 'EditEmergency', params:{userID: marker.ID}})
                }}>
                <Text>{marker.ID}</Text>
                <Text>(Click to edit)</Text>

              </Callout>
            </Marker>
        ))
        }
        {helpCenters[0] != null && helpCenters.map(marker => (

            <Marker
                key = {marker.ID}

                pinColor = 'green'
                coordinate = {{
                    latitude: marker.location.latitude,
                    longitude: marker.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                title = { marker.name }

            >
              <Callout onPress={() => {
                  navigation.navigate('MapNav', {screen: 'EditHelpCenter', params:{helpCenterId: marker.ID}})
                }} >
                <View>
                <Text>{marker.name}</Text>
                <Text>(Click to edit)</Text>

                </View>
              </Callout>
            </Marker>
          ))
        }
            </MapView>
        </View>

      )
    }
    else {
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