import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_REGISTER_SCREEN,
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_FORGOT_PASSWORD,
} from './routers';
import {Login, Register, Home, ForgotPassword} from '../screens';

const Stack = createStackNavigator();

const loginOption = {
  headerShown: false,
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATE_TO_LOGIN_SCREEN}>
        <Stack.Screen
          name={NAVIGATE_TO_LOGIN_SCREEN}
          component={Login}
          options={loginOption}
        />
        <Stack.Screen name={NAVIGATE_TO_REGISTER_SCREEN} component={Register} />
        <Stack.Screen
          name={NAVIGATE_TO_FORGOT_PASSWORD}
          component={ForgotPassword}
        />
        <Stack.Screen name={NAVIGATE_TO_HOME_SCREEN} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
