/* eslint-disable prettier/prettier */
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#364FFB', // Blue
  black: '#1E1F20',
  darkGray: '#3A3A3A',
  white: '#FFFFFF',
  whiteTitle: '#F3F5FF',
  lightGray: '#8F8F8F',
  gray: '#8b9097',
  appBackgroundColor: '#ffffff',
  appTitleTextColor: '#343434',
  appNormalTextColor: '#262626',
  textGray: '#868686',
  textBlue: '#2B47FC',
  buttonTextWhite: '#F8F6FF',
  textInputBorder: '#2743FD',
  textInputTitle: '#999999',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  padding2: 20,
  padding3: 24,

  // font sizes
  largeTitle: 50,
  header: 28,
  buttonText: 20,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {

  proxima900: Platform.select({
    android: 'Proxima-900',
    ios: 'ProximaNova-Extrabld'
  }),
  proxima800: Platform.select({
    android: 'Proxima-800',
    ios: 'ProximaNova-Bold'
  }),
  proxima700: Platform.select({
    android: 'Proxima-700',
    ios: 'ProximaNova-Bold'
  }),
  proxima500: Platform.select({
    android: 'Proxima-500',
    ios: 'ProximaNova-Regular'
  }),
  proxima400: Platform.select({
    android: 'Proxima-400',
    ios: 'Proxima Nova'
  }),
  montserrat900: Platform.select({
    android: 'Montserrat-900',
    ios: 'Montserrat-Black'
  }),
  montserrat800: Platform.select({
    android: 'Montserrat-800',
    ios: 'Montserrat-ExtraBold'
  }),
  montserrat700: Platform.select({
    android: 'Montserrat-700',
    ios: 'Montserrat-Bold'
  }),
  montserrat500: Platform.select({
    android: 'Montserrat-500',
    ios: 'Montserrat-Medium'
  }),
  montserrat400: Platform.select({
    android: 'Montserrat-400',
    ios: 'MuktaMahee-Regular'
  }),
  montserrat300: Platform.select({
    android: 'Montserrat-300',
    ios: 'Montserrat-Light'
  }),
  montserrat200: Platform.select({
    android: 'Montserrat-200',
    ios: 'MuktaMahee'
  }),
  montserrat100: Platform.select({
    android: 'Montserrat-100',
    ios: 'Montserrat-ExtraLight'
  }),
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
