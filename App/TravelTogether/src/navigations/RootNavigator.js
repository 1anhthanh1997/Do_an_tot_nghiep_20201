import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NAVIGATE_TO_LOGIN_SCREEN,
  NAVIGATE_TO_REGISTER_SCREEN,
  NAVIGATE_TO_HOME_SCREEN,
  NAVIGATE_TO_FORGOT_PASSWORD,
  NAVIGATE_TO_TAB_SCREEN,
  NAVIGATE_TO_TRIP_SCREEN,
  NAVIGATE_TO_NOTIFICATION_SCREEN,
  NAVIGATE_TO_PERSONAL_SCREEN,
} from './routers';
import {
  Login,
  Register,
  Home,
  ForgotPassword,
  Notification,
  Trip,
  Personal,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loginOption = {
  headerShown: false,
};

const registerOption = {
  headerTitle: 'Đăng ký',
};

const bottomTabOption = {
  headerShown: false,
};
const tabHomeOption = {
  tabBarLabel: 'Trang chủ',
  tabBarIcon: ({color, size}) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
  ),
};
const tabTripOption = {
  tabBarLabel: 'Chuyến đi',
  tabBarIcon: ({color, size}) => (
    <MaterialCommunityIcons name="map" color={color} size={size} />
  ),
};

const tabNotificationOption = {
  tabBarLabel: 'Thông báo',
  tabBarIcon: ({color, size}) => (
    <MaterialCommunityIcons name="bell" color={color} size={size} />
  ),
};

const tabPersonalOption = {
  tabBarLabel: 'Cá nhân',
  tabBarIcon: ({color, size}) => (
    <MaterialCommunityIcons name="account" color={color} size={size} />
  ),
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={NAVIGATE_TO_HOME_SCREEN}
        component={Home}
        options={tabHomeOption}
      />
      <Tab.Screen
        name={NAVIGATE_TO_TRIP_SCREEN}
        component={Trip}
        options={tabTripOption}
      />
      <Tab.Screen
        name={NAVIGATE_TO_NOTIFICATION_SCREEN}
        component={Notification}
        options={tabNotificationOption}
      />
      <Tab.Screen
        name={NAVIGATE_TO_PERSONAL_SCREEN}
        component={Personal}
        options={tabPersonalOption}
      />
    </Tab.Navigator>
  );
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
        <Stack.Screen
          name={NAVIGATE_TO_REGISTER_SCREEN}
          component={Register}
          options={registerOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_FORGOT_PASSWORD}
          component={ForgotPassword}
        />
        <Stack.Screen
          name={NAVIGATE_TO_TAB_SCREEN}
          component={BottomTabNavigation}
          options={bottomTabOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
