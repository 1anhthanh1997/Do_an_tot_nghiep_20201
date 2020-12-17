import {StyleSheet} from 'react-native';
import {COLOR} from '../../../constants';

const tripStyles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  headerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLOR.white,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  bodyView: {
    width: '100%',
    paddingTop: 10,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 70,
  },
  bodyNullView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 70,
  },
  bodyNullText: {
    fontSize: 16,
    color: COLOR.gray,
    textAlign: 'center',
  },
  tripView: {
    width: '100%',
    height: 250,
    backgroundColor: COLOR.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.stone,
    marginTop: 10,
  },
  tripImage: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  tripContent: {
    width: '100%',
    paddingLeft: 10,
    paddingTop: 10,
  },
  ownerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  tripNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  smallTripOwnerText: {
    fontSize: 14,
    color: COLOR.black,
  },
  tripOwnerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  floatButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLOR.blue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  secondFloatButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLOR.blue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});
export default tripStyles;
