import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage
};

// Thunk middleware allows actions to be chained and waited on by returning
// a function from that action
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk';

// Logs all actions going through redux into console
// https://github.com/evgenyrodionov/redux-logger
import { createLogger } from 'redux-logger';
import { AppReducer } from '../redux';

// http://redux.js.org/docs/advanced/Middleware.html
const middleware = [thunk];

// Use the NODE_ENV to include logging and debugging tools
// in development environment. They will be compiled out of
// the production build.
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
  // Turns on Reactotron debugging tool
  //require('../config/ReactotronConfig');
}

const persistedReducer = persistReducer(persistConfig, AppReducer);

// Can use a preloaded initialState if available, in this case we don't
export default initialState => {
  // http://redux.js.org/docs/api/createStore.html
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
    // autoRehydrate()
  );
  const persistor = persistStore(store);
  // https://github.com/rt2zz/redux-persist
  // persistStore(store)
  return { store, persistor };
};
