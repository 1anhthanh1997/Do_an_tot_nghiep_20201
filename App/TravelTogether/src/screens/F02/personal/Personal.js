import React, {useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NAVIGATE_TO_CHANGE_PASSWORD,
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN,
} from '../../../navigations/routers';
import {COLOR, IMG} from '../../../constants';
import personalStyles from './PersonalStyles';
import {Dialog} from '../../../commons';
import {connect} from 'react-redux';

const personalListData = [
  {
    name: 'Quản lý thông tin cá nhân',
    navigateScreen: '',
    icon: 'information',
    color: COLOR.blue,
  },
  {
    name: 'Đổi mật khẩu',
    navigateScreen: '',
    icon: 'lock',
    color: COLOR.gray,
  },
  {
    name: 'Đăng xuất',
    navigateScreen: NAVIGATE_TO_LOGIN_SCREEN,
    icon: 'logout',
    color: COLOR.red,
  },
];

const Personal = ({navigation, loginData}) => {
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);

  const navigateToScreen = (name) => {
    navigation.navigate(name);
  };

  const replaceToScreen = (name) => {
    navigation.replace(name);
  };

  const onPressTouchable = (index) => {
    switch (index) {
      case 0: {
        navigateToScreen(NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN);
        break;
      }
      case 1: {
        navigateToScreen(NAVIGATE_TO_CHANGE_PASSWORD);
        break;
      }
      case 2: {
        setIsDisplayDialog(true);
        break;
      }
      default:
        break;
    }
  };

  const renderPersonalItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={personalStyles.personalItemView}
        onPress={() => onPressTouchable(index)}>
        <MaterialCommunityIcons name={item.icon} color={item.color} size={30} />
        <Text style={personalStyles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={personalStyles.headView}>
        <Image
          source={
            loginData.loginResultData.avatarLink
              ? {uri: loginData.loginResultData.avatarLink}
              : IMG.defaultAvatar
          }
          style={personalStyles.avatar}
        />
      </View>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={personalStyles.flatList}
        data={personalListData}
        renderItem={renderPersonalItem}
        keyExtractor={(item) => item.name}
      />
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayDialog}
        isDisplayTitle={true}
        title={'Cảnh báo'}
        isDisplayNegativeButton={true}
        negativeButtonText={'Hủy'}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đồng ý'}
        onPressNegativeButton={() => setIsDisplayDialog(false)}
        onPressPositiveButton={() => {
          setIsDisplayDialog(false);
          replaceToScreen(NAVIGATE_TO_LOGIN_SCREEN);
        }}
        renderContent={<Text>Bạn có chắc chắn muốn đăng xuất?</Text>}
      />
    );
  };

  return (
    <View style={personalStyles.screenView}>
      {renderHeader()}
      {renderBody()}
      {renderDialog()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const loginData = state.f01Reducer.login;
  return {loginData};
};

export default connect(mapStateToProps, {})(Personal);
