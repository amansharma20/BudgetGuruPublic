/* eslint-disable prettier/prettier */
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import VerifyOTP from '../screens/auth/VerifyOTP';
import checkIfFirstLaunch from '../screens/auth/FirstLaunch';
import DynamicOnBoarding from '../screens/onBoarding/DynamicOnBoarding';
import StaticOnBoarding from '../screens/onBoarding/StaticOnBoarding';

const Stack = createStackNavigator();

export default function AuthNavigator() {

    const [firstLaunch, setFirstLaunch] = useState(null);

    useEffect(() => {
        (async () => {
            const isFirstLaunch = await checkIfFirstLaunch();
            setFirstLaunch(isFirstLaunch);
        })();
    }, []);

    if (firstLaunch == null) {
        return <StaticOnBoarding />;
    }

    return (
        <Animated.View style={StyleSheet.flatten([styles.stack])}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    keyboardHidesTabBar: true,
                }}
                initialRouteName={firstLaunch ? 'DynamicOnBoarding' : 'WelcomeScreen'}
            >
                <Stack.Screen name="DynamicOnBoarding" component={DynamicOnBoarding} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Navigator>
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
});


