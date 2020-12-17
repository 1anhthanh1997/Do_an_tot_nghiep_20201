import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import joinTripStyles from './JoinTripStyles';
import createTripStyles from '../createTrip/CreateTripStyles';

const JoinTrip = () => {
  const [groupCode, setGroupCode] = useState('');

  return (
    <View style={joinTripStyles.screenView}>
      <Text style={joinTripStyles.joinTripText}>
        Tham gia nhóm bằng cách nhập code
      </Text>
      <TextInput
        style={joinTripStyles.textInput}
        placeholder={'Nhập mã nhóm'}
        value={groupCode}
        onChangeText={(val) => setGroupCode(val)}
      />
      <TouchableOpacity style={joinTripStyles.joinTripButton}>
        <Text style={joinTripStyles.joinTripButtonText}>Tham gia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinTrip;
