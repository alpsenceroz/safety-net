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
    Pressable

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
import AddNewMarker from '../../components/AddNewMarker';



const Map = ({navigation}) => {
    const [emergencies, setEmergencies] = useState([])
    const [helpCenters, setHelpCenters] = useState([])
    const [otherNeeds, setOtherNeeds] = useState([])

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [coordinates, setCoordinates] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalSelection, setModalSelection] = useState(false)
    const [emergencyVisibility, setEmergencyVisibility] = useState(0)
    const [helpCenterVisibility, setHelpCenterVisibility] = useState(true)
    const [otherNeedsVisibility, setOtherNeedsVisibility] = useState(true)



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
      // get other needs
      const t3 = firestore()
        .collection('otherNeeds')
        .onSnapshot((querySnapshot) =>{
          setOtherNeeds( querySnapshot.docs.map((doc) => {
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
          t3()
        }
      }, [])


  if(!loading && coordinates ){
    return(
      <View style={{flex: 1}}>
        <Portal>
        <AddNewMarker
        navigation = {navigation}
        isModalVisible={isModalVisible}
        hideModal={()=>setIsModalVisible(false)}
        //onConfirm={handleModalConfirm}
        modalSelection={modalSelection}
        />  
          </Portal>
        <MapView
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={ true }
          showsMyLocationButton={ true }
          onLongPress = {(e)=>{
            setModalSelection(e.nativeEvent.coordinate)

            console.log(e.nativeEvent.coordinate)
            setIsModalVisible(true)
          }}
          // style={{
          //   width : 400 ,
          //   height : 700 
          // }}
          style={{flex: 1}}
          initialRegion={{
              latitude: coordinates.latitude ,
              longitude: coordinates.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
        >
        {emergencies[0] != null && emergencies.filter((item)=> 
        ((emergencyVisibility===0) || (emergencyVisibility === 1 && !item.rescued) ||  (emergencyVisibility === 2 && item.rescued)))
        .map(marker => (
          <Marker
          // key = {marker.ID}
          key={`${marker.ID}-${(Date())}`}

          pinColor= {marker.rescued ? 'purple': 'red'}
          coordinate = {{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
              }}
              title = {marker.ID}
          >
            <Callout onPress={() => {
                navigation.push('EditEmergency', {emergencyID: marker.ID})
              }}>
              <Text>{marker.ID}</Text>
              <Text>(Click to edit)</Text>

            </Callout>
          </Marker>
      ))
      }        
      {helpCenterVisibility && helpCenters[0] != null && helpCenters.map(marker => (

          <Marker
              key = {marker.ID}

              pinColor = {'green'}
              coordinate = {{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
              }}
              title = { marker.name }

          >
            <Callout onPress={() => {
                navigation.push('EditHelpCenter', {helpCenterId: marker.ID})
              }} >
              <View>
              <Text>{marker.name}</Text>
              <Text>(Click to edit)</Text>
              </View>
            </Callout>
          </Marker>
        ))
      }
      {otherNeedsVisibility && otherNeeds[0] != null && otherNeeds.map(marker => (

          <Marker
              key = {marker.ID}

              pinColor = {'yellow'}
              coordinate = {{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
              }}
              title = { marker.name }

          >
            <Callout onPress={() => {
                navigation.push('EditNeeds', {needsId: marker.ID})
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
          <Callout>
          <View
            style={{
              
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 20,
                width: "80%",
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: 20,
              
            }}>
            <Button onPress={()=>setEmergencyVisibility((emergencyVisibility + 1) % 4)}>Emergencies</Button>
            <Button onPress={()=>setHelpCenterVisibility(!helpCenterVisibility)}>Help Centers</Button>
            <Button onPress={()=>setOtherNeedsVisibility(!otherNeedsVisibility)}>Other Needs</Button>
          </View>
          </Callout>
          
      </View>

    )


  }
}


export default Map