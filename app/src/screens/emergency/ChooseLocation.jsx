import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Button
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import MapView, { Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';





const ChooseLocation = ({navigation, route}) => {
    

    const [location, setLocation] = useState(false)  
    const [myLocation, setMyLocation] = useState(false)  

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            console.log(info.coords)
            setLocation(info.coords)
            setMyLocation(info.coords)

          },
          error => {
            console.log(error.code, error.message);},
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
          )
    }, [])
    if(location){
    return(
        <View>
    <Text>Select Location</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
            width : 400 ,
            height : 700 
          }}
          initialRegion={{
             latitude: (location ? location.latitude : 36),
             longitude: (location ? location.longitude : 30),
             latitudeDelta: 0.1,
             longitudeDelta: 0.1,
           }}
        showsUserLocation={true}
        onLongPress={(e) => setLocation(
            {latitude: e.nativeEvent.coordinate.latitude, 
            longitude: e.nativeEvent.coordinate.longitude}
            )}
      >
        { location && <Marker coordinate={location}/>}
      </MapView>
      <View>
        <Button onPress={()=>navigation.replace('ChooseVictim', {location: location})}>Continue</Button>
        <Button onPress={()=>navigation.replace('ChooseVictim', {location: location})}>Use My Current Location</Button>
      </View>
        </View>
    )
            }
}
export default ChooseLocation