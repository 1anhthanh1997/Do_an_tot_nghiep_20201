import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const homeDetailStyles = {
  scrollView: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  screenView: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headerView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR.green,
    marginBottom: 10,
  },
  exploreImage: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  bodyView: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentView: {
    width: '100%',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.stone,
  },
  starContainer: {
    height: 20,
    width: 100,
    // backgroundColor: COLOR.gray,
  },
  star: {
    color: COLOR.green,
  },
  starStyles: {
    height: 15,
    width: 15,
    // backgroundColor: COLOR.red,
  },
  extraInfo: {
    fontSize: 14,
    color: COLOR.dark_gray,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  introduceView: {
    width: '100%',
    marginTop: 20,
  },
  introduceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  firstIntroduceItemView: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.stone,
  },
  iconView: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentIntroduceView: {
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  suggestedTimeText: {
    fontSize: 14,
    includeFontPadding: false,
  },
  phoneNumberText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.green,
    includeFontPadding: false,
  },
  imageView: {
    width: '100%',
    marginTop: 20,
  },
  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemImage: {
    width: '100%',
    height: 105,
    borderRadius: 5,
  },
  itemView: {
    width: 105,
    height: 105,
    marginLeft: 10,
  },
};

export default homeDetailStyles;
