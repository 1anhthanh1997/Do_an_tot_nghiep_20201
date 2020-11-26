import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const changePasswordStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    paddingTop: 30,
    height: 100,
    backgroundColor: COLOR.white,
  },
  changePasswordItemView: {
    width: '100%',
    padding: 20,
    // backgroundColor: 'red',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray,
  },
  titleText: {
    fontSize: 14,
    color: COLOR.gray,
  },
  changePasswordTouchable: {
    width: '100%',
    padding: 15,
    backgroundColor: COLOR.blue,
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 16,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  dialogView: {
    width: '100%',
    justifyContent: 'center',
  },
  dialogText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default changePasswordStyles;
