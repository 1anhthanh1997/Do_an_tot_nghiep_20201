import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import notificationStyles from './NotificationStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, IMG, STATUS} from '../../../constants';
import {Dialog} from '../../../commons';
import {
  NAVIGATE_TO_MEMBER_INFO,
  NAVIGATE_TO_TRIP_DETAIL,
} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {getMemberInfo} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import tripStyles from '../trip/TripStyles';
import {SOCKET} from '../../../constants';
const socket = SOCKET.socket;

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
  loginData,
  getMemberInfo: _getMemberInfo,
}) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  // const [data, setData] = useState(placeData);
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('notification',()=>{

    })
  }, []);

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

  const setTime = (time) => {
    let longTime = new Date(new Date() - new Date(time));
    let startTime = new Date(0);
    // return new Date(0).getMinutes();
    // console.log(new Date(new Date() - new Date(time)).getHours());
    if (new Date() - new Date(time) < 1000) {
      return '1 giây trước';
    }
    if (
      new Date() - new Date(time) >= 1000 &&
      new Date() - new Date(time) < 60000
    ) {
      return (
        (new Date().getSeconds() > new Date(time).getSeconds()
          ? new Date().getSeconds() - new Date(time).getSeconds()
          : new Date().getSeconds() + 60 - new Date(time).getSeconds()
        ).toString() + ' giây trước'
      );
    }
    if (
      new Date() - new Date(time) >= 60000 &&
      new Date() - new Date(time) < 3600000
    ) {
      return (
        (new Date().getMinutes() > new Date(time).getMinutes()
          ? new Date().getMinutes() - new Date(time).getMinutes()
          : new Date().getMinutes() + 60 - new Date(time).getMinutes()
        ).toString() + ' phút trước'
      );
    }
    if (
      new Date() - new Date(time) >= 3600000 &&
      new Date() - new Date(time) < 86400000
    ) {
      return (
        (new Date().getHours() > new Date(time).getHours()
          ? new Date().getHours() - new Date(time).getHours()
          : new Date().getHours() + 24 - new Date(time).getHours()
        ).toString() + ' giờ trước'
      );
      // return (longTime.getHours() - startTime.getHours() + 1).toString()+'giờ trư';
    }
    if (
      new Date() - new Date(time) >= 86400000 &&
      new Date() - new Date(time) < 2592000000
    ) {
      return (
        (new Date().getDate() > new Date(time).getDate()
          ? new Date().getDate() - new Date(time).getDate()
          : new Date().getDate() + 30 - new Date(time).getDate()
        ).toString() + ' ngày trước'
      );
    }
    if (
      new Date() - new Date(time) >= 2592000000 &&
      new Date() - new Date(time) < 31536000000
    ) {
      return (
        (new Date().getMonth() > new Date(time).getMonth()
          ? new Date().getMonth() - new Date(time).getMonth()
          : new Date().getMonth() + 12 - new Date(time).getMonth()
        ).toString() + ' tháng trước'
      );
    }
    return (
      (new Date().getFullYear() - new Date(time).getFullYear()).toString() +
      ' năm trước'
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={notificationStyles.placeItemView}
        onPress={() => {
          navigation.navigate(NAVIGATE_TO_TRIP_DETAIL, {tripId: item.groupId});
        }}>
        <View style={notificationStyles.contentView}>
          <View style={notificationStyles.firstChildView}>
            <Image
              source={IMG.defaultAvatar}
              style={notificationStyles.avatar}
            />
          </View>
          <View style={notificationStyles.secondChildView}>
            <Text>
              <Text style={notificationStyles.groupName}>{item.owner}</Text>
              <Text style={notificationStyles.placeName}>
                {' ' + item.content + ' '}
              </Text>
              <Text style={notificationStyles.groupName}>{item.groupName}</Text>
            </Text>
            <Text style={notificationStyles.time}>{setTime(item.time)}</Text>
          </View>
          <View style={notificationStyles.thirdChildView} />
        </View>
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
        data={loginData.loginResultData.notification}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const loginData = state.f01Reducer.login;
  const getMemberInfoData = state.f02Reducer.getMemberInfo;
  return {getMemberInfoData, loginData};
};

export default connect(mapStateToProps, {getMemberInfo})(Notification);
