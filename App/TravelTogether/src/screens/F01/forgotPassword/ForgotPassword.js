import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View} from 'react-native';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';

const ForgotPassword = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      fetchDetails={true}
      listViewDisplayed={false}
      query={{
        key: 'AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I',
        language: 'en',
      }}
    />
    //   <MapView
    //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //       style={styles.map}
    //       region={{
    //           latitude: 37.78825,
    //           longitude: -122.4324,
    //           latitudeDelta: 0.015,
    //           longitudeDelta: 0.0121,
    //       }}
    //   />
    // <MapView
    //   initialRegion={{
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.015,
    //     longitudeDelta: 0.0121,
    //   }}>
    //   <MapViewDirections
    //     origin={origin}
    //     destination={destination}
    //     apikey={GOOGLE_MAPS_APIKEY}
    //   />
    // </MapView>
  );
};

export default ForgotPassword;
