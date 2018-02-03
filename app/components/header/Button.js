import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ({ icon, onPress, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: { fontSize: 24, color: '#ffffff' }
});
