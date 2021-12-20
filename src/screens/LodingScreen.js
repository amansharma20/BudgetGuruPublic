/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CommonLoading from '../components/loading/CommonLoading';

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
           {CommonLoading.show()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
