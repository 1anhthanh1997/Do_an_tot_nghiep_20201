import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const destinationDetailStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    paddingTop: 20,
    paddingRight: 17,
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bodyView: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTripText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLOR.black,
    marginTop: 30,
    marginBottom: 30,
  },
  tripNameView: {
    width: '100%',
  },
  createNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  tripDescriptionView: {
    width: '100%',
    marginTop: 20,
  },
  tripDescriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  textInput: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
  },
  dateTouchable: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
    justifyContent: 'center',
  },
  createTripTouchable: {
    height: 44,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  infoView: {
    width: '100%',
    height: 250,
    backgroundColor: COLOR.white,
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    // paddingTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  flatListStyle: {
    height: 120,
    width: '100%',
    flexGrow: 0,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  placeAddress: {
    fontSize: 14,
    color: COLOR.dark_gray,
    marginTop: 5,
  },
  infoContent: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  destinationName: {
    fontSize: 16,
    color: COLOR.dark_gray,
    marginLeft: 5,
  },
  destinationLocation: {
    fontSize: 16,
    color: COLOR.dark_gray,
    marginLeft: 5,
  },
});
export default destinationDetailStyles;
