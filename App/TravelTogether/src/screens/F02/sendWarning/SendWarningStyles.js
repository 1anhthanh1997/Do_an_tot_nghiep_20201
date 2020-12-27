import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const sendWarningStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 50,
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
  secondTextInput: {
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
  },
  dateTouchable: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.black,
    justifyContent: 'center',
    paddingLeft: 5,
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
  dropDownContainer: {height: 40, marginTop: 10},
});

export default sendWarningStyles;
