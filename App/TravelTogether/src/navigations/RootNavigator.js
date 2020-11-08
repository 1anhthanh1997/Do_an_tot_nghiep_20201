import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {Login, Register} from '../screens/index';
import Login from '../screens/F01/login/Login';
import Register from '../screens/F01/register/Register';
import Home from '../screens/F02/home/Home';

const Stack = createStackNavigator();

const loginOption = {
  headerShown: false,
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={loginOption} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
