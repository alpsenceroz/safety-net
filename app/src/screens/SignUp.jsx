import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';

export default function SignUp(props) {


    const mapRef = React.createRef();


    const { text } = props;

    const [location, setLocation] = useState(null);

    useEffect(() => {
        try {

            Geolocation.getCurrentPosition(info => {
                console.log(info.coords)
                setLocation(info.coords)
            });
        } catch (e) {

        }

    }, [])


    console.log("Location", location)

    function updateLocation() {
        mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })

    }

    return (

        <View>
            <Text>Sign Up</Text>
            <Button onPress={updateLocation}>New Location</Button>
            {location && <Text>{location.latitude} {location.longitude}</Text>}
            <MapView
                ref={mapRef}
                style={
                    {
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,

                    }
                }
                initialRegion={{
                    latitude: location ? location.latitude : 38.78825,
                    longitude: location ? location.longitude : -123.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

            >
                {location &&
                    <Marker
                        coordinate={location}
                        title={"Location"}
                        description={"Your Location"}
                    />
                }
            </MapView>
        </View>
    );

}