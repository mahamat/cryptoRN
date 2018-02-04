import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './app/store/configureStore';
import RootNavigationState from './app/navigators/RootNavigationState';

const { store, persistor } = configureStore();

export default class App extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}
