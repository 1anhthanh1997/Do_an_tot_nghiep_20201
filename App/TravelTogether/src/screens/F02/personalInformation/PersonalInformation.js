import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NAVIGATE_TO_CHANGE_PASSWORD,
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN,
  NAVIGATE_TO_PERSONAL_SCREEN,
} from '../../../navigations/routers';
import {COLOR, IMG, STATUS} from '../../../constants';
import personalInformationStyles from './PersonalInformationStyles';
import {Dialog} from '../../../commons';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  changePersonalInformation,
  uploadImage,
} from '../../../store/f01/actions';
import LoadingView from '../../../commons/loadingView/LoadingView';
import f02Reducer from '../../../store/f01/reducers/F02Reducer';

const PersonalInformation = ({
  navigation,
  loginData,
  changePersonalInformationData,
  uploadImageData,
  changePersonalInformation: _changePersonalInformation,
  uploadImage: _uploadImage,
}) => {
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
    loginData.loginResultData.name,
    loginData.loginResultData.email,
    loginData.loginResultData.phoneNumber,
  ]);
  const [avatar, setAvatar] = useState(loginData.loginResultData.avatarLink);
  const [imageData, setImageData] = useState('');
  const [errCode, setErrorCode] = useState('');
  const [message, setMessage] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  useEffect(() => {
    // console.log(changePersonalInformationData.status);
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

  useEffect(() => {
    console.log(uploadImageData.status);
    console.log(isFirstLogin);
    if (isFirstLogin) {
      setIsFirstLogin(false);
      return;
    }
    if (uploadImageData.status === STATUS.SUCCESS) {
      console.log('Change Info');
      let data = {
        name: valueData[0],
        email: valueData[1],
        phoneNumber: valueData[2],
        avatarLink: uploadImageData.uploadImageResultData.avatarLink,
      };
      _changePersonalInformation(data);
    }
    if (uploadImageData.status === STATUS.ERROR) {
      setErrorCode(uploadImageData.errorCode);
      setMessage(uploadImageData.errorMessage);
      setIsDisplayDialog(true);
    }
  }, [uploadImageData]);

  const navigateToScreen = (name) => {
    navigation.navigate(name);
  };

  const replaceToScreen = (name) => {
    navigation.replace(name);
  };

  const onPressChooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);

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
        const image = {
          path: response.path,
          uri: response.uri,
          width: response.width,
          height: response.height,
          type: response.type,
          name: response.fileName,
        };

        setImageData(image);
        setAvatar(response.uri);
      }
    });
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then((image) => {
    //   console.log(image);
    // });
  };

  const onPressUpdate = () => {
    let image = new FormData();
    const editData = {
      uri: imageData.uri,
      height: imageData.height,
      width: imageData.width,
      type: imageData.type,
      name: imageData.name,
    };
    image.append('avatar', editData);
    _uploadImage(image);
  };

  const onChangeInfo = (value, index) => {
    let tmpArr = [...valueData];
    tmpArr[index] = value;
    setValueData(tmpArr);
  };

  const renderPersonalInformationItem = ({item, index}) => {
    return (
      <View style={personalInformationStyles.personalInformationItemView}>
        <Text style={personalInformationStyles.titleText}>{item.name}</Text>
        <TextInput
          caretHidden={index === 1}
          style={personalInformationStyles.textInput}
          value={valueData[index]}
          onChangeText={(val) => onChangeInfo(val, index)}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={personalInformationStyles.headView}>
        <Image
          source={avatar ? {uri: avatar} : IMG.defaultAvatar}
          style={personalInformationStyles.avatar}
        />
        <TouchableOpacity
          style={personalInformationStyles.chooseImageButton}
          onPress={onPressChooseImage}>
          <Text style={personalInformationStyles.chooseImageButtonText}>
            Chọn ảnh
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={personalInformationStyles.flatList}
        data={personalListData}
        renderItem={renderPersonalInformationItem}
        keyExtractor={(item) => item.name}
      />
    );
  };

  const renderFooter = () => {
    return (
      <TouchableOpacity
        style={[
          personalInformationStyles.updateButton,
          {backgroundColor: COLOR.blue},
        ]}
        onPress={onPressUpdate}>
        <Text style={personalInformationStyles.updateText}>Cập nhật</Text>
      </TouchableOpacity>
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

  return (
    <View style={personalInformationStyles.screenView}>
      <LoadingView
        visible={
          changePersonalInformationData.status === STATUS.LOADING ||
          uploadImageData.status === STATUS.LOADING
        }
      />
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const loginData = state.f01Reducer.login;
  const changePersonalInformationData =
    state.f02Reducer.changePersonalInformation;
  const uploadImageData = state.f02Reducer.uploadImage;
  return {loginData, changePersonalInformationData, uploadImageData};
};

export default connect(mapStateToProps, {
  changePersonalInformation,
  uploadImage,
})(PersonalInformation);
