import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, STATUS} from '../../../constants';
import createTripStyles from './CreateTripStyles';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_SCREEN,
} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {createTrip, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const CreateTrip = ({
  navigation,
  createTripData,
  getAllTripData,
  createTrip: _createTrip,
  getAllTrip: _getAllTrip,
}) => {
  const [isFistTime, setIsFirstTime] = useState(true);
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
          onPress={onPressCreateTrip}>
          <Text style={createTripStyles.createText}>Tạo</Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (isFistTime) {
      setIsFirstTime(false);
      console.log(isFistTime);
      return;
    }
    if (getAllTripData.status === STATUS.SUCCESS) {
      navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
    }
  }, [getAllTripData]);

  useEffect(() => {
    if (createTripData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (createTripData.status === STATUS.ERROR) {
    }
  }, [createTripData]);

  const onPressCreateTrip = async () => {
    let trip = {
      groupName: tripName,
      groupDescription: tripDescription,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(trip);
    await _createTrip(trip);
    // navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
  };

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
            value={tripName}
            onChangeText={(val) => setTripName(val)}
          />
        </View>
        <View style={createTripStyles.tripDescriptionView}>
          <Text style={createTripStyles.tripDescriptionText}>
            Mô tả cho chuyến đi
          </Text>
          <TextInput
            style={createTripStyles.textInput}
            placeholder={'Mô tả'}
            value={tripDescription}
            onChangeText={(val) => setTripDescription(val)}
          />
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

  return (
    <View style={createTripStyles.screenView}>
      <LoadingView
        visible={
          createTripData.status === STATUS.LOADING ||
          getAllTripData.status === STATUS.LOADING
        }
      />
      {renderBody()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const createTripData = state.f02Reducer.createTrip;
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {createTripData, getAllTripData};
};

export default connect(mapStateToProps, {createTrip, getAllTrip})(CreateTrip);
