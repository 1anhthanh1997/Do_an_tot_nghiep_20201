import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const personalInformationStyles = StyleSheet.create({
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
    backgroundColor: COLOR.green,
    opacity: 0.8,
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
  chooseImageButton: {
    width: 80,
    padding: 5,
    alignItems: 'center',
    backgroundColor: COLOR.blue,
    borderRadius: 5,
    marginTop: 10,
  },
  chooseImageButtonText: {
    fontSize: 14,
    color: COLOR.white,
  },
  personalInformationItemView: {
    width: '100%',
    padding: 20,
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
});


export default personalInformationStyles;
