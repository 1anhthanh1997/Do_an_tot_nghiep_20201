import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const registerStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
  },
  containerView: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    paddingBottom: 100,
  },
  inputItemView: {
    width: '100%',
    marginTop: 10,
  },
  inputList: {
    width: '100%',
  },
  inputName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: COLOR.gray,
    borderRadius: 5,
    borderWidth: 1,
  },
  registerButton: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: COLOR.red,
  },
  touchableHitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
});

export default registerStyles;
