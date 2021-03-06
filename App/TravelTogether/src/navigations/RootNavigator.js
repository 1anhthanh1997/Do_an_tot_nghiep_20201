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
  NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN,
  NAVIGATE_TO_CHANGE_PASSWORD,
  NAVIGATE_TO_CREATE_TRIP,
  NAVIGATE_TO_TRIP_DETAIL,
  NAVIGATE_TO_EDIT_TRIP,
  NAVIGATE_TO_ARRANGE_PLACE,
  NAVIGATE_TO_JOIN_TRIP,
  NAVIGATE_TO_TRIP_MEMBER,
  NAVIGATE_TO_MEMBER_INFO,
  NAVIGATE_TO_ADD_DESTINATION,
  NAVIGATE_TO_DESTINATION_DETAIL,
  NAVIGATE_TO_SEND_WARNING,
  NAVIGATE_TO_HOME_DETAIL,
} from './routers';
import {
  Login,
  Register,
  Home,
  ForgotPassword,
  Notification,
  Trip,
  CreateTrip,
  TripDetail,
  Personal,
  PersonalInformation,
  ChangePassword,
  EditTrip,
  ArrangePlace,
  JoinTrip,
  TripMember,
  MemberInfo,
  AddDestination,
  DestinationDetail,
  SendWarning,
  HomeDetail,
} from '../screens';
import {COLOR} from '../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const loginOption = {
  headerShown: false,
};

const registerOption = {
  headerTitle: 'Đăng ký',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const changePasswordOption = {
  headerTitle: 'Đổi mật khẩu',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const createTripOption = {
  headerTitle: 'Tạo chuyến đi',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const editTripOption = {
  headerTitle: 'Chỉnh sửa chuyến đi',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const arrangePlaceOption = {
  headerTitle: 'Sắp xếp',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const joinTripOption = {
  headerTitle: 'Tham gia nhóm',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const tripMemberOption = {
  headerTitle: 'Danh sách thành viên',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const memberInfoOption = {
  headerShown: false,
  // headerTitle: 'Thông tin thành viên',
  // headerStyle: {
  //   backgroundColor: COLOR.blue,
  // },
  // headerTintColor: COLOR.white,
};

const addDestinationOption = {
  // headerShown: false,
  headerTitle: 'Thêm điểm dừng chân',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const destinationDetailOption = {
  // headerShown: false,
  headerTitle: 'Thông tin điểm đến',
  headerStyle: {
    backgroundColor: COLOR.blue,
  },
  headerTintColor: COLOR.white,
};

const sendWarningOption = {
  headerShown: false,
  // headerTitle: 'Gửi cảnh báo',
  // headerStyle: {
  //   backgroundColor: COLOR.blue,
  // },
  // headerTintColor: COLOR.white,
};

const tripDetailOption = {
  headerShown: false,
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
        name={NAVIGATE_TO_TRIP_SCREEN}
        component={Trip}
        options={tabTripOption}
      />
      <Tab.Screen
        name={NAVIGATE_TO_HOME_SCREEN}
        component={Home}
        options={tabHomeOption}
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
        <Stack.Screen
          name={NAVIGATE_TO_PERSONAL_INFORMATION_SCREEN}
          component={PersonalInformation}
          options={bottomTabOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_CHANGE_PASSWORD}
          component={ChangePassword}
          options={changePasswordOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_CREATE_TRIP}
          component={CreateTrip}
          options={createTripOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_TRIP_DETAIL}
          component={TripDetail}
          options={tripDetailOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_EDIT_TRIP}
          component={EditTrip}
          options={editTripOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_ARRANGE_PLACE}
          component={ArrangePlace}
          options={arrangePlaceOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_JOIN_TRIP}
          component={JoinTrip}
          options={joinTripOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_TRIP_MEMBER}
          component={TripMember}
          options={tripMemberOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_MEMBER_INFO}
          component={MemberInfo}
          options={memberInfoOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_ADD_DESTINATION}
          component={AddDestination}
          options={addDestinationOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_DESTINATION_DETAIL}
          component={DestinationDetail}
          options={destinationDetailOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_SEND_WARNING}
          component={SendWarning}
          options={sendWarningOption}
        />
        <Stack.Screen
          name={NAVIGATE_TO_HOME_DETAIL}
          component={HomeDetail}
          options={sendWarningOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
