import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
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
import {editDestination, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const DestinationDetail = ({
  navigation,
  route,
  editDestinationData,
  getAllTripData,
  editDestination: _editDestination,
  getAllTrip: _getAllTrip,
}) => {
  const {destination, tripId} = route.params;
  const [isFistTime, setIsFirstTime] = useState(true);
  const [startTime, setStartTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date(1598051730000));
  const [isDisplayPickStartTime, setIsDisplayPickStartTime] = useState(false);
  const [isDisplayPickEndTime, setIsDisplayPickEndTime] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errCode, setErrorCode] = useState('');
  const [activityField, setActivityField] = useState('');
  const [activities, setActivities] = useState(destination.activities);

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
    if (destination.arrivedTime) {
      setStartTime(new Date(destination.arrivedTime));
    }
    if (destination.leavingTime) {
      setEndTime(new Date(destination.leavingTime));
    }
  }, []);

  useEffect(() => {
    if (isFistTime) {
      setIsFirstTime(false);
      console.log(isFistTime);
      return;
    }
    if (getAllTripData.status === STATUS.SUCCESS) {
      setMessage('Chỉnh sửa thông tin thành công');
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
    if (editDestinationData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (editDestinationData.status === STATUS.ERROR) {
      setErrorCode(editDestinationData.errorCode);
      setMessage(editDestinationData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [editDestinationData]);

  const onPressCreateTrip = async () => {
    let trip = destination;
    trip.groupId = tripId;
    trip.arrivedTime = startTime;
    trip.leavingTime = endTime;
    trip.activities = activities;
    // console.log(trip);
    await _editDestination(trip);
    // navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
  };

  const onPressAddActivity = () => {
    if (!activityField) {
      return;
    }
    let tmp = [...activities];
    tmp.push(activityField);
    console.log(tmp);
    setActivities(tmp);
    setActivityField('');
    Keyboard.dismiss();
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

  const onPressDeleteActivity = (deletedIndex) => {
    let tmp = [];
    activities.map((item, index) => {
      if (index !== deletedIndex) {
        tmp.push(item);
      }
    });
    console.log(tmp);
    setActivities(tmp);
  };

  const renderActivityItem = ({item, index}) => {
    return (
      <View style={destinationDetailStyles.activityItemView}>
        <View style={{width: '90%'}}>
          <Text style={destinationDetailStyles.activityItemText}>{item}</Text>
        </View>
        <TouchableOpacity
          style={destinationDetailStyles.plusTouchable}
          onPress={() => onPressDeleteActivity(index)}>
          <MaterialCommunityIcons name="close" color={COLOR.black} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={destinationDetailStyles.bodyView}>
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
          </TouchableOpacity>
          {isDisplayPickStartTime && (
            <DateTimePickerModal
              isVisible={isDisplayPickStartTime}
              mode="datetime"
              date={startTime}
              onConfirm={onStartTimeChange}
              onCancel={() => setIsDisplayPickStartTime(false)}
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
          </TouchableOpacity>
          {isDisplayPickEndTime && (
            <DateTimePickerModal
              isVisible={isDisplayPickEndTime}
              mode="datetime"
              date={endTime}
              onConfirm={onEndTimeChange}
              onCancel={() => setIsDisplayPickEndTime(false)}
            />
          )}
        </View>
        <View style={destinationDetailStyles.tripDescriptionView}>
          <Text style={destinationDetailStyles.tripDescriptionText}>
            Các hoạt động
          </Text>
          <View style={destinationDetailStyles.activitiesView}>
            <TextInput
              style={destinationDetailStyles.textInput}
              value={activityField}
              onChangeText={(val) => setActivityField(val)}
              placeholder={'Thêm hoạt động'}
            />
            <TouchableOpacity
              style={destinationDetailStyles.plusTouchable}
              onPress={onPressAddActivity}>
              <MaterialCommunityIcons
                name="plus"
                color={COLOR.black}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={activities}
            renderItem={renderActivityItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
          editDestinationData.status === STATUS.LOADING ||
          getAllTripData.status === STATUS.LOADING
        }
      />
      {renderBody()}
      {renderDialog()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const editDestinationData = state.f02Reducer.editDestination;
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {editDestinationData, getAllTripData};
};

export default connect(mapStateToProps, {editDestination, getAllTrip})(
  DestinationDetail,
);
