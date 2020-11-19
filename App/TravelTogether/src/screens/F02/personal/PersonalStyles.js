import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const personalStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  personalItemView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.stone,
  },
  headView: {
    width: '100%',
    height: '25%',
    backgroundColor: COLOR.moss,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    paddingTop: 30,
    backgroundColor: COLOR.white,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default personalStyles;
