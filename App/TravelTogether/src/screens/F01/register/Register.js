import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import registerStyles from './RegisterStyles';
import {COLOR} from '../../../constants';
import {
  validateUserName,
  validatePassword,
  validateNormalForm,
} from '../../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const Register = () => {
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

  const setInputValue = (value, index) => {
    let tmpArr = [...infoForm];
    tmpArr[index] = value;
    setInfoForm(tmpArr);
  };

  const onPressRegister = () => {
    let tmpArr = [...error];
    if (!validateUserName(infoForm[0])) {
      tmpArr[0] = 'Tên đăng nhập là trường bắt buộc và phải có ít nhất 8 ký tự';
    } else {
      tmpArr[0] = null;
    }
    if (!validatePassword(infoForm[1])) {
      tmpArr[1] = 'Mật khẩu là trường bắt buộc và phải có ít nhất 8 ký tự';
    } else {
      tmpArr[1] = null;
    }
    if (!validatePassword(infoForm[2])) {
      tmpArr[2] =
        'Xác nhận mật khẩu là trường bắt buộc và phải có ít nhất 8 ký tự';
    } else {
      tmpArr[2] = null;
    }
    if (!validateNormalForm(infoForm[3])) {
      tmpArr[3] = 'Họ và tên là trường bắt buộc';
    } else {
      tmpArr[3] = null;
    }
    if (!validateNormalForm(infoForm[4])) {
      tmpArr[4] = 'Email là trường bắt buộc';
    } else {
      tmpArr[4] = null;
    }
    if (!validateNormalForm(infoForm[5])) {
      tmpArr[5] = 'Số điện thoại là trường bắt buộc';
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
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={registerStyles.screenView}>
        <ScrollView style={registerStyles.containerView}>
          {renderInput()}
        </ScrollView>
        {renderButton()}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Register;
