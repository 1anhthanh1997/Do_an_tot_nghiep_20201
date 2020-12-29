// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import homeDetailStyles from './HomeDetailStyles';
import StarRating from 'react-native-star-rating';
import {COLOR, IMG} from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeDetail = ({navigation, route}) => {
  const {destinationInfo} = route.params;
  let imageUri =
    'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
    destinationInfo.imageLink[0] +
    '&key=AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';

  const onPressPhoneCall = () => {
    Linking.openURL(`tel:${destinationInfo.phoneNumber}`);
  };

  const renderSuggestionItem = ({item, index}) => {
    let itemUri =
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
      item +
      '&key=AIzaSyDBc0TE31eWVGLPKYOiddYjratfBiJRD1I';
    return (
      <TouchableOpacity
        style={[
          homeDetailStyles.itemView,
          index === 0 ? {marginLeft: 0} : {marginLeft: 10},
        ]}>
        <Image style={homeDetailStyles.itemImage} source={{uri: itemUri}} />
      </TouchableOpacity>
    );
  };

  const renderHeaderView = () => {
    return (
      <View style={homeDetailStyles.headerView}>
        <Image style={homeDetailStyles.exploreImage} source={{uri: imageUri}} />
      </View>
    );
  };

  const renderBodyView = () => {
    return (
      <View style={homeDetailStyles.bodyView}>
        <View style={homeDetailStyles.contentView}>
          <Text style={homeDetailStyles.nameText}>{destinationInfo.name}</Text>
          <StarRating
            disabled={true}
            containerStyle={homeDetailStyles.starContainer}
            starStyle={homeDetailStyles.star}
            buttonStyle={homeDetailStyles.starStyles}
            starSize={15}
            maxStars={5}
            rating={destinationInfo.star}
          />
          <Text style={homeDetailStyles.extraInfo}>
            {destinationInfo.numOfVote + ' đánh giá'}
          </Text>
          <Text style={homeDetailStyles.extraInfo}>
            {destinationInfo.description}
          </Text>
        </View>
        <View style={homeDetailStyles.introduceView}>
          <Text style={homeDetailStyles.introduceText}>Giới thiệu</Text>

          <View style={homeDetailStyles.firstIntroduceItemView}>
            <View style={homeDetailStyles.iconView}>
              <MaterialCommunityIcons
                name={'clock-outline'}
                size={25}
                color={COLOR.green}
              />
            </View>
            <View style={homeDetailStyles.contentIntroduceView}>
              <Text style={homeDetailStyles.suggestedTimeText}>
                {'Thời lượng gợi ý: ' + destinationInfo.hintTime}
              </Text>
            </View>
          </View>
          <View style={homeDetailStyles.firstIntroduceItemView}>
            <View style={homeDetailStyles.iconView}>
              <MaterialCommunityIcons
                name={'map-marker-outline'}
                size={25}
                color={COLOR.green}
              />
            </View>
            <View style={homeDetailStyles.contentIntroduceView}>
              <Text style={homeDetailStyles.suggestedTimeText}>
                {destinationInfo.location}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={homeDetailStyles.firstIntroduceItemView}
            onPress={onPressPhoneCall}>
            <View style={homeDetailStyles.iconView}>
              <MaterialCommunityIcons
                name={'phone-outline'}
                size={25}
                color={COLOR.green}
              />
            </View>
            <View style={homeDetailStyles.contentIntroduceView}>
              <Text style={homeDetailStyles.phoneNumberText}>
                {destinationInfo.phoneNumber}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={homeDetailStyles.imageView}>
            <Text style={homeDetailStyles.imageText}>Ảnh</Text>
            <FlatList
              style={{flexGrow: 0}}
              data={destinationInfo.imageLink}
              horizontal={true}
              renderItem={renderSuggestionItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={homeDetailStyles.scrollView}>
      <View style={homeDetailStyles.screenView}>
        {renderHeaderView()}
        {renderBodyView()}
      </View>
    </ScrollView>
  );
};
export default HomeDetail;
