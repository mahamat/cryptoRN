import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  ScrollView
} from 'react-native';
import { headerStyle, headerTitleStyle } from '../style/header.style';

import HeaderButton from '../components/header/Button';
import Holdings from '../components/content/Holdings';
import { actionCreators } from '../redux/coins';

const mapStateToProps = state => ({
  coins: state.holdings.entities,
  coinsTimestamp: state.holdings.timestamp,
  isUpdating: state.holdings.isUpdating
});

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { state } = navigation;
    return {
      title: 'cryptoRN',
      headerStyle,
      headerTitleStyle,
      headerRight: (
        <HeaderButton
          icon="add"
          style={{ right: 10 }}
          onPress={() => navigation.navigate('AddCoin')}
        />
      )
    };
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchData());
  }

  removeItem = item => {
    const { dispatch } = this.props;
    dispatch(actionCreators.removeItem(item));
  };

  editItem = item => {
    const { navigation } = this.props;
    navigation.navigate('AddCoin', item);
  }

  refreshData = () => {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchData());
  };

  render() {
    const { coins, isUpdating, coinsTimestamp} = this.props;
    const dateTime = coinsTimestamp?new Date(coinsTimestamp).toLocaleString():null;
    let size = Object.keys(coins).length;
    return (
      <View style={styles.container}>
        {size == 0 && (
          <View style={styles.addCoinContainer}>
            <Text style={styles.addCoinText}>
              <Text style={{ color: 'green', fontWeight: 'bold' }}>
                cryptoRN
              </Text>{' '}
              is a React Native application that allows you to keep track of the
              approximate worth of your cryptocurency portfolio.
              {'\n'}
              {'\n'}
              From top right, click on plus button and add your cryptocurencies.
            </Text>
          </View>
        )}
        {size > 0 && <Text style={styles.holdingsTitle}>Holdings</Text>}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isUpdating} onRefresh={this.refreshData} />
          }
        >
          <Holdings items={coins} onRemoveItem={this.removeItem} onEditItem={this.editItem} />
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {dateTime && <Text>Last Update: {dateTime}.{'\n'}</Text>} 
            Prices provided by Cryptonator ™. Disclaimer: Do not use this
            application to make investment decisions. Displayed prices may not
            reflect actual prices.
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  holdingsTitle: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 10
  },
  addCoinContainer: {
    backgroundColor: '#262839',
    padding: 10
  },
  addCoinText: {
    color: '#ffffff'
  },
  footer: {
    backgroundColor: '#222332',
    padding: 10
  },
  footerText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 12
  }
});
