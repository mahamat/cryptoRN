import { combineReducers } from 'redux';
import RootNavigation from '../navigators/RootNavigation';
import coins from '../redux/coins';

const navigation = (state, action) => {
  const newState = RootNavigation.router.getStateForAction(action, state);
  return newState || state;
};

export const AppReducer = combineReducers({
  nav:navigation,
  holdings:coins
});
