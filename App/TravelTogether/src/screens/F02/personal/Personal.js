import React, {useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NAVIGATE_TO_LOGIN_SCREEN} from '../../../navigations/routers';
import {COLOR, IMG} from '../../../constants';
import personalStyles from './PersonalStyles';

const personalListData = [
  {
    name: 'Quản lý thông tin cá nhân',
    navigateScreen: '',
    icon: 'information',
  },
  {
    name: 'Đổi mật khẩu',
    navigateScreen: '',
    icon: 'key',
  },
  {
    name: 'Đăng xuất',
    navigateScreen: NAVIGATE_TO_LOGIN_SCREEN,
    icon: 'logout',
  },
];

const onPressTouchable = () => {

};

const renderPersonalItem = ({item, index}) => {
  return (
    <TouchableOpacity
      style={personalStyles.personalItemView}
      onPress={onPressTouchable()}>
      <MaterialCommunityIcons name={item.icon} color={COLOR.blue} size={30} />
      <Text style={personalStyles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const Personal = () => {
  return (
    <View style={personalStyles.screenView}>
      <View style={personalStyles.headView}>
        <Image source={IMG.defaultAvatar} style={personalStyles.avatar} />
      </View>
      <FlatList
        style={personalStyles.flatList}
        data={personalListData}
        renderItem={renderPersonalItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
export default Personal;
