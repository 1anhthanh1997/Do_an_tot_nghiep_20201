import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import tripMemberStyles from './TripMemberStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, IMG, STATUS} from '../../../constants';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_MEMBER_INFO} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {getMemberInfo} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
const placeData = [
  {
    name: 'Đền Trần',
    location: 'Tỉnh Nam Định',
  },
  {
    name: 'Hồ Gươm',
    location: 'Thành phố Hà Nội',
  },
  {
    name: 'Thác Bản Giốc',
    location: 'Tỉnh Cao Bằng',
  },
];

const TripMember = ({
  navigation,
  route,
  getMemberInfoData,
  getMemberInfo: _getMemberInfo,
}) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const {members} = route.params;
  const [data, setData] = useState(placeData);
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }
    if (getMemberInfoData.status === STATUS.SUCCESS) {
      navigation.navigate(NAVIGATE_TO_MEMBER_INFO, {
        info: getMemberInfoData.getMemberInfoResultData,
      });
    }
    if (getMemberInfoData.status === STATUS.ERROR) {
      setMessage(getMemberInfoData.errorMessage);
      setIsDisplayConfirmDialog(true);
    }
  }, [getMemberInfoData]);

  const deletePlace = () => {
    let tmp = data.filter((value, index, arr) => {
      return index !== selectedIndex;
    });
    // console.log(tmp);
    setData(tmp);
  };

  const onPressDelete = (deleteIndex) => {
    setSelectedIndex(deleteIndex);
    setIsDisplayConfirmDialog(true);
  };

  const onPressMember = (index) => {
    console.log(members);
    _getMemberInfo(members[index]);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={tripMemberStyles.placeItemView}
        onPress={() => onPressMember(index)}>
        <View style={tripMemberStyles.contentView}>
          <Image source={IMG.defaultAvatar} style={tripMemberStyles.avatar} />
          <Text style={tripMemberStyles.placeName}>{item}</Text>
        </View>
        {/*<TouchableOpacity*/}
        {/*  style={tripMemberStyles.deleteButton}*/}
        {/*  onPress={() => onPressDelete(index)}>*/}
        {/*  <MaterialCommunityIcons*/}
        {/*    name="trash-can-outline"*/}
        {/*    color={COLOR.red}*/}
        {/*    size={25}*/}
        {/*  />*/}
        {/*</TouchableOpacity>*/}
      </TouchableOpacity>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayConfirmDialog}
        renderContent={<Text>Bạn có chắc chắn muốn xóa địa điểm này?</Text>}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đóng'}
        onPressPositiveButton={() => {
          setIsDisplayConfirmDialog(false);
        }}
      />
    );
  };

  return (
    <View style={tripMemberStyles.screenView}>
      <LoadingView visible={getMemberInfoData.status === STATUS.LOADING} />
      <DraggableFlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const getMemberInfoData = state.f02Reducer.getMemberInfo;
  return {getMemberInfoData};
};

export default connect(mapStateToProps, {getMemberInfo})(TripMember);
