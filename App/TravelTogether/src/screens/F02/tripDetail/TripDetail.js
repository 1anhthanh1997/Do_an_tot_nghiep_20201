import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tripDetailStyles from './TripDetailStyles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {COLOR} from '../../../constants';
import Geolocation from '@react-native-community/geolocation';
import {
  NAVIGATE_TO_ARRANGE_PLACE,
  NAVIGATE_TO_CREATE_TRIP,
  NAVIGATE_TO_EDIT_TRIP,
  NAVIGATE_TO_TRIP_MEMBER,
} from '../../../navigations/routers';
import tripStyles from '../trip/TripStyles';

const placeData = [
  {
    name: 'Đền Trần',
    location: 'Tỉnh Nam Định',
    gatheringPlace: 'Ở trước cổng đền',
    date: '18/12/2020',
    arriveTime: '8:00',
    leavingTime: '12:00',
  },
  {
    name: 'Hồ Gươm',
    location: 'Thành phố Hà Nội',
    gatheringPlace: 'Ở trước đền Ngọc Sơn',
    date: '18/12/2020',
    arriveTime: '8:00',
    leavingTime: '12:00',
  },
  {
    name: 'Thác Bản Giốc',
    location: 'Tỉnh Cao Bằng',
    gatheringPlace: 'Ở trước lối vào thác',
    date: '18/12/2020',
    arriveTime: '8:00',
    leavingTime: '12:00',
  },
];

const initPosition = {
  coords: {
    accuracy: 38.592002868652344,
    altitude: -10.39990234375,
    heading: 17.299999237060547,
    latitude: 21.00649209,
    longitude: 105.86405619,
    speed: 0.5099999904632568,
  },
  mocked: false,
  timestamp: 1608108043000,
};

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const TripDetail = ({route, navigation}) => {
  const {trip} = route.params;
  const [position, setPosition] = useState(initPosition);

  useEffect(() => {
    console.log(trip.startDate);
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const redirectToScreen = (name, params) => {
    navigation.navigate(name, params);
  };

  const onPressFloatButton = () => {
    redirectToScreen(NAVIGATE_TO_CREATE_TRIP);
  };

  const renderPlaceItem = ({item}) => {
    return (
      <TouchableOpacity style={tripDetailStyles.placeItemView}>
        <Image style={tripDetailStyles.placeImage} source={{uri: imageUri}} />
        <View style={tripDetailStyles.placeContentView}>
          <Text style={tripDetailStyles.name}>{item.name}</Text>
          <Text style={tripDetailStyles.location}>{item.location}</Text>
          <Text style={tripDetailStyles.location}>
            {'Địa điểm tập trung: ' + item.gatheringPlace}
          </Text>
          <Text style={tripDetailStyles.location}>
            {'Ngày đến: ' + item.date}
          </Text>
          <Text style={tripDetailStyles.location}>
            {'Thời gian đến: ' + item.arriveTime}
          </Text>
          <Text style={tripDetailStyles.location}>
            {'Thời gian đi: ' + item.leavingTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFloatButton = () => {
    return (
      <TouchableOpacity
        style={tripDetailStyles.floatButton}
        onPress={onPressFloatButton}>
        <MaterialCommunityIcons name={'plus'} color={COLOR.white} size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={tripDetailStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={tripDetailStyles.map}
        region={{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }}
          title={'Your Location'}
        />
      </MapView>
      <SlidingUpPanel
        ref={(c) => c}
        draggableRange={{top: 700, bottom: 110}}
        // animatedValue={this._draggedValue}
        showBackdrop={false}>
        <View style={tripDetailStyles.panel}>
          <Text style={tripDetailStyles.tripName}>{trip.groupName}</Text>
          <Text style={tripDetailStyles.tripDescription}>
            {trip.groupDescription}
          </Text>
          <Text style={tripDetailStyles.tripStartTime}>
            {'Ngày bắt đầu: ' +
              new Date(trip.startDate).getDate() +
              '/' +
              (new Date(trip.startDate).getMonth() + 1) +
              '/' +
              new Date(trip.startDate).getFullYear()}
          </Text>
          <Text style={tripDetailStyles.tripEndTime}>
            {'Ngày kết thúc: ' +
              new Date(trip.endDate).getDate() +
              '/' +
              (new Date(trip.endDate).getMonth() + 1) +
              '/' +
              new Date(trip.endDate).getFullYear()}
          </Text>
          <View style={tripDetailStyles.optionView}>
            <TouchableOpacity
              style={tripDetailStyles.optionItemView}
              onPress={() =>
                navigation.navigate(NAVIGATE_TO_EDIT_TRIP, {trip: trip})
              }>
              <MaterialCommunityIcons
                name={'pencil'}
                size={25}
                color={COLOR.black}
              />
              <Text>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tripDetailStyles.optionItemView}
              onPress={() =>
                navigation.navigate(NAVIGATE_TO_ARRANGE_PLACE, {trip: trip})
              }>
              <MaterialCommunityIcons
                name={'order-bool-descending'}
                size={25}
                color={COLOR.black}
              />
              <Text>Sắp xếp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tripDetailStyles.optionItemView}
              onPress={() =>
                navigation.navigate(NAVIGATE_TO_TRIP_MEMBER, {
                  members: trip.members,
                })
              }>
              <MaterialCommunityIcons
                name={'account-multiple'}
                size={25}
                color={COLOR.black}
              />
              <Text>Thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tripDetailStyles.optionItemView}
              onPress={() => {
                Linking.openURL(
                  `sms:?body=Mã nhóm của bạn là: ${trip.groupId}`,
                );
              }}>
              <MaterialCommunityIcons
                name={'account-plus'}
                size={25}
                color={COLOR.black}
              />
              <Text>Mời</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={tripDetailStyles.scrollView}>
            <FlatList
              data={placeData}
              renderItem={renderPlaceItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </View>
      </SlidingUpPanel>
      {renderFloatButton()}
    </View>
  );
};

export default TripDetail;
