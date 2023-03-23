
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text } from 'react-native-paper';



export default function AddNewMarker(props) {



  const { navigation, isModalVisible, hideModal, modalSelection } = props;

  useEffect( () => {
    setSelection(modalSelection);
  },[modalSelection] )

   const [selection, setSelection] = useState(modalSelection);


  return (
    <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainerStyle}>
  
      <View style={styles.buttonView}>
        <Button onPress={() => {
            hideModal(true)
            navigation.navigate('Emergency', {screen: 'ChooseVictim', params: {location: modalSelection}})
            }}>Add New Emergency</Button>
        <Button onPress={() => {
            hideModal(true)
            navigation.push('AddHelpCenter',{location: modalSelection})
        }}>Add New Help Center</Button>
          <Button onPress={() => {
            hideModal(true)
            navigation.push('AddNeeds', {location: modalSelection})
        }}>Add Other Need</Button>


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
    flexDirection: 'column',
    alignSelf: 'center',
  },
  confirmButton: {
    backgroundColor: 'green',
    margin: 20
  },
  cancelButton: {
    backgroundColor: 'red',
    margin: 20
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 40,
    margin: 20,
    flex: 1,
  },

})
