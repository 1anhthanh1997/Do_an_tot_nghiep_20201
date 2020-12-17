import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import tripMemberStyles from './TripMemberStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, IMG} from '../../../constants';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_MEMBER_INFO} from '../../../navigations/routers';
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

const TripMember = ({navigation, route}) => {
  const {members} = route.params;
  const [data, setData] = useState(placeData);
  const [isDisplayConfirmDialog, setIsDisplayConfirmDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const onPressMember = () => {};

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={tripMemberStyles.placeItemView}
        onPress={() => navigation.navigate(NAVIGATE_TO_MEMBER_INFO)}>
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
        positiveButtonText={'Đồng ý'}
        isDisplayNegativeButton={true}
        negativeButtonText={'Hủy'}
        onPressPositiveButton={() => {
          deletePlace();
          setIsDisplayConfirmDialog(false);
        }}
        onPressNegativeButton={() => {
          setIsDisplayConfirmDialog(false);
        }}
      />
    );
  };

  return (
    <View style={tripMemberStyles.screenView}>
      <DraggableFlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {renderDialog()}
    </View>
  );
};

export default TripMember;
