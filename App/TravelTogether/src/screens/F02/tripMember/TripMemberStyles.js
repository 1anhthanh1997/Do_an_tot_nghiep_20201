import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const tripMemberStyles = StyleSheet.create({
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  placeLocation: {
    fontSize: 14,
    color: COLOR.gray,
  },
  deleteButton: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR.red,
  },
});

export default tripMemberStyles;
