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
  NAVIGATE_TO_EDIT_TRIP,
} from '../../../navigations/routers';

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

  const renderPlaceItem = ({item}) => {
    return (
      <TouchableOpacity style={tripDetailStyles.placeItemView}>
        <Image style={tripDetailStyles.placeImage} source={{uri: imageUri}} />
        <View style={tripDetailStyles.placeContentView}>
          <Text style={tripDetailStyles.name}>{item.name}</Text>
          <Text style={tripDetailStyles.location}>{item.location}</Text>
          <Text style={tripDetailStyles.location}>
            Địa điểm tập trung: Ở đầu
          </Text>
          <Text style={tripDetailStyles.location}>Thời gian đến: 8:00</Text>
          <Text style={tripDetailStyles.location}>Thời gian đi: 12:00</Text>
        </View>
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
    </View>
  );
};

export default TripDetail;
