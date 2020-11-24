import React from 'react';
import RootNavigator from './src/navigations/RootNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import allReducers from './src/store/f01/reducers';
// import MovieContainer from './containers/MovieContainer';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/store/f01/sagas/RootSaga';
// import logger from 'redux-logger';

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
