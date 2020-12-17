import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, STATUS} from '../../../constants';
import editTripStyles from './EditTripStyles';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_DETAIL,
  NAVIGATE_TO_TRIP_SCREEN,
} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {editTrip, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const EditTrip = ({
  route,
  navigation,
  editTripData,
  getAllTripData,
  editTrip: _editTrip,
  getAllTrip: _getAllTrip,
}) => {
  const {trip} = route.params;
  const [isFistTime, setIsFirstTime] = useState(true);
  const [tripName, setTripName] = useState(trip.groupName);
  const [tripDescription, setTripDescription] = useState(trip.groupDescription);
  const [startDate, setStartDate] = useState(new Date(trip.startDate));
  const [endDate, setEndDate] = useState(new Date(trip.endDate));
  const [isDisplayPickStartDate, setIsDisplayPickStartDate] = useState(false);
  const [isDisplayPickEndDate, setIsDisplayPickEndDate] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errCode, setErrorCode] = useState('');

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={editTripStyles.createTripTouchable}
          onPress={onPressCreateTrip}>
          <Text style={editTripStyles.createText}>Lưu</Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (isFistTime) {
      setIsFirstTime(false);
      return;
    }
    if (getAllTripData.status === STATUS.SUCCESS) {
      setMessage('Chỉnh sửa chuyến đi thành công');
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
    if (editTripData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (editTripData.status === STATUS.ERROR) {
      setErrorCode(editTripData.errorCode);
      setMessage(editTripData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [editTripData]);

  const onPressCreateTrip = async () => {
    let newTrip = {
      _id: trip._id,
      groupName: tripName,
      groupDescription: tripDescription,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(newTrip);
    await _editTrip(newTrip);
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
      <View style={editTripStyles.bodyView}>
        <MaterialCommunityIcons name="map" color={COLOR.red} size={45} />
        <Text style={editTripStyles.createTripText}>Chỉnh sửa chuyến đi</Text>
        <View style={editTripStyles.tripNameView}>
          <Text style={editTripStyles.createNameText}>
            Đặt tên cho chuyến đi
          </Text>
          <TextInput
            style={editTripStyles.textInput}
            placeholder={'Tên chuyến đi'}
            value={tripName}
            onChangeText={(val) => setTripName(val)}
          />
        </View>
        <View style={editTripStyles.tripDescriptionView}>
          <Text style={editTripStyles.tripDescriptionText}>
            Mô tả cho chuyến đi
          </Text>
          <TextInput
            style={editTripStyles.textInput}
            placeholder={'Mô tả'}
            value={tripDescription}
            onChangeText={(val) => setTripDescription(val)}
          />
        </View>
        <View style={editTripStyles.tripDescriptionView}>
          <Text style={editTripStyles.tripDescriptionText}>Ngày bắt đầu</Text>
          <TouchableOpacity
            style={editTripStyles.dateTouchable}
            onPress={() => setIsDisplayPickStartDate(true)}>
            <Text>
              {startDate.getDate() +
                '/' +
                (startDate.getMonth() + 1) +
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
        <View style={editTripStyles.tripDescriptionView}>
          <Text style={editTripStyles.tripDescriptionText}>Ngày kết thúc</Text>
          <TouchableOpacity
            style={editTripStyles.dateTouchable}
            onPress={() => setIsDisplayPickEndDate(true)}>
            <Text>
              {endDate.getDate() +
                '/' +
                (endDate.getMonth() + 1) +
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
    <View style={editTripStyles.screenView}>
      <LoadingView
        visible={
          editTripData.status === STATUS.LOADING ||
          getAllTripData.status === STATUS.LOADING
        }
      />
      {renderBody()}
      {renderDialog()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const editTripData = state.f02Reducer.editTrip;
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {editTripData, getAllTripData};
};

export default connect(mapStateToProps, {editTrip, getAllTrip})(EditTrip);
