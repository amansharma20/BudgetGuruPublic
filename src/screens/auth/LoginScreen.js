/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import LoginImageBackground from '../../../assets/svgs/LoginScreenImgBg.svg';
import { Responsive } from '../../utils/layouts/Layout';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../persistence/actions/AuthActions';
import { AuthContext } from '../../navigation/ApplicationNavigator';
import CommonLoading from '../../components/loading/CommonLoading';
import MyAsyncStorage from '../../persistence/storage/MyAsyncStorage';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { singUp } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(7, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });


  const setUserStatus = async (flag) => {
    await MyAsyncStorage.storeData('newUserStatus', {
      newUser: flag,
    });
  };

  const submitData = values => {
    CommonLoading.show();
    const signInData = {
      Email: values.email,
      Password: values.password,
    };
    dispatch(AuthActions.signIn('Account/Login', signInData)).then(
      (response) => {
        setUserStatus(false);
        CommonLoading.hide();
        if (response && response.success === false) {
          Toast.show({
            type: 'error',
            text1: 'Oops👋',
            text2: 'Email or password invalid!',
            visibilityTime: 2000,
            autoHide: true,
          });
        } else {
          if (response && response.success === false) { } else {
            let token = 'Bearer ' + response.data;
            singUp(token);
            Toast.show({
              type: 'success',
              text1: 'Hello👋',
              text2: 'Thankyou for logging in!',
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        }
      },
    );
  };

  const [secureTextEntry, setSecureTextEntry] = useState(true);


  return (
    <ScrollView style={styles.container}>

        <LoginImageBackground />

      <KeyboardAvoidingView style={styles.body}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email: '',
              password: '',
              // email: '',
              // password: '',
            }}
            onSubmit={values => submitData(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
            }) => (
              <>
                <Text style={styles.inputHeaderText}>Email Address</Text>
                <View style={styles.checkMarkContainer}>
                  <TextInput
                    name="email"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  {!errors.email && touched.email && (
                    <Image source={icons.tick} style={styles.tickIcon} />
                  )}
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <Text style={styles.inputHeaderText}>Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    name="password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="go"
                  />
                  <TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    style={styles.eyeContainer}>

                    <Image source={secureTextEntry ? icons.eye : icons.eyeUncheck} style={styles.eyeDimensions} />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <TouchableOpacity
                 onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <ImageBackground
                      resizeMode="cover"
                      source={images.buttonBg}
                      style={styles.buttonImgBg}
                      imageStyle={styles.buttonImgBgRadius}>
                      <Text style={styles.loginBtnText}>Login</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    paddingHorizontal: SIZES.padding2,
  },
  headerTextContainer: {},
  headerText: {
    fontSize: 28,
    fontFamily: FONTS.montserrat700,
  },
  loginContainer: {
    width: '100%',
  },
  textInput: {
    height: Responsive.height(50),
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
    borderBottomColor: COLORS.textInputBorder,
    borderBottomWidth: 1,
    color: '#000000',
  },
  inputHeaderText: {
    marginLeft: 0,
    marginTop: 10,
    color: '#999999',
    fontSize: 14,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
  checkMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeContainer: {
    marginLeft: Responsive.width(-28),
  },
  eyeDimensions: {
    width: Responsive.width(20),
    height: Responsive.height(20),
  },
  forgotText: {
    color: COLORS.textBlue,
    padding: 4,
  },
  buttonContainer: {
    marginTop: '10%',
    marginBottom: '10%',
    alignItems: 'center',
  },
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
  buttonImgBgRadius: {
    borderRadius: 28,
  },
  tickIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: -28,
  },
});
