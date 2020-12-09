import React, {useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import tripStyles from './TripStyles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../../constants';
import {
  NAVIGATE_TO_CREATE_TRIP,
  NAVIGATE_TO_TRIP_DETAIL,
} from '../../../navigations/routers';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const tripData = [
  {
    name: 'First Trip',
    owner: 'Nguyễn Chí Thanh',
  },
  {
    name: 'First Trip',
    owner: 'Nguyễn Chí Thanh',
  },
  {
    name: 'First Trip',
    owner: 'Nguyễn Chí Thanh',
  },
];

const Trip = ({navigation}) => {
  const redirectToScreen = (name) => {
    navigation.navigate(name);
  };

  const onPressFloatButton = () => {
    redirectToScreen(NAVIGATE_TO_CREATE_TRIP);
  };

  const renderTripList = ({item}) => {
    return (
      <TouchableOpacity
        style={tripStyles.tripView}
        onPress={() => redirectToScreen(NAVIGATE_TO_TRIP_DETAIL)}>
        <Image source={{uri: imageUri}} style={tripStyles.tripImage} />
        <View style={tripStyles.tripContent}>
          <Text style={tripStyles.tripNameText}>{item.name}</Text>
          <View style={tripStyles.ownerView}>
            <Text style={tripStyles.smallTripOwnerText}>Tạo bởi </Text>
            <Text style={tripStyles.tripOwnerText}>{item.owner}</Text>
          </View>
          <Text>Bao gồm: 4 địa điểm</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={tripStyles.headerView}>
        <Text style={tripStyles.headerText}>Chuyến đi</Text>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={tripStyles.bodyView}>
        <FlatList
          data={tripData}
          renderItem={renderTripList}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const renderFloatButton = () => {
    return (
      <TouchableOpacity
        style={tripStyles.floatButton}
        onPress={onPressFloatButton}>
        <MaterialCommunityIcons name={'plus'} color={COLOR.white} size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={tripStyles.screenView}>
      {renderHeader()}
      {renderBody()}
      {renderFloatButton()}
    </View>
  );
};
export default Trip;
