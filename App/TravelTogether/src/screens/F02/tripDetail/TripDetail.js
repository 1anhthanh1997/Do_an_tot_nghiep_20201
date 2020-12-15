import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tripDetailStyles from './TripDetailStyles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {COLOR} from '../../../constants';
import Geolocation from '@react-native-community/geolocation';

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

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const TripDetail = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  });

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
          latitude: 21.0067485,
          longitude: 105.8631832,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <SlidingUpPanel
        ref={(c) => c}
        draggableRange={{top: 700, bottom: 110}}
        // animatedValue={this._draggedValue}
        showBackdrop={false}>
        <View style={tripDetailStyles.panel}>
          <Text style={tripDetailStyles.tripName}>First trip</Text>
          <Text style={tripDetailStyles.tripDescription}>
            This is first trip
          </Text>
          <View style={tripDetailStyles.optionView}>
            <TouchableOpacity style={tripDetailStyles.optionItemView}>
              <MaterialCommunityIcons
                name={'pencil'}
                size={25}
                color={COLOR.black}
              />
              <Text>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tripDetailStyles.optionItemView}>
              <MaterialCommunityIcons
                name={'order-bool-descending'}
                size={25}
                color={COLOR.black}
              />
              <Text>Sắp xếp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tripDetailStyles.optionItemView}>
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
