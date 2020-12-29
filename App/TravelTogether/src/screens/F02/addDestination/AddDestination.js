import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
// import SlidingUpPanel from 'rn-sliding-up-panel';
import addDestinationStyles from './AddDestinationStyles';
import {connect} from 'react-redux';
import {addDestination, getAllTrip} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {STATUS, SOCKET} from '../../../constants';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_TRIP_SCREEN} from '../../../navigations/routers';
const socket = SOCKET.socket;
// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';

//Google photo image
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&
// photoreference=YOUR_PHOTO_REFERENCE&key=YOUR_API_KEY

const AddDestination = ({
  navigation,
  route,
  addDestinationData,
  addDestination: _addDestination,
  getAllTripData,
  getAllTrip: _getAllTrip,
}) => {
  const {tripId} = route.params;
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [placeId, setPlaceId] = useState('');
  const [name, setName] = useState(null);
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState('');
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errCode, setErrorCode] = useState('');

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={addDestinationStyles.createTripTouchable}
          onPress={addDestination}>
          <Text style={addDestinationStyles.createText}>Thêm</Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      console.log(isFirstTime);
      return;
    }
    if (getAllTripData.status === STATUS.SUCCESS) {
      setMessage('Thêm địa điểm thành công');
      setIsDisplayDialog(true);
    }
    if (getAllTripData.status === STATUS.ERROR) {
      setErrorCode(getAllTripData.errorCode);
      setMessage(getAllTripData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [getAllTripData]);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }
    if (addDestinationData.status === STATUS.SUCCESS) {
      _getAllTrip();
    }
    if (addDestinationData.status === STATUS.ERROR) {
      setErrorCode(addDestinationData.errorCode);
      setMessage(addDestinationData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [addDestinationData]);

  const addDestination = () => {
    let destination = {
      groupId: tripId,
      destinationId: placeId,
      destinationName: name,
      destinationLocation: address,
      latitude: latitude,
      longitude: longitude,
      photoReference: photos[0].photo_reference,
    };
    socket.emit('room', {room: 'test-room'});
    _addDestination(destination);
  };

  const renderPlaceImageItem = ({item, index}) => {
    let itemUri =
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
      item.photo_reference +
      '&key=AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';
    return (
      <View style={{flex: 1}}>
        <Image
          style={{
            height: 120,
            width: 250,
            marginLeft: index !== 0 ? 5 : 0,
            borderTopLeftRadius: index === 0 ? 10 : 0,
            borderTopRightRadius: index === photos.length - 1 ? 10 : 0,
          }}
          source={{uri: itemUri}}
        />
      </View>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayDialog}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đóng'}
        onPressPositiveButton={() => {
          setIsDisplayDialog(false);
          if (!errCode) {
            navigation.navigate(NAVIGATE_TO_TRIP_SCREEN);
          }
        }}
        renderContent={<Text>{message}</Text>}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <LoadingView
        visible={
          addDestinationData.status === STATUS.LOADING ||
          getAllTripData.status === STATUS.LOADING
        }
      />
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('Hello');
          console.log(details.photos);
          setLatitude(details.geometry.location.lat);
          setLongitude(details.geometry.location.lng);
          setPlaceId(data.place_id);
          setName(details.name);
          setAddress(details.formatted_address);
          setPhotos(details.photos);
          setPhoneNumber(details.international_phone_number);
        }}
        fetchDetails={true}
        listViewDisplayed={'auto'}
        query={{
          key: 'AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I',
          language: 'vi',
        }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{flex: 1}}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={name}
          />
        </MapView>
        {name && (
          <View style={addDestinationStyles.infoView}>
            <FlatList
              style={addDestinationStyles.flatListStyle}
              data={photos}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPlaceImageItem}
            />
            <View style={addDestinationStyles.infoContent}>
              <Text style={addDestinationStyles.placeName}>{name}</Text>
              <Text style={addDestinationStyles.placeAddress}>{address}</Text>
              {phoneNumber && (
                <Text style={addDestinationStyles.placeAddress}>
                  {'Số điện thoại: ' + phoneNumber}
                </Text>
              )}
            </View>
          </View>
        )}
      </GooglePlacesAutocomplete>
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const addDestinationData = state.f02Reducer.addDestination;
  const getAllTripData = state.f02Reducer.getAllTrip;
  return {addDestinationData, getAllTripData};
};

export default connect(mapStateToProps, {addDestination, getAllTrip})(
  AddDestination,
);
