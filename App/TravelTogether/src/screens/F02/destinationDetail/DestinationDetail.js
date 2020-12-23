import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, STATUS} from '../../../constants';
import destinationDetailStyles from './DestinationDetailStyles';
import {useFocusEffect} from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_PERSONAL_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_SCREEN,
} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {createTrip, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const DestinationDetail = ({
  navigation,
  route,
  createTripData,
  getAllTripData,
  createTrip: _createTrip,
  getAllTrip: _getAllTrip,
}) => {
  const {destination} = route.params;
  const [isFistTime, setIsFirstTime] = useState(true);
  const [tripName, setTripName] = useState(null);
  const [tripDescription, setTripDescription] = useState(null);
  const [startTime, setStartTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date(1598051730000));
  const [isDisplayPickStartTime, setIsDisplayPickStartTime] = useState(false);
  const [isDisplayPickEndTime, setIsDisplayPickEndTime] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errCode, setErrorCode] = useState('');

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={destinationDetailStyles.createTripTouchable}
          onPress={onPressCreateTrip}>
          <Text style={destinationDetailStyles.createText}>Lưu</Text>
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
      setMessage('Tạo chuyến đi thành công');
      setIsDisplayDialog(true);
    }
    if (getAllTripData.status === STATUS.ERROR) {
      setErrorCode(getAllTripData.errorCode);
      setMessage(getAllTripData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [getAllTripData]);

  useEffect(() => {
    if (isFistTime) {
      setIsFirstTime(false);
      return;
    }
    if (createTripData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (createTripData.status === STATUS.ERROR) {
      setErrorCode(createTripData.errorCode);
      setMessage(createTripData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [createTripData]);

  const makeId = (length) => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const onPressCreateTrip = async () => {
    let trip = {
      groupId: makeId(24),
      groupName: tripName,
      groupDescription: tripDescription,
      startDate: startTime,
      endDate: endTime,
    };
    console.log(trip);
    await _createTrip(trip);
    // navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
  };

  const onStartTimeChange = (selectedTime) => {
    const currentDate = selectedTime || endTime;
    setIsDisplayPickStartTime(false);
    setStartTime(currentDate);
  };

  const onEndTimeChange = (selectedTime) => {
    console.log(selectedTime);
    const currentTime = selectedTime || endTime;
    setIsDisplayPickEndTime(false);
    setEndTime(currentTime);
  };

  const renderBody = () => {
    return (
      <View style={destinationDetailStyles.bodyView}>
        {/*<MaterialCommunityIcons*/}
        {/*  name="map-marker-plus"*/}
        {/*  color={COLOR.red}*/}
        {/*  size={45}*/}
        {/*/>*/}
        {/*<Text style={destinationDetailStyles.createTripText}>*/}
        {/*  Thêm điểm dừng chân*/}
        {/*</Text>*/}
        <View style={destinationDetailStyles.tripNameView}>
          <Text style={destinationDetailStyles.createNameText}>
            Tên điểm đến
          </Text>
          <Text style={destinationDetailStyles.destinationName}>
            {destination.destinationName}
          </Text>
        </View>
        <View style={destinationDetailStyles.tripDescriptionView}>
          <Text style={destinationDetailStyles.tripDescriptionText}>
            Địa chỉ
          </Text>
          <Text style={destinationDetailStyles.destinationLocation}>
            {destination.destinationLocation}
          </Text>
        </View>
        <View style={destinationDetailStyles.tripDescriptionView}>
          <Text style={destinationDetailStyles.tripDescriptionText}>
            Thời gian đến
          </Text>
          <TouchableOpacity
            style={destinationDetailStyles.dateTouchable}
            onPress={() => setIsDisplayPickStartTime(true)}>
            {!destination.leavingTime && (
              <Text style={destinationDetailStyles.destinationLocation}>
                {startTime.getHours() +
                  ':' +
                  startTime.getMinutes() +
                  ' - ' +
                  startTime.getDate() +
                  '/' +
                  (startTime.getMonth() + 1) +
                  '/' +
                  startTime.getFullYear()}
              </Text>
            )}
          </TouchableOpacity>
          {isDisplayPickStartTime && (
            <DateTimePickerModal
              isVisible={isDisplayPickStartTime}
              mode="datetime"
              onConfirm={onStartTimeChange}
              onCancel={() => setIsDisplayPickEndTime(false)}
            />
          )}
        </View>
        <View style={destinationDetailStyles.tripDescriptionView}>
          <Text style={destinationDetailStyles.tripDescriptionText}>
            Thời gian đi
          </Text>
          <TouchableOpacity
            style={destinationDetailStyles.dateTouchable}
            onPress={() => setIsDisplayPickEndTime(true)}>
            {!destination.leavingTime && (
              <Text style={destinationDetailStyles.destinationLocation}>
                {endTime.getHours() +
                  ':' +
                  endTime.getMinutes() +
                  ' - ' +
                  endTime.getDate() +
                  '/' +
                  (endTime.getMonth() + 1) +
                  '/' +
                  endTime.getFullYear()}
              </Text>
            )}
          </TouchableOpacity>
          {isDisplayPickEndTime && (
            <DateTimePickerModal
              isVisible={isDisplayPickEndTime}
              mode="datetime"
              onConfirm={onEndTimeChange}
              onCancel={() => setIsDisplayPickEndTime(false)}
            />
          )}
        </View>
        <View style={destinationDetailStyles.tripDescriptionView}>
          <Text style={destinationDetailStyles.tripDescriptionText}>
            Các hoạt động
          </Text>
        </View>
      </View>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayDialog}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đóng'}
        onPressPositiveButton={() => {
          setIsDisplayDialog(false);
          if (!errCode) {
            navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
          }
        }}
        renderContent={<Text>{message}</Text>}
      />
    );
  };

  return (
    <View style={destinationDetailStyles.screenView}>
      <LoadingView
        visible={
          createTripData.status === STATUS.LOADING ||
          getAllTripData.status === STATUS.LOADING
        }
      />
      {renderBody()}
      {renderDialog()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const createTripData = state.f02Reducer.createTrip;
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {createTripData, getAllTripData};
};

export default connect(mapStateToProps, {createTrip, getAllTrip})(
  DestinationDetail,
);
