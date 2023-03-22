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





const ChooseLocation = ({navigation, route}) => {
    
    const [location, setLocation] = useState(route.params.location)

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
             latitude: location.latitude ,
             longitude: location.longitude,
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
        <Button onPress={()=>navigation.navigate('ChooseVictim', {location: location})}>Continue</Button>
        <Button onPress={()=>navigation.navigate('ChooseVictim', {location: route.params.location})}>Use My Current Location</Button>
      </View>
        </View>
    )
}
export default ChooseLocation