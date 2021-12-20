/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SIZES } from '../../../constants';

const CustomDateInput = ({ children, ...rest }) => {

    return (
        <>
            <TouchableOpacity {...rest}>
                <View style={styles.dobContainer}>
                    <Text style={styles.dobText}>{children}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color: '#000000',
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
    errorInput: {
        borderColor: 'red',
    },
    dobContainer: {
        height: 50,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderColor: '#282828',
    },
    dateSubmitContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff',
    },
    dobText: {
        marginLeft: 10,
        color: '#B4B4B4',
        fontSize: SIZES.h3,
    },
});

export default CustomDateInput;
