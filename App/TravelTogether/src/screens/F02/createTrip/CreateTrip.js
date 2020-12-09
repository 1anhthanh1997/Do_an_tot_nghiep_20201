import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../../constants';
import createTripStyles from './CreateTripStyles';
import {useFocusEffect} from '@react-navigation/native';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_SCREEN,
} from '../../../navigations/routers';

const imageUri =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80';

const CreateTrip = ({navigation}) => {
  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={createTripStyles.createTripTouchable}
          onPress={() => navigation.navigate(NAVIGATE_TO_TRIP_SCREEN)}>
          <Text style={createTripStyles.createText}>Tạo</Text>
        </TouchableOpacity>
      ),
    });
  });

  const renderBody = () => {
    return (
      <View style={createTripStyles.bodyView}>
        <MaterialCommunityIcons name="map" color={COLOR.red} size={45} />
        <Text style={createTripStyles.createTripText}>Tạo một chuyến đi</Text>
        <View style={createTripStyles.tripNameView}>
          <Text style={createTripStyles.createNameText}>
            Đặt tên cho chuyến đi
          </Text>
          <TextInput
            style={createTripStyles.textInput}
            placeholder={'Tên chuyến đi'}
          />
        </View>
        <View style={createTripStyles.tripDescriptionView}>
          <Text style={createTripStyles.tripDescriptionText}>
            Mô tả cho chuyến đi
          </Text>
          <TextInput style={createTripStyles.textInput} placeholder={'Mô tả'} />
        </View>
      </View>
    );
  };

  return <View style={createTripStyles.screenView}>{renderBody()}</View>;
};
export default CreateTrip;
