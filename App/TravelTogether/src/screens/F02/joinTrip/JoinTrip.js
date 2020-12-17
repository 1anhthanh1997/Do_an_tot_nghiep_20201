import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import joinTripStyles from './JoinTripStyles';
import {COLOR} from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinTrip = () => {
  const [groupCode, setGroupCode] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={joinTripStyles.screenView}>
        <MaterialCommunityIcons
          name={'account-multiple-plus'}
          color={COLOR.blue}
          size={75}
        />
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
    </TouchableWithoutFeedback>
  );
};

export default JoinTrip;
