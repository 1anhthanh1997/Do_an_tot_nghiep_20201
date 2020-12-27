import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import tripStyles from './TripStyles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR, STATUS} from '../../../constants';
import {
  NAVIGATE_TO_CREATE_TRIP,
  NAVIGATE_TO_JOIN_TRIP,
  NAVIGATE_TO_TRIP_DETAIL,
} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';

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

const Trip = ({navigation, getAllTripData, getAllTrip: _getAllTrip}) => {
  useEffect(() => {
    _getAllTrip();
  }, []);

  const redirectToScreen = (name, params) => {
    navigation.navigate(name, params);
  };

  const onPressFloatButton = () => {
    redirectToScreen(NAVIGATE_TO_CREATE_TRIP);
  };

  const onPressSecondFloatButton = () => {
    redirectToScreen(NAVIGATE_TO_JOIN_TRIP);
  };

  const renderTripList = ({item}) => {
    return (
      <TouchableOpacity
        style={tripStyles.tripView}
        onPress={() =>
          redirectToScreen(NAVIGATE_TO_TRIP_DETAIL, {
            tripId: item.groupId,
          })
        }>
        <Image source={{uri: imageUri}} style={tripStyles.tripImage} />
        <View style={tripStyles.tripContent}>
          <Text style={tripStyles.tripNameText}>{item.groupName}</Text>
          <View style={tripStyles.ownerView}>
            <Text style={tripStyles.smallTripOwnerText}>Tạo bởi </Text>
            <Text style={tripStyles.tripOwnerText}>{item.captain}</Text>
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
    console.log(!getAllTripData.getAllTripResultData);
    if (getAllTripData.getAllTripResultData.length !== 0) {
      return (
        <View style={tripStyles.bodyView}>
          <FlatList
            data={getAllTripData.getAllTripResultData}
            renderItem={renderTripList}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
    return (
      <View style={tripStyles.bodyNullView}>
        <Text style={tripStyles.bodyNullText}>
          Hiện không có chuyến đi nào. Hãy tạo một nhóm hoặc tìm kiếm và tham
          gia vào 1 nhóm
        </Text>
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

  const renderSecondFloatButton = () => {
    return (
      <TouchableOpacity
        style={tripStyles.secondFloatButton}
        onPress={onPressSecondFloatButton}>
        <MaterialCommunityIcons
          name={'account-multiple-plus'}
          color={COLOR.white}
          size={25}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={tripStyles.screenView}>
      <LoadingView visible={getAllTripData.status === STATUS.LOADING} />
      {renderHeader()}
      {renderBody()}
      {renderSecondFloatButton()}
      {renderFloatButton()}
    </View>
  );
};
const mapStateToProps = (state) => {
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {getAllTripData};
};

export default connect(mapStateToProps, {getAllTrip})(Trip);
