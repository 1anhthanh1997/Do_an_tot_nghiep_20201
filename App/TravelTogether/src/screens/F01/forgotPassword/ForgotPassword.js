import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Dialog} from '../../../commons';

const ForgotPassword = () => {
  const [isDisplayDialog, setIsDisplayDialog] = useState(true);
  return (
    <View style={{flex: 1}}>
      <Text>ForgotPassword</Text>
      <Dialog
        visible={isDisplayDialog}
        isDisplayTitle={true}
        title={'This is title'}
        isDisplayNegativeButton={true}
        negativeButtonText={'Thử lại'}
        isDisplayPositiveButton={true}
        positiveButtonText={'Đóng'}
        onPressNegativeButton={() => setIsDisplayDialog(!isDisplayDialog)}
        onPressPositiveButton={() => setIsDisplayDialog(!isDisplayDialog)}
        renderContent={<Text>Hello</Text>}
      />
    </View>
  );
};
export default ForgotPassword;
