import React from 'react';
import { View, Text, Button } from 'react-native';
import DatapointAdditionModal from '../components/DatapointAdditionModal';

export default function DatapointsScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='Add Datapoint' onPress={() => setModalVisible(true)}/>
      <DatapointAdditionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onCreation={(datapoint) => {
          console.log('Datapoint created:', datapoint);
        }}
      />
    </View>
  );
}
