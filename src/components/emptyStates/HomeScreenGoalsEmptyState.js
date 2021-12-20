/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FONTS, icons } from '../../../constants';

const HomeScreenGoalsEmptyState = () => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddNewGoal')}
        activeOpacity={0.8}
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          elevation: 5,
          width: '50%',
          paddingVertical: 18,
          paddingHorizontal: 12,
          borderRadius: 12,
          marginVertical: 40,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#262626',
            fontFamily: FONTS.montserrat700,
          }}>
          No Goals
        </Text>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 16,
            fontSize: 15,
            color: '#D8D8D8',
            fontFamily: FONTS.montserrat500,
          }}>
          Please Add some Goals
        </Text>
        <Image
          source={icons.homeEmptyStateAddButton}
          style={{ width: 34, height: 34 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenGoalsEmptyState;
