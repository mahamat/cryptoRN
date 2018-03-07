//@flow
import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  children: React.Node,
  onPress: Function,
};

export default function({ children, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding:10,
    borderRadius:5,
    backgroundColor: '#5468F1'
  },
  text: {
    textAlign:'center',
    color: '#ffffff'
  }
});
