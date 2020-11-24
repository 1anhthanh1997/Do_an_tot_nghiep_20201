import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getApi, postApi} from '../../../api';
import loginStyles from './LoginStyles';
import {ASYNC_STORAGE, IMG, STATUS} from '../../../constants';
import {
  NAVIGATE_TO_FORGOT_PASSWORD,
  NAVIGATE_TO_REGISTER_SCREEN,
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_TAB_SCREEN,
} from '../../../navigations/routers';
import LoadingView from '../../../commons/loadingView/LoadingView';
import {Dialog} from '../../../commons';
import {connect} from 'react-redux';
import {login} from '../../../store/f01/actions';

const loginUrl = '/users/login';

const Login = ({navigation, login: _login, loginData}) => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSwitchEnable, setIsSwitchEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayErrorDialog, setIsDisplayErrorDialog] = useState(false);
  const [errorCode, setErrorCode] = useState('EC0006');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserName = async () => {
      try {
        const switchStatusData = await AsyncStorage.getItem(
          ASYNC_STORAGE.SWITCH_STATUS,
        );
        setIsSwitchEnable(switchStatusData === 'true');
        if (switchStatusData && switchStatusData === 'true') {
          const usernameData = await AsyncStorage.getItem(
            ASYNC_STORAGE.USERNAME,
          );
          console.log(usernameData);
          setUserName(usernameData);
        }
      } catch (e) {
        // error reading value
      }
    };
    getUserName().then();
  }, []);

  useEffect(() => {
    const onLoginSuccess = async () => {
      if (isSwitchEnable) {
        await AsyncStorage.setItem(ASYNC_STORAGE.USERNAME, username);
      }
      replaceToScreen(NAVIGATE_TO_TAB_SCREEN);
    };
    if (loginData.status === STATUS.SUCCESS) {
      onLoginSuccess();
    }
    if (loginData.status === STATUS.ERROR) {
      console.log(loginData.errorCode);
      setErrorCode(loginData.errorCode);
      setErrorMessage(loginData.errorMessage);
      setIsDisplayErrorDialog(true);
    }
  }, [loginData]);

  const onPressRegister = () => {
    navigateToScreen(NAVIGATE_TO_REGISTER_SCREEN);
  };

  const onPressResetPassword = () => {
    navigateToScreen(NAVIGATE_TO_FORGOT_PASSWORD);
  };

  const onPressLogin = async () => {
    if (validate()) {
      // setIsLoading(true);
      let data = {
        username: username,
        password: password,
      };
      await AsyncStorage.setItem(
        ASYNC_STORAGE.SWITCH_STATUS,
        isSwitchEnable.toString(),
      );
      await _login(data);
    } else {
      setErrorMessage('Tài khoản hoặc mật khẩu không đúng định dạng.');
      setIsDisplayErrorDialog(true);
    }
  };

  const validate = () => {
    let pass = /^[A-Za-z]\w{7,14}$/;
    return !(password.length < 8 || !password.match(pass));
  };

  // const login = async () => {
  //   try {
  //     let data = {
  //       username: username,
  //       password: password,
  //     };
  //     let response = await postApi(loginUrl, data);
  //     if (response) {
  //       setIsLoading(false);
  //       if (response.status === 200 || response.status === 201) {
  //         await AsyncStorage.setItem(
  //           ASYNC_STORAGE.SWITCH_STATUS,
  //           isSwitchEnable.toString(),
  //         );
  //         if (isSwitchEnable) {
  //           await AsyncStorage.setItem(ASYNC_STORAGE.USERNAME, username);
  //         }
  //         replaceToScreen(NAVIGATE_TO_TAB_SCREEN);
  //       }
  //     }
  //   } catch (e) {
  //     setIsLoading(false);
  //     setMessage('Tài khoản hoặc mật khẩu không chính xác');
  //     setIsDisplayErrorDialog(true);
  //   }
  // };

  const toggleSwitch = () => {
    setIsSwitchEnable(!isSwitchEnable);
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const replaceToScreen = (screenName) => {
    navigation.replace(screenName);
  };

  const renderLogo = () => {
    return <Image source={IMG.logoApp} style={loginStyles.logo} />;
  };

  const renderTextInput = () => {
    return (
      <View style={loginStyles.tempView}>
        <TextInput
          style={loginStyles.usernameInput}
          value={username}
          onChangeText={(val) => setUserName(val)}
          placeholder={'Tên đăng nhập'}
        />
        <TextInput
          style={loginStyles.passwordInput}
          secureTextEntry={true}
          value={password}
          onChangeText={(val) => setPassword(val)}
          placeholder={'Mật khẩu'}
        />
      </View>
    );
  };

  const renderSwitch = () => {
    return (
      <View style={loginStyles.switchView}>
        <Switch
          trackColor={{false: 'gray', true: 'red'}}
          thumbColor={isSwitchEnable ? 'white' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isSwitchEnable}
          style={loginStyles.switch}
        />
        <Text style={loginStyles.saveAccountText}>Lưu tài khoản</Text>
      </View>
    );
  };

  const renderLoginButton = () => {
    if (!username || !password) {
      return (
        <View
          style={[loginStyles.loginButton, {backgroundColor: 'gray'}]}
          onPress={onPressLogin}>
          <Text style={loginStyles.loginText}>Đăng nhập</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          hitSlop={loginStyles.touchableHitSlop}
          style={[loginStyles.loginButton, {backgroundColor: 'red'}]}
          onPress={onPressLogin}>
          <Text style={loginStyles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderResetPass = () => {
    return (
      <TouchableOpacity
        hitSlop={loginStyles.touchableHitSlop}
        style={loginStyles.resetPassView}
        onPress={onPressResetPassword}>
        <Text style={loginStyles.resetPassText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    );
  };

  const renderRegister = () => {
    return (
      <View style={loginStyles.registerView}>
        <Text style={loginStyles.registerExplain}>Chưa có tài khoản? </Text>
        <TouchableOpacity
          hitSlop={loginStyles.touchableHitSlop}
          style={loginStyles.registerTouchable}
          onPress={onPressRegister}>
          <Text style={loginStyles.registerText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDialog = () => {
    return (
      <View>
        <Dialog
          visible={isDisplayErrorDialog}
          isDisplayPositiveButton={true}
          positiveButtonText={'Đóng'}
          onPressPositiveButton={() => setIsDisplayErrorDialog(false)}
          renderContent={
            <View style={loginStyles.dialog}>
              <Text style={loginStyles.textContent}>{errorMessage}</Text>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={loginStyles.screenView}>
        <LoadingView visible={loginData.status === STATUS.LOADING} />
        {renderLogo()}
        {renderTextInput()}
        {renderSwitch()}
        {renderLoginButton()}
        {renderResetPass()}
        {renderRegister()}
        {renderDialog()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  const loginData = state.userInfoReducer;
  return {
    loginData,
  };
};

// const mapDispatchToProps = {
//   login: login,
// };

export default connect(mapStateToProps, {login})(Login);
