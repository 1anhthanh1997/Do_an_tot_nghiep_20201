import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import loginStyles from './LoginStyles';

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
    if (password.length < 8 || !password.match(pass)) {
      return false;
    }
    return true;
  };
  const login = async () => {
    try {
      let data = {
        username: username,
        password: password,
      };
      let response = await fetch(
        'https://open-drone-map.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
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
    <View style={loginStyles.screenView}>
      <Image
        source={require('../../../assets/logo.png')}
        style={loginStyles.logo}
      />
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
  );
};
export default Login;
