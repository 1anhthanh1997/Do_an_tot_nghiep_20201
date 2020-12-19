import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import notificationStyles from './NotificationStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, IMG, STATUS} from '../../../constants';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_MEMBER_INFO} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {getMemberInfo} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import tripStyles from '../trip/TripStyles';
const sampleNotificationData = [
  {
    content: 'Bạn đã tạo thành công chuyến đi Hà Nội - Nam Định',
    time: '4 giờ trước',
  },
  {
    content: 'Bạn đã chỉnh sửa thành công chuyến đi Hà Nội - Nam Định',
    time: '3 giờ trước',
  },
  {
    content: 'Bạn đã thêm thành công chuyến đi Hà Nội - Nam Định ',
    time: '3 giờ trước',
  },
];

const Notification = ({
  navigation,
  route,
  getMemberInfoData,
  getMemberInfo: _getMemberInfo,
}) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  // const [data, setData] = useState(placeData);
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   if (isFirstTime) {
  //     setIsFirstTime(false);
  //     return;
  //   }
  //   if (getMemberInfoData.status === STATUS.SUCCESS) {
  //     navigation.navigate(NAVIGATE_TO_MEMBER_INFO, {
  //       info: getMemberInfoData.getMemberInfoResultData,
  //     });
  //   }
  //   if (getMemberInfoData.status === STATUS.ERROR) {
  //     setMessage(getMemberInfoData.errorMessage);
  //     setIsDisplayConfirmDialog(true);
  //   }
  // }, [getMemberInfoData]);

  // const deletePlace = () => {
  //   let tmp = data.filter((value, index, arr) => {
  //     return index !== selectedIndex;
  //   });
  //   // console.log(tmp);
  //   setData(tmp);
  // };

  const onPressDelete = (deleteIndex) => {
    setSelectedIndex(deleteIndex);
    setIsDisplayConfirmDialog(true);
  };

  // const onPressMember = (index) => {
  //   console.log(members);
  //   _getMemberInfo(members[index]);
  // };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={notificationStyles.placeItemView}
        onPress={() => {
          console.log('Hello');
        }}>
        <View style={notificationStyles.contentView}>
          <View style={notificationStyles.firstChildView}>
            <Image
              source={IMG.defaultAvatar}
              style={notificationStyles.avatar}
            />
          </View>
          <View style={notificationStyles.secondChildView}>
            <Text style={notificationStyles.placeName}>{item.content}</Text>
            <Text style={notificationStyles.time}>{item.time}</Text>
          </View>
          <View style={notificationStyles.thirdChildView} />
        </View>
        {/*<TouchableOpacity*/}
        {/*  style={notificationStyles.deleteButton}*/}
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

  const renderHeader = () => {
    return (
      <View style={notificationStyles.headerView}>
        <Text style={notificationStyles.headerText}>Thông báo</Text>
      </View>
    );
  };

  return (
    <View style={notificationStyles.screenView}>
      {renderHeader()}
      <DraggableFlatList
        data={sampleNotificationData}
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

export default connect(mapStateToProps, {getMemberInfo})(Notification);
