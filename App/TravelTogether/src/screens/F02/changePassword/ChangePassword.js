import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import changePasswordStyles from './ChangePasswordStyles';
import {changePassword} from '../../../store/f01/actions';
import {STATUS} from '../../../constants';
import {connect} from 'react-redux';
import {Dialog} from '../../../commons';
import {validatePassword} from '../../../utils';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {NAVIGATE_TO_PERSONAL_SCREEN} from '../../../navigations/routers';

const changePasswordListData = [
  {
    name: 'Mật khẩu cũ',
  },
  {
    name: 'Mật khẩu mới',
  },
  {
    name: 'Xác nhận mật khẩu mới',
  },
];

const ChangePassword = ({
  navigation,
  changePasswordData,
  changePassword: _changePassword,
}) => {
  const [valueData, setValueData] = useState([null, null, null]);
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [message, setMessage] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  useEffect(() => {
    if (isFirstLogin) {
      setIsFirstLogin(false);
      return;
    }
    if (changePasswordData.status === STATUS.SUCCESS) {
      setIsDisplayDialog(true);
      setMessage('Đổi mật khẩu thành công');
    }
    if (changePasswordData.status === STATUS.ERROR) {
      setIsDisplayDialog(true);
      setErrorCode(changePasswordData.errorCode);
      setMessage(changePasswordData.errorMessage);
    }
  }, [changePasswordData]);

  const onChangeInfo = (value, index) => {
    let tmpArr = [...valueData];
    tmpArr[index] = value;
    setValueData(tmpArr);
  };

  const validate = () => {
    if (!validatePassword(valueData[0]) && !validatePassword(valueData[1])) {
      return false;
    }
    if (valueData[1] !== valueData[2]) {
      return false;
    }
    return true;
  };

  const onPressChangePassword = () => {
    if (validate()) {
      let data = {
        oldPassword: valueData[0],
        newPassword: valueData[1],
      };
      _changePassword(data);
    } else {
      setErrorCode('ESI0001');
      setMessage('Mật khẩu không đúng định dạng.\nVui lòng kiểm tra lại.');
      setIsDisplayDialog(true);
    }
  };

  const renderChangePasswordItem = ({item, index}) => {
    return (
      <View style={changePasswordStyles.changePasswordItemView}>
        <Text style={changePasswordStyles.titleText}>{item.name}</Text>
        <TextInput
          secureTextEntry={true}
          style={changePasswordStyles.textInput}
          value={valueData[index]}
          onChangeText={(val) => onChangeInfo(val, index)}
        />
      </View>
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
          if (!errorCode) {
            navigation.navigate(NAVIGATE_TO_PERSONAL_SCREEN);
          }
        }}
        renderContent={
          <View style={changePasswordStyles.dialogView}>
            <Text style={changePasswordStyles.dialogText}>{message}</Text>
          </View>
        }
      />
    );
  };

  return (
    <View style={changePasswordStyles.screenView}>
      <LoadingView visible={changePasswordData.status === STATUS.LOADING} />
      <FlatList
        style={changePasswordStyles.flatList}
        data={changePasswordListData}
        renderItem={renderChangePasswordItem}
        keyExtractor={(item) => item.name}
      />

      <TouchableOpacity
        style={changePasswordStyles.changePasswordTouchable}
        onPress={onPressChangePassword}>
        <Text style={changePasswordStyles.changePasswordText}>
          Xác nhận
        </Text>
      </TouchableOpacity>
      {renderDialog()}
    </View>
  );
};

const mapStateToProps = (state) => {
  const changePasswordData = state.f02Reducer.changePassword;
  return {changePasswordData};
};

export default connect(mapStateToProps, {changePassword})(ChangePassword);
