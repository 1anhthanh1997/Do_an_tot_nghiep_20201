import React from 'react';
import RootNavigator from './src/navigations/RootNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

import allReducers from './src/store/f01/reducers';
// import MovieContainer from './containers/MovieContainer';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/store/f01/sagas/RootSaga';
// import logger from 'redux-logger';
LogBox.ignoreLogs(['currentlyFocusedField']);

const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
// import * as React from 'react';
// import {Text, View, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
//
// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => {
//           /* 1. Navigate to the Details route with params */
//           navigation.navigate('Details', {
//             itemId: 86,
//             otherParam: 'anything you want here',
//             test: 'test',
//           });
//         }}
//       />
//     </View>
//   );
// }
//
// function DetailsScreen({route, navigation}) {
//   /* 2. Get the param */
//   const {itemId} = route.params;
//   const {otherParam} = route.params;
//   const {test} = route.params;
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Details Screen</Text>
//       <Text>itemId: {test}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() =>
//           navigation.push('Details', {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }
//
// const Stack = createStackNavigator();
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
