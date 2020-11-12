import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const loginStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tempView: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 100,
    marginTop: 100,
  },
  usernameInput: {
    width: '100%',
    height: 44,
    borderColor: COLOR.gray,
    borderRadius: 5,
    borderWidth: 1,
  },
  passwordInput: {
    marginTop: 15,
    width: '100%',
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.gray,
  },

  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  switchView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  switch: {
    marginRight: 10,
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  saveAccountText: {
    fontSize: 14,
    color: COLOR.gray,
  },
  resetPassView: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  resetPassText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.red,
  },
  registerView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: 50,
  },
  registerExplain: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  registerTouchable: {
    height: 30,
  },
  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.blue,
  },
  touchableHitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
});

export default loginStyles;
