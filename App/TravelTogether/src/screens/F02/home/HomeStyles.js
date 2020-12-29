import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const homeStyles = {
  screenView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLOR.white,
  },
  headerView: {
    marginTop: 20,
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR.green,
    marginBottom: 20,
  },
  exploreImage: {
    width: '100%',
    height: 140,
    position: 'absolute',
    top: 0,
    borderRadius: 5,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLOR.white,
  },
  firstSuggestionView: {
    width: '100%',
  },
  firstSuggestionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  firstSuggestionItemView: {
    width: 300,
    height: 270,
    marginLeft: 10,
  },
  firstSuggestionItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  starStyles: {
    height: 15,
    width: 15,
    // backgroundColor: COLOR.red,
  },
  starContainer: {
    height: 20,
    width: 100,
    // backgroundColor: COLOR.gray,
  },
  star: {
    color: COLOR.green,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  extraInfo: {
    fontSize: 14,
    color: COLOR.dark_gray,
  },
};

export default homeStyles;
