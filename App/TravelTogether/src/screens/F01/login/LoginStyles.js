import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
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
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
  },
  passwordInput: {
    marginTop: 15,
    width: '100%',
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
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
  registerAndResetPassView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
  },
  registerView: {
    width: '50%',
    alignItems: 'center',
    padding: 5,
  },
  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetPassView: {
    width: '50%',
    alignItems: 'center',
    padding: 5,
  },
  resetPassText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  touchableHitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
});

export default loginStyles;