
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text } from 'react-native-paper';

import globalStyles from '../utils/Styles';


export default function AddNewMarker(props) {



  const { navigation, isModalVisible, hideModal, modalSelection } = props;

  useEffect( () => {
    setSelection(modalSelection);
  },[modalSelection] )

   const [selection, setSelection] = useState(modalSelection);


  return (
    <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainerStyle}>
  
      <View style={styles.buttonView}>
        <Button style={globalStyles.smallAddButton} buttonColor='#DB231A' textColor='white' onPress={() => {
            hideModal(true)
            navigation.navigate('Emergency', {screen: 'ChooseVictim', params: {location: modalSelection}})
            }}>Add New Emergency</Button>
        <Button style={globalStyles.smallAddButton}  buttonColor='#438CA3' textColor='white' onPress={() => {
            hideModal(true)
            navigation.push('AddHelpCenter',{location: modalSelection})
        }}>Add New Help Center</Button>
          <Button style={globalStyles.smallAddButton}  buttonColor='#598344' textColor='white' onPress={() => {
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
    marginVertical: '70%',
    marginHorizontal: '20%',
    borderRadius: 20,
    flex: 1,
  },

})
