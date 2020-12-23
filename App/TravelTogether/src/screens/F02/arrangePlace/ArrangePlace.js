import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import arrangePlaceStyles from './ArrangePlaceStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../../constants';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_TRIP_SCREEN} from '../../../navigations/routers';
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

const ArrangePlace = ({navigation, route}) => {
  const {trip} = route.params;
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

  const renderItem = ({item, index, drag}) => {
    return (
      <TouchableOpacity
        style={arrangePlaceStyles.placeItemView}
        onLongPress={drag}>
        <View style={arrangePlaceStyles.contentView}>
          <Text style={arrangePlaceStyles.placeName}>
            {item.destinationName}
          </Text>
          <Text style={arrangePlaceStyles.placeLocation}>
            {item.destinationLocation}
          </Text>
        </View>
        <TouchableOpacity
          style={arrangePlaceStyles.deleteButton}
          onPress={() => onPressDelete(index)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={COLOR.red}
            size={25}
          />
        </TouchableOpacity>
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
    <View style={arrangePlaceStyles.screenView}>
      <DraggableFlatList
        data={trip.schedule}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({data}) => {
          console.log(data);
          setData(data);
        }}
      />
      {renderDialog()}
    </View>
  );
};

export default ArrangePlace;
