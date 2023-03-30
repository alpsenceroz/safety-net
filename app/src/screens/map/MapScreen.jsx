import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Pressable,
    Vibration,

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
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/Styles';





const Map = ({navigation}) => {
    const mapRef = useRef(null);
    const user = auth().currentUser;
    const [emergencies, setEmergencies] = useState([])
    const [helpCenters, setHelpCenters] = useState([])
    const [otherNeeds, setOtherNeeds] = useState([])

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [coordinates, setCoordinates] = useState({latitude: 40, longitude: 40})
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
      useEffect(() => {
        mapRef.current?.animateToRegion({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          longitudeDelta: 0.004,
          latitudeDelta: 0,
          })
      }, [coordinates])
      

  if(!loading){
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
          ref = { mapRef }
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
          customMapStyle={globalStyles.map}
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
          //pinColor= {marker.rescued ? 'purple': 'red'}
          coordinate = {{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
              }}
              title = {marker.ID}
          >
            {marker.rescued ?
            // <Icon
            // reverse
            // solid
            // size={20}
            // name='check'
            // type="font-awesome-solid"
            // color='#30c8a9'
            // /> 
            <View>
            <Icon name="map-marker" size={45} color='#30c8a9' />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#ECF0F1',
              position: 'absolute',
              left: 2,
              top: 3,
            }}>
              <Icon style={{
                textAlign: 'center',
                top: 5,
              }} name="check" size={15} color='#30c8a9' />
            </View>
          </View>
              :
            // <Icon
            // reverse
            // size={20}
            // name='exclamation'
            // type="font-awesome"
            // // color='#fc2e63'
            // color='#e90064'
            // /> 
            <View>
            <Icon name="map-marker" size={45} color='#e90064' />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#ECF0F1',
              position: 'absolute',
              left: 2,
              top: 3,
            }}>
              <Icon style={{
                textAlign: 'center',
                top: 5,
              }} name="exclamation" size={15} color='#e90064' />
            </View>
          </View>

            }
            <Callout tooltip onPress={() => {
                (marker.userID === user.uid ? navigation.push('EditEmergency', {emergencyID: marker.ID}): 
                navigation.push('DisplayEmergency', {emergencyID: marker.ID}))
              }}>
              <View style={styles.bubble}>
              <Text style={styles.name}>{marker.ID}</Text>
              <Text>(Click to edit)</Text>
              </View>
   

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
            {/* <Icon
            reverse
            size={20}
            name='hands-helping'
            type="font-awesome"
            //color='#30b8a9'
            color='#0e4ff1'
            /> */}
        <View>
        <Icon name="map-marker" size={45} color='#0e4ff1' />
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 40,
          backgroundColor: '#ECF0F1',
          position: 'absolute',
          left: 2,
          top: 3,
        }}>
          <Icon style={{
            textAlign: 'center',
            top: 5,
          }} name="hands-helping" size={15} color='#0e4ff1' />
        </View>
      </View>

            <Callout tooltip onPress={() => {
              (marker.user === user.uid ? navigation.push('EditHelpCenter', {helpCenterId: marker.ID}) :
               navigation.push('DisplayHelpCenter', {helpCenterId: marker.ID}))
              }} >
              <View style={styles.bubble}>
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
          {/* <Icon
            reverse
            size={20}
            name='bread-slice'
            type="font-awesome"
            color='#ff8d29'/> */}
        <View>
        <Icon name="map-marker" size={45} color='#ff8d29' />
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 40,
          backgroundColor: '#ECF0F1',
          position: 'absolute',
          left: 2,
          top: 3,
        }}>
          <Icon style={{
            textAlign: 'center',
            top: 5,
          }} name="bread-slice" size={15} color='#ff8d29' />
        </View>
      </View>

          <Callout tooltip onPress={() => {
            (marker.user === user.uid ? navigation.push('EditNeeds', {needsId: marker.ID}):
            navigation.push('DisplayNeeds', {needsId: marker.ID}))
            }} >
            <View style={styles.bubble}>
            <Text style={styles.name}>{marker.name}</Text>
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
              //backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              width: "70%",
              marginLeft: "10%",
              // marginRight: "1%",
              marginTop: 20,
            }}>
            {/* icon={() => <Icon name="exclamation" size={10} color='white' />} */}
            <Button  style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,borderTopRightRadius:0,borderBottomRightRadius:0}} buttonColor='#E8C591' textColor='white' onPress={()=>setEmergencyVisibility((emergencyVisibility + 1) % 4)}>Emergencies</Button>
            <Button  style={{justifyContent: 'center', marginHorizontal: 1, borderRadius:0}}  buttonColor='#A4D28D' textColor='white' onPress={()=>setHelpCenterVisibility(!helpCenterVisibility)}>Help Centers</Button>
            <Button  style={{borderTopRightRadius:10,borderBottomRightRadius:10,borderTopLeftRadius:0,borderBottomLeftRadius:0}}  buttonColor='#A4CDDA' textColor='white' onPress={()=>setOtherNeedsVisibility(!otherNeedsVisibility)}>Other Needs</Button>
          </View>
          </Callout>
          
      </View>

    )


  }

}
const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});


export default Map