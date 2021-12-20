/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function DummyScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
