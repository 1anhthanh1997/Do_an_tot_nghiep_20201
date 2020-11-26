import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import registerStyles from './RegisterStyles';
import {COLOR, STATUS} from '../../../constants';
import {
  validateUserName,
  validatePassword,
  validateNormalForm,
} from '../../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {postApi} from '../../../api';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';
import {NAVIGATE_TO_LOGIN_SCREEN} from '../../../navigations/routers';
import {connect} from 'react-redux';
import {register} from '../../../store/f01/actions';

const inputData = [
  {
    name: 'Tên đăng nhập',
  },
  {
    name: 'Mật khẩu',
  },
  {
    name: 'Xác nhận mật khẩu',
  },
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

const Register = ({navigation, register: _register, registerData}) => {
  const [infoForm, setInfoForm] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [error, setError] = useState([null, null, null, null, null, null]);
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [isDisplayErrorDialog, setIsDisplayErrorDialog] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(infoForm);
  }, [infoForm]);

  useEffect(() => {
    if (registerData.status === STATUS.SUCCESS) {
      setMessage('Đăng ký tài khoản thành công');
      setIsDisplayDialog(true);
    }
    if (registerData.status === STATUS.ERROR) {
      setErrorCode(registerData.errorCode);
      setErrorMessage(registerData.errorMessage);
      setIsDisplayErrorDialog(true);
    }
  }, [registerData]);

  const setInputValue = (value, index) => {
    console.log(value);
    let tmpArr = [...infoForm];
    tmpArr[index] = value;
    setInfoForm(tmpArr);
    console.log('ok');
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const replaceToScreen = (screenName) => {
    navigation.replace(screenName);
  };

  const onPressRegister = async () => {
    await validateRegisterForm();
    // console.log(checkHasError());
    if (!checkHasError()) {
      let formData = {
        username: infoForm[0],
        password: infoForm[1],
        name: infoForm[3],
        email: infoForm[4],
        phoneNumber: infoForm[5],
      };
      setIsLoading(true);
      await _register(formData);
    }
  };

  // const register = async (formData) => {
  //   try {
  //     const response = await postApi('/users', formData);
  //     setIsLoading(false);
  //     console.log(response);
  //     if (response.status === 201) {
  //       setMessage('Đăng ký tài khoản thành công');
  //       setIsDisplayDialog(true);
  //     }
  //   } catch (e) {
  //     setIsLoading(false);
  //     if (e.response.status === 409) {
  //       const tmpError = [...error];
  //       tmpError[0] = 'Tên người dùng đã tồn tại';
  //       setError(tmpError);
  //     } else {
  //       setMessage('Đã xảy ra lỗi');
  //       setIsDisplayErrorDialog(true);
  //     }
  //   }
  // };

  const checkHasError = () => {
    error.map((item) => {
      if (item) {
        return true;
      }
    });
    return false;
  };

  const validateRegisterForm = () => {
    let tmpArr = [...error];
    if (!validateUserName(infoForm[0])) {
      tmpArr[0] = 'Tên đăng nhập là trường bắt buộc và phải có ít nhất 8 ký tự';
      return;
    } else {
      tmpArr[0] = null;
    }
    if (!validatePassword(infoForm[1])) {
      tmpArr[1] = 'Mật khẩu là trường bắt buộc và phải có ít nhất 8 ký tự';
      return;
    } else {
      tmpArr[1] = null;
    }
    if (!validatePassword(infoForm[2])) {
      tmpArr[2] =
        'Xác nhận mật khẩu là trường bắt buộc và phải có ít nhất 8 ký tự';
      return;
    }
    if (infoForm[2] !== infoForm[1]) {
      tmpArr[2] = 'Xác nhận mật khẩu không trùng khớp';
      return;
    }
    tmpArr[2] = null;

    if (!validateNormalForm(infoForm[3])) {
      tmpArr[3] = 'Họ và tên là trường bắt buộc';
      return;
    } else {
      tmpArr[3] = null;
    }
    if (!validateNormalForm(infoForm[4])) {
      tmpArr[4] = 'Email là trường bắt buộc';
      return;
    } else {
      tmpArr[4] = null;
    }
    if (!validateNormalForm(infoForm[5])) {
      tmpArr[5] = 'Số điện thoại là trường bắt buộc';
      return;
    } else {
      tmpArr[5] = null;
    }
    setError(tmpArr);
  };

  const renderInputField = (index) => {
    if (index === 1 || index === 2) {
      return (
        <TextInput
          style={registerStyles.input}
          secureTextEntry={true}
          value={infoForm[index]}
          onChangeText={(val) => setInputValue(val, index)}
        />
      );
    }
    return (
      <TextInput
        caretHidden={index === 4}
        style={registerStyles.input}
        value={infoForm[index]}
        keyboardType={index === 5 ? 'numeric' : 'default'}
        onChangeText={(val) => setInputValue(val, index)}
      />
    );
  };

  const renderWarning = (index) => {
    if (error[index]) {
      return <Text style={registerStyles.errorText}>{error[index]}</Text>;
    }
  };

  const renderInputItem = ({item, index}) => {
    return (
      <View style={registerStyles.inputItemView}>
        <Text style={registerStyles.inputName}>{item.name}</Text>
        {renderInputField(index)}
        {renderWarning(index)}
      </View>
    );
  };

  const renderInput = () => {
    return (
      <View>
        <FlatList
          style={registerStyles.inputList}
          data={inputData}
          keyExtractor={(item) => item.name}
          renderItem={renderInputItem}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <TouchableOpacity
        hitSlop={registerStyles.touchableHitSlop}
        style={[registerStyles.registerButton, {backgroundColor: COLOR.blue}]}
        onPress={onPressRegister}>
        <Text style={registerStyles.registerText}>Đăng ký</Text>
      </TouchableOpacity>
    );
  };

  const renderDialog = () => {
    return (
      <View>
        <Dialog
          visible={isDisplayDialog}
          isDisplayPositiveButton={true}
          positiveButtonText={'Đóng'}
          onPressPositiveButton={() => {
            setIsDisplayDialog(false);
            replaceToScreen(NAVIGATE_TO_LOGIN_SCREEN);
          }}
          renderContent={
            <View style={registerStyles.dialog}>
              <Text style={registerStyles.textContent}>{message}</Text>
            </View>
          }
        />
        <Dialog
          visible={isDisplayErrorDialog}
          isDisplayPositiveButton={true}
          positiveButtonText={'Đóng'}
          onPressPositiveButton={() => setIsDisplayErrorDialog(false)}
          renderContent={
            <View style={registerStyles.dialog}>
              <Text style={registerStyles.textContent}>{errorMessage}</Text>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LoadingView visible={registerData.status === STATUS.LOADING} />
      <View style={registerStyles.screenView}>
        <ScrollView style={registerStyles.containerView}>
          {renderInput()}
        </ScrollView>
        {renderButton()}
        {renderDialog()}
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  const registerData = state.f01Reducer.register;
  return {
    registerData,
  };
};

export default connect(mapStateToProps, {register})(Register);
