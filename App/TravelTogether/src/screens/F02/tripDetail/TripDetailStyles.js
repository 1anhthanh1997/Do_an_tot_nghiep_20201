import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const tripDetailStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoView: {
    width: '100%',
    height: '60%',
    zIndex: 2,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
});

export default tripDetailStyles;
