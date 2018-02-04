import { StackNavigator } from 'react-navigation';

import Home from '../scenes/Home';
import AddCoin from '../scenes/AddCoin';

import ScreenStyles from '../style/screen.style';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    AddCoin: {
      screen: AddCoin
    }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Home',
    mode: 'card',
    cardStyle: ScreenStyles.card,
    headerBackTitle: null
  }
);

export default RootNavigator;