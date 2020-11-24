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
} from '../../../navigations/routers';
import {COLOR, IMG} from '../../../constants';
import personalInformationStyles from './PersonalInformationStyles';
import {Dialog} from '../../../commons';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const PersonalInformation = ({navigation, loginData}) => {
  const personalListData = [
    {
      name: 'Họ và tên',
      value: loginData.loginResultData.name,
    },
    {
      name: 'Email',
      value: loginData.loginResultData.email,
    },
    {
      name: 'Số điện thoại',
      value: loginData.loginResultData.phoneNumber,
    },
  ];
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [valueData, setValueData] = useState([
    loginData.loginResultData.name,
    loginData.loginResultData.email,
    loginData.loginResultData.phoneNumber,
  ]);

  useEffect(() => {
    console.log(loginData.loginResultData.name);
  }, []);

  const navigateToScreen = (name) => {
    navigation.navigate(name);
  };

  const replaceToScreen = (name) => {
    navigation.replace(name);
  };

  const onPressTouchable = (index) => {
    switch (index) {
      case 0: {
        navigateToScreen(NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN);
        break;
      }
      case 1: {
        navigateToScreen(NAVIGATE_TO_CHANGE_PASSWORD);
        break;
      }
      case 2: {
        setIsDisplayDialog(true);
        break;
      }
      default:
        break;
    }
  };

  const renderPersonalInformationItem = ({item, index}) => {
    return (
      <View style={personalInformationStyles.personalInformationItemView}>
        <Text style={personalInformationStyles.titleText}>{item.name}</Text>
        <TextInput
          style={personalInformationStyles.textInput}
          value={valueData[index]}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={personalInformationStyles.headView}>
        <Image
          source={IMG.defaultAvatar}
          style={personalInformationStyles.avatar}
        />
        <TouchableOpacity style={personalInformationStyles.chooseImageButton}>
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

  const renderDialog = () => {
    return (
      <Dialog
        visible={isDisplayDialog}
        isDisplayTitle={true}
        title={'Cảnh báo'}
        isDisplayNegativeButton={true}
        negativeButtonText={'Hủy'}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đồng ý'}
        onPressNegativeButton={() => setIsDisplayDialog(false)}
        onPressPositiveButton={() => {
          setIsDisplayDialog(false);
          replaceToScreen(NAVIGATE_TO_LOGIN_SCREEN);
        }}
        renderContent={<Text>Bạn có chắc chắn muốn đăng xuất?</Text>}
      />
    );
  };

  return (
    <View style={personalInformationStyles.screenView}>
      {renderHeader()}
      {renderBody()}
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const loginData = state.f01Reducer.login;
  return {loginData};
};

export default connect(mapStateToProps, null)(PersonalInformation);
