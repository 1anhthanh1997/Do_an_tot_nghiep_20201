import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NAVIGATE_TO_CHANGE_PASSWORD,
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN,
  NAVIGATE_TO_PERSONAL_SCREEN,
} from '../../../navigations/routers';
import {COLOR, IMG, STATUS} from '../../../constants';
import memberInfoStyles from './MemberInfoStyles';
import {Dialog} from '../../../commons';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {changePersonalInformation} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {white} from '../../../constants/Color';

const MemberInfo = ({
  navigation,
  route,
  loginData,
  changePersonalInformationData,
  changePersonalInformation: _changePersonalInformation,
}) => {
  const {info} = route.params;
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const personalListData = [
    {
      name: 'Họ và tên',
    },
    {
      name: 'Email',
    },
    {
      name: 'Số điện thoại',
    },
  ];
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [valueData, setValueData] = useState([
    info.name,
    info.email,
    info.phoneNumber,
  ]);
  const [avatarSource, setAvatarSource] = useState(info.avatarLink);
  const [errCode, setErrorCode] = useState('');
  const [message, setMessage] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  useEffect(() => {
    console.log(info);
    if (isFirstLogin) {
      setIsFirstLogin(false);
      return;
    }
    if (changePersonalInformationData.status === STATUS.SUCCESS) {
      console.log(
        changePersonalInformationData.changePersonalInformationResultData,
      );
      setMessage('Cập nhật thông tin thành công');
      setIsDisplayDialog(true);
    }
    if (changePersonalInformationData.status === STATUS.ERROR) {
      setErrorCode(loginData.errorCode);
      setMessage(loginData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [changePersonalInformationData]);

  const navigateToScreen = (name) => {
    navigation.navigate(name);
  };

  const replaceToScreen = (name) => {
    navigation.replace(name);
  };

  const onPressChooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setAvatarSource(source);
      }
    });
  };

  const onPressCall = () => {
    Linking.openURL(`tel:${valueData[2]}`);
  };

  const onPressMessage = () => {
    Linking.openURL(`sms:?body=Mã nhóm của bạn là: ${valueData[2]}`);
  };

  const renderPersonalInformationItem = ({item, index}) => {
    return (
      <View style={memberInfoStyles.personalInformationItemView}>
        <Text style={memberInfoStyles.titleText}>{item.name}</Text>
        <Text style={memberInfoStyles.contentText}>{valueData[index]}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={memberInfoStyles.headView}>
        <Image
          source={avatarSource ? {uri: avatarSource} : IMG.defaultAvatar}
          style={memberInfoStyles.avatar}
        />
      </View>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={memberInfoStyles.flatList}
        data={personalListData}
        renderItem={renderPersonalInformationItem}
        keyExtractor={(item) => item.name}
      />
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayDialog}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đóng'}
        onPressPositiveButton={() => {
          setIsDisplayDialog(false);
          navigateToScreen(NAVIGATE_TO_PERSONAL_SCREEN);
        }}
        renderContent={<Text>{message}</Text>}
      />
    );
  };

  const renderButton = () => {
    return (
      <View style={memberInfoStyles.buttonView}>
        <TouchableOpacity
          style={memberInfoStyles.buttonTouchable}
          onPress={onPressCall}>
          <MaterialCommunityIcons
            name={'phone'}
            size={30}
            color={COLOR.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={memberInfoStyles.secondButtonTouchable}
          onPress={onPressMessage}>
          <MaterialCommunityIcons
            name={'message'}
            size={30}
            color={COLOR.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={memberInfoStyles.screenView}>
      <LoadingView
        visible={changePersonalInformationData.status === STATUS.LOADING}
      />
      {renderHeader()}
      {renderBody()}
      {renderButton()}
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const loginData = state.f01Reducer.login;
  const changePersonalInformationData =
    state.f02Reducer.changePersonalInformation;
  return {loginData, changePersonalInformationData};
};

export default connect(mapStateToProps, {changePersonalInformation})(
  MemberInfo,
);
