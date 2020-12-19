import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const notificationStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  headerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLOR.blue,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  placeItemView: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLOR.stone,
    backgroundColor: COLOR.white,
  },
  contentView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  placeName: {
    fontSize: 14,
    color: COLOR.black,
  },
  time: {
    fontSize: 13,
    color: COLOR.gray,
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
  firstChildView: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondChildView: {
    width: '75%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  thirdChildView: {
    width: '10%',
  },
});

export default notificationStyles;
