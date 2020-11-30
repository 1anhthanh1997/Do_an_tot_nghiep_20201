import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

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
  );
};

export default ForgotPassword;
