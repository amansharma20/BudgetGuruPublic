/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { Responsive } from '../../../constants/Layout/';

const CommonButton = ({ children, ...rest }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity {...rest}>
        <ImageBackground
          {...rest}
          resizeMode="cover"
          source={images.buttonBg}
          style={styles.buttonImgBg}
          imageStyle={styles.buttonImgBgRadius}>
          <Text style={styles.loginBtnText}>{children}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  buttonContainer: { marginTop: Responsive.height(10), alignItems: 'center' },
  buttonImgBg: {
    alignItems: 'center',
    width: Responsive.width(245),
    height: Responsive.height(56),
    justifyContent: 'center',
  },
  loginBtnText: {
    fontSize: SIZES.buttonText,
    color: COLORS.buttonTextWhite,
    fontFamily: FONTS.montserrat400,
  },
  buttonImgBgRadius: { borderRadius: 28 },
});
