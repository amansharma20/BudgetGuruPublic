/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { applicationProperties } from '../application.properties';
import * as Keychain from 'react-native-keychain';
import StaticOnBoarding from '../screens/onBoarding/StaticOnBoarding';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default function ApplicationNavigator() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const [authToken, setNewAuthToken] = useState();

  const client = new ApolloClient({
    uri: applicationProperties.baseUrl + '/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: authToken,
    },
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await Keychain.getGenericPassword();
        setNewAuthToken(userToken.password);
        console.log(userToken.password);
      } catch (e) {
        // Restoring token failed
      }
      userToken === false
        ? dispatch({ type: 'RESTORE_TOKEN', token: null })
        : dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, [authToken]);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        await Keychain.setGenericPassword('email', data);
        setNewAuthToken(data);
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: async () => {
        await Keychain.resetGenericPassword();
        setNewAuthToken('null');
        dispatch({ type: 'SIGN_OUT' });
      },
      singUp: async data => {
        await Keychain.setGenericPassword('email', data);
        setNewAuthToken(data);
        dispatch({ type: 'SIGN_UP', token: data });
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <StaticOnBoarding />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            keyboardHidesTabBar: true,
          }}>
          {state.userToken == null ? (
            <>
              <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeNavigator"
                component={HomeNavigator}
              />
            </>
          )}
        </Stack.Navigator>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
