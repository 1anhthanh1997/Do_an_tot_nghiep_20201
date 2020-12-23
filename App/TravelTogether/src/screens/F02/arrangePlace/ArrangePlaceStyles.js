import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const arrangePlaceStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  placeItemView: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLOR.stone,
  },
  contentView: {
    width: '85%',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  placeLocation: {
    fontSize: 14,
    color: COLOR.dark_gray,
  },
  deleteButton: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR.red,
  },
});

export default arrangePlaceStyles;
