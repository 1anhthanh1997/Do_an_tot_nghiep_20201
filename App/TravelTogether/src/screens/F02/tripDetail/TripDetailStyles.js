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
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    paddingTop: 20,
    paddingRight: 17,
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tripName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  tripDescription: {
    marginTop: 10,
    fontSize: 16,
    // fontWeight: 'bold',
    color: COLOR.black,
  },
  tripStartTime: {
    marginTop: 10,
    fontSize: 16,
    // fontWeight: 'bold',
    color: COLOR.black,
  },
  tripEndTime: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 16,
    // fontWeight: 'bold',
    color: COLOR.black,
  },
  optionView: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: COLOR.stone,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  optionItemView: {
    width: '25%',
    // backgroundColor: COLOR.gray,
    alignItems: 'center',
  },
  placeItemView: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.stone,
    marginTop: 20,
  },
  scrollView: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 100,
  },
  placeImage: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  placeContentView: {
    width: '100%',
    paddingTop: 15,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  location: {
    fontSize: 14,
    color: COLOR.black,
    marginTop: 5,
  },
  floatButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLOR.blue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 25,
  },
});

export default tripDetailStyles;
