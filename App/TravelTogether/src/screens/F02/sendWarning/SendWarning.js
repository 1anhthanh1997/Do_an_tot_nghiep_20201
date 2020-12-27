import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import sendWarningStyles from './SendWarningStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../../constants';
import {useFocusEffect} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import createTripStyles from '../createTrip/CreateTripStyles';

const SendWarning = ({navigation}) => {
  const [alertName, setAlertName] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [country, setCountry] = useState('low');

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={sendWarningStyles.createTripTouchable}>
          {/*// onPress={onPressCreateTrip}>*/}
          <Text style={sendWarningStyles.createText}>Gửi</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={sendWarningStyles.screenView}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          color={COLOR.orange}
          size={45}
        />
        <Text style={sendWarningStyles.createTripText}>Tạo cảnh báo</Text>
        <View style={sendWarningStyles.tripNameView}>
          <Text style={sendWarningStyles.createNameText}>Tên cảnh báo</Text>
          <TextInput
            style={sendWarningStyles.textInput}
            placeholder={'Tên cảnh báo'}
            value={alertName}
            onChangeText={(val) => setAlertName(val)}
          />
        </View>
        <View style={sendWarningStyles.tripDescriptionView}>
          <Text style={sendWarningStyles.tripDescriptionText}>
            Mức cảnh báo
          </Text>
          <DropDownPicker
            items={[
              {
                label: 'Cao',
                value: 'high',
                icon: () => (
                  <MaterialCommunityIcons
                    name="circle"
                    size={18}
                    color={COLOR.red}
                  />
                ),
                hidden: true,
              },
              {
                label: 'Trung bình',
                value: 'medium',
                icon: () => (
                  <MaterialCommunityIcons
                    name="circle"
                    size={18}
                    color={COLOR.orange}
                  />
                ),
              },
              {
                label: 'Thấp',
                value: 'low',
                icon: () => (
                  <MaterialCommunityIcons
                    name="circle"
                    size={18}
                    color={COLOR.green}
                  />
                ),
              },
            ]}
            defaultValue={country}
            containerStyle={sendWarningStyles.dropDownContainer}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setCountry(item.value)}
          />
        </View>
        <View style={sendWarningStyles.tripDescriptionView}>
          <Text style={sendWarningStyles.tripDescriptionText}>Nội dung</Text>
          <TextInput
            style={sendWarningStyles.secondTextInput}
            placeholder={'Nội dung'}
            value={alertDescription}
            multiline={true}
            onChangeText={(val) => setAlertDescription(val)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SendWarning;
