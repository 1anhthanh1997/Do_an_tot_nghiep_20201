import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../../constants';
import createTripStyles from './CreateTripStyles';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_SCREEN,
} from '../../../navigations/routers';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const CreateTrip = ({navigation}) => {
  const [tripName, setTripName] = useState(null);
  const [tripDescription, setTripDescription] = useState(null);
  const [startDate, setStartDate] = useState(new Date(1598051730000));
  const [endDate, setEndDate] = useState(new Date(1598051730000));
  const [isDisplayPickStartDate, setIsDisplayPickStartDate] = useState(false);
  const [isDisplayPickEndDate, setIsDisplayPickEndDate] = useState(false);

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={createTripStyles.createTripTouchable}
          onPress={() => navigation.navigate(NAVIGATE_TO_TRIP_SCREEN)}>
          <Text style={createTripStyles.createText}>Tạo</Text>
        </TouchableOpacity>
      ),
    });
  });

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setIsDisplayPickStartDate(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setIsDisplayPickEndDate(false);
    setEndDate(currentDate);
  };

  const renderBody = () => {
    return (
      <View style={createTripStyles.bodyView}>
        <MaterialCommunityIcons name="map" color={COLOR.red} size={45} />
        <Text style={createTripStyles.createTripText}>Tạo một chuyến đi</Text>
        <View style={createTripStyles.tripNameView}>
          <Text style={createTripStyles.createNameText}>
            Đặt tên cho chuyến đi
          </Text>
          <TextInput
            style={createTripStyles.textInput}
            placeholder={'Tên chuyến đi'}
          />
        </View>
        <View style={createTripStyles.tripDescriptionView}>
          <Text style={createTripStyles.tripDescriptionText}>
            Mô tả cho chuyến đi
          </Text>
          <TextInput style={createTripStyles.textInput} placeholder={'Mô tả'} />
        </View>
        <View style={createTripStyles.tripDescriptionView}>
          <Text style={createTripStyles.tripDescriptionText}>Ngày bắt đầu</Text>
          <TouchableOpacity
            style={createTripStyles.dateTouchable}
            onPress={() => setIsDisplayPickStartDate(true)}>
            <Text>
              {startDate.getDate() +
                '/' +
                startDate.getMonth() +
                '/' +
                startDate.getFullYear()}
            </Text>
          </TouchableOpacity>
          {isDisplayPickStartDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              is24Hour={true}
              display="default"
              onChange={onStartDateChange}
            />
          )}
        </View>
        <View style={createTripStyles.tripDescriptionView}>
          <Text style={createTripStyles.tripDescriptionText}>
            Ngày kết thúc
          </Text>
          <TouchableOpacity
            style={createTripStyles.dateTouchable}
            onPress={() => setIsDisplayPickEndDate(true)}>
            <Text>
              {endDate.getDate() +
                '/' +
                endDate.getMonth() +
                '/' +
                endDate.getFullYear()}
            </Text>
          </TouchableOpacity>
          {isDisplayPickEndDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              is24Hour={true}
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>
      </View>
    );
  };

  return <View style={createTripStyles.screenView}>{renderBody()}</View>;
};
export default CreateTrip;
// import React, {useState} from 'react';
// import {View, Button, Platform} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
//
// export const CreateTrip = () => {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };
//
//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
//
//   const showDatepicker = () => {
//     showMode('date');
//   };
//
//   const showTimepicker = () => {
//     showMode('time');
//   };
//
//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Show date picker!" />
//       </View>
//       <View>
//         <Button onPress={showTimepicker} title="Show time picker!" />
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// };
// export default CreateTrip;
