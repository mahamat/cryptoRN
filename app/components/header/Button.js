//@flow

import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  icon: string,
  onPress: Function,
  style?: Object
};

export default function({ icon, onPress, style }:Props) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: { fontSize: 24, color: '#ffffff' }
});
