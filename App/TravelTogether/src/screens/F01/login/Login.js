import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {getApi, postApi} from '../../../api';
import loginStyles from './LoginStyles';
import {ASYNC_STORAGE, IMG} from '../../../constants';

const loginUrl = '/users/login';

const Login = ({navigation}) => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const onPressRegister = () => {
    navigation.navigate('Register');
  };

  const onPressLogin = () => {
    if (validate()) {
      login();
    } else {
      Alert.alert('Tài khoản hoặc mật khẩu không đúng định dạng.');
    }
  };

  const validate = () => {
    let pass = /^[A-Za-z]\w{7,14}$/;
    return !(password.length < 8 || !password.match(pass));
  };
  const login = async () => {
    try {
      let data = {
        username: username,
        password: password,
      };
      let response = await postApi(loginUrl, data);
      if (response.status === 200 || response.status === 201) {
        // let responseJson = await response.json();
        console.log(response);
        navigation.replace('Home');
      } else {
        Alert.alert('Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (e) {
      console.log(e);
    }
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={loginStyles.screenView}>
        <Image source={IMG.logoApp} style={loginStyles.logo} />
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
        {renderLoginButton()}
        <View style={loginStyles.registerAndResetPassView}>
          <TouchableOpacity
            style={loginStyles.registerView}
            onPress={onPressRegister}>
            <Text style={loginStyles.registerText}>Tạo tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity style={loginStyles.resetPassView}>
            <Text style={loginStyles.resetPassText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;
