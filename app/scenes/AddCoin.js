import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  ScrollView,
  StyleSheet
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { headerStyle, headerTitleStyle } from '../style/header.style';
import HeaderButton from '../components/header/Button';
import SubmitButton from '../components/form/Button';
import Input from '../components/form/Input';
import { getPrice } from '../api/cryptonator';
import { actionCreators } from '../redux/coins';

class AddCoin extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Add Coin',
    headerStyle,
    headerTitleStyle,
    headerLeft: (
      <HeaderButton
        icon="chevron-left"
        style={{ left: 10 }}
        onPress={() => navigation.goBack()}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      holding: {
        code: '',
        currency: '',
        amount: 0
      },
      mode: 'ADD',
      checkingValidity: false,
      cryptoUnavailable: false
    };

    const coin = this.props.navigation.state.params;

    if (coin) {
      this.state = {
        ...this.state,
        mode: 'EDIT',
        holding: {
          ...coin,
        }
      };
    }
  }

  addCoin = async () => {

    const { dispatch, navigation } = this.props;
    const { code, currency, amount } = this.state.holding;

    if (!code || !currency || !amount) return;

    this.setState({ checkingValidity: true, cryptoUnavailable: false });

    const { success, ticker, error } = await getPrice(code + '-' + currency);
    this.setState({ checkingValidity: false });
    if (success) {
      this.setState(
        {
          holding: {
            ...this.state.holding,
            price: parseFloat(ticker.price),
          }
        },
        () => {
          if (this.state.mode == 'ADD') {
            dispatch(actionCreators.addCoin(this.state.holding));
          } else {
            console.log(this.state.holding);
            dispatch(actionCreators.editCoin(this.state.holding));
          }
          navigation.goBack();
        }
      );
    }
    if (error) {
      this.setState({ cryptoUnavailable: true });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {this.state.checkingValidity && (
            <ActivityIndicator
              style={{ marginBottom: 10 }}
              size="small"
              color="#ffffff"
            />
          )}
          {this.state.cryptoUnavailable && (
            <Text style={styles.error}>
              Sorry, that combination is not currently available. Make sure to
              only include a single code.
            </Text>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              To add a holding you will need to supply the appropriate symbol
              for the cryptocurrency, and the symbol for the currency you would
              like to display the values in.
            </Text>
            <Text style={styles.text}>
              Note: Listed prices are estimated. Rates may vary significantly
              across different exchanges.
            </Text>
          </View>
          <Input
            label="Crypto Code"
            onChangeText={text =>
              this.setState({ holding: { ...this.state.holding, code: text } })
            }
            placeholder="(e.g. btc, ltc, eth)"
            defaultValue={this.state.holding.code}
          />

          <Input
            label="Display Currency Code"
            onChangeText={text =>
              this.setState({
                holding: { ...this.state.holding, currency: text }
              })
            }
            defaultValue={this.state.holding.currency}
            placeholder="(e.g. usd, cad, aud)"
          />
          <Input
            label="Amount of Coin"
            onChangeText={text =>
              this.setState({
                holding: { ...this.state.holding, amount: Number(text) }
              })
            }
            defaultValue={this.state.holding.amount.toString()}
          />
          <SubmitButton onPress={this.addCoin}>SUBMIT</SubmitButton>
        </ScrollView>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default connect()(AddCoin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: 'white',
    margin: 5,
    fontSize: 14
  },
  error: {
    color: '#FE215A',
    marginBottom: 10,
    fontSize: 14
  }
});
