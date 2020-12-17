import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const joinTripStyles = StyleSheet.create({
  screenView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 5,
  },
  joinTripText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  joinTripButton: {
    width: '50%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: COLOR.blue,
  },
  joinTripButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.white,
  },
});

export default joinTripStyles;
