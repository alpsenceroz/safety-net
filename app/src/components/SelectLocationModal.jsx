
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Modal, Text } from 'react-native-paper';



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
        showsUserLocation={true}
        onLongPress={(e) => handleMapClick(e.nativeEvent.coordinate)}
      >
        {selection && <Marker coordinate={selection} />}
      </MapView>
      <View style={styles.buttonView}>
        <Button mode='contained' style={styles.cancelButton} onPress={hideModal}>Cancel</Button>
        {userLocation && <Button mode='contained' style={styles.userLocationButton} onPress={() => onConfirm(userLocation)}>Use User Location</Button>}
        <Button mode='contained' style={styles.confirmButton} disabled={selection ? false : true} onPress={() => onConfirm(selection)}>Confirm</Button>

      </View>

    </Modal>


  )



}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  confirmButton: {
    backgroundColor: 'green',
    marginRight: 7,
    marginLeft: 7,
  },
  userLocationButton: {
    backgroundColor: 'blue',
    marginRight: 7,
    marginLeft: 7,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginRight: 7,
    marginLeft: 7,
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 40,
    margin: 20,
    flex: 1,
  },

})
