import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import joinTripStyles from './JoinTripStyles';
import {COLOR, STATUS} from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {joinTrip, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_TRIP_SCREEN} from '../../../navigations/routers';

const JoinTrip = ({
  navigation,
  getAllTripData,
  joinTripData,
  joinTrip: _joinTrip,
  getAllTrip: _getAllTrip,
}) => {
  const [isFistTime, setIsFirstTime] = useState(true);
  const [groupCode, setGroupCode] = useState('');
  const [message, setMessage] = useState('');
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errCode, setErrorCode] = useState('');

  useEffect(() => {
    if (isFistTime) {
      setIsFirstTime(false);
      return;
    }
    if (getAllTripData.status === STATUS.SUCCESS) {
      setMessage('Tham gia nhóm thành công');
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
    if (joinTripData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (joinTripData.status === STATUS.ERROR) {
      setErrorCode(joinTripData.errorCode);
      setMessage(joinTripData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [joinTripData]);

  const onPressJoinTrip = () => {
    if (!groupCode) {
      return;
    }
    _joinTrip(groupCode);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={joinTripStyles.screenView}>
        <LoadingView
          visible={
            getAllTripData.status === STATUS.LOADING ||
            joinTripData.status === STATUS.LOADING
          }
        />
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
        <TouchableOpacity
          style={joinTripStyles.joinTripButton}
          onPress={onPressJoinTrip}>
          <Text style={joinTripStyles.joinTripButtonText}>Tham gia</Text>
        </TouchableOpacity>
        {renderDialog()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  const getAllTripData = state.f02Reducer.getAllTrip;
  const joinTripData = state.f02Reducer.joinTrip;
  return {getAllTripData, joinTripData};
};

export default connect(mapStateToProps, {joinTrip, getAllTrip})(JoinTrip);
