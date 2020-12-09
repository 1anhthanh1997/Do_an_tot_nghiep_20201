import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const createTripStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  bodyView: {
    width: '100%',
    paddingTop: 50,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  tripDescriptionView: {
    width: '100%',
    marginTop: 20,
  },
  tripDescriptionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  textInput: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
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
});
export default createTripStyles;
