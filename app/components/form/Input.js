//@flow
import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label: string
};

export default function Input({ label, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
        autoCapitalize="none"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20
  },
  label: {
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 10
  },
  input: {
    padding: 10,
    backgroundColor: '#3A3B4B',
    color: '#ffffff',
    borderRadius: 3
  }
});
