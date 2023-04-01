
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Modal, Text } from 'react-native-paper';
import globalStyles from '../utils/Styles';



export default function SelectLocation(props) {



  const { isModalVisible, hideModal, onConfirm, modalSelection } = props;

  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      if (info?.coords) {
        setUserLocation(info.coords);
      }
    }, (err) => {

    });
  }, [])

  useEffect(() => {
    setSelection(modalSelection);
  }, [modalSelection])

  const [selection, setSelection] = useState(modalSelection);
  function handleMapClick(coordinate) {
    setSelection(coordinate);
  }



  return (
    <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainerStyle}>
      <Text style={styles.title}>Select Location</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={globalStyles.map}
        showsUserLocation={true}
        onLongPress={(e) => handleMapClick(e.nativeEvent.coordinate)}
        initialRegion={{
          latitude: 39,
          longitude: 33.5,
          latitudeDelta: 10,
          longitudeDelta: 12,
        }}
      >
        {selection && <Marker coordinate={selection} />}
      </MapView>
      <View style={styles.buttonView}>
        <Button mode='contained' style={styles.cancelButton} onPress={hideModal}>Cancel</Button>
        {userLocation && <Button mode='contained' style={styles.userLocationButton} onPress={() => onConfirm(userLocation)}>My Location</Button>}
        <Button mode='contained' style={styles.confirmButton} disabled={selection ? false : true} onPress={() => onConfirm(selection)}>Confirm</Button>

      </View>

    </Modal>


  )



}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  confirmButton: {
    backgroundColor: '#3A6351',

  },
  userLocationButton: {
    backgroundColor: '#4694AC',

  },
  cancelButton: {
    backgroundColor: '#D0342C',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 30,
    margin: 20,
    flex: 1,
  },

})
