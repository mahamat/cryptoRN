import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class Holdings extends Component {

  renderHolding = (item, i) => {
    const swipeoutBtns = [
      {
        text: 'EDIT',
        backgroundColor: 'green',
        color: '#ffffff',
        underlayColor: 'green',
        onPress: () => {
          this.props.onEditItem(item);
        }
      },
      {
        text: 'DEL',
        backgroundColor: '#FE2A57',
        color: '#ffffff',
        underlayColor: '#FE2A57',
        onPress: () => {
          this.props.onRemoveItem(item);
        }
      }
    ];
    return (
      <Swipeout autoClose={true} key={item.id} style={styles.swipeout} right={swipeoutBtns}>
        <View style={styles.item}>
          <View>
            <Text style={styles.currency}>
              {item.code.toUpperCase()}/{item.currency.toUpperCase()}
            </Text>
            <Text style={styles.amount}>
              <Text style={{ fontWeight: 'bold' }}>Coins:</Text> {item.amount}
            </Text>
            <Text style={styles.totalValue}>
              Value: {(item.price * item.amount).toFixed(2)}
            </Text>
          </View>
          <Text style={{ color: '#FF3C2F' }}>
            <Text style={{ fontWeight: 'bold' }}>Price:</Text>{' '}
            {item.price.toFixed(2)}
          </Text>
        </View>
      </Swipeout>
    );
  };

  render() {
    const { items } = this.props;
    const itemsArray = Object.keys(items).map(id => items[id]);
    const totalValue = itemsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount * currentValue.price;
    }, 0);
    return (
      <View style={styles.container}>
        {itemsArray.map(this.renderHolding)}
        {itemsArray.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>TOTAL: {totalValue.toFixed(2)}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swipeout: {
    backgroundColor: 'transparent'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#363749'
  },
  currency: {
    color: '#12CEF6',
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.9
  },
  amount: {
    color: '#94949E',
    fontSize: 12,
    opacity: 0.9,
    marginTop: 5
  },
  totalValue: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 5
  },
  totalContainer: {
    marginHorizontal: 10,
    paddingVertical: 10
  },
  totalText: {
    color: '#5CC87A',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
