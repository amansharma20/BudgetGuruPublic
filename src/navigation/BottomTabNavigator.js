/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Responsive} from '../utils/layouts/Layout';
import Home from '../../assets/svgs/Home';
import BackButton from '../../assets/svgs/BackButton';
import HomeScreen from '../screens/home/HomeScreen';


function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const menuIcon = options.tabBarIcon(isFocused);
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.menuItem,
                isFocused
                  ? {
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',


                      
                    }
                  : {justifyContent: 'center'},
              ]}
              key={route.key}>
              {menuIcon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (focused) => <Home focused={focused} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          tabBarIcon: (focused) => (
            <BackButton focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="E-Book"
        component={HomeScreen}
        options={{
          tabBarIcon: (focused) => <Home focused={focused} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: Responsive.height(60),
    // width: '100%',
    // flexDirection: 'row',
    // backgroundColor: '#ffffff',
    height: Platform.select({
      ios: 80,
      android: 50,
    }),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 20,
    shadowRadius: 13.97,
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: '#ffffff',
  },
  menuContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: Responsive.width(10),
    paddingRight: Responsive.width(10),
    height: Responsive.height(60),
    alignItems: 'center',
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: Responsive.height(30),
    flexDirection: 'row',
    borderRadius: Responsive.width(30),
    paddingLeft: Responsive.width(8),
    paddingRight: Responsive.width(8),
  },
  menuIcon: {
    width: Responsive.width(35),
    height: Responsive.height(35),
  },
  cartContainer: {
    height: Responsive.height(56),
    width: Responsive.width(116),
    position: 'absolute',
    top: Responsive.height(0),
    right: 0,
  },
});
