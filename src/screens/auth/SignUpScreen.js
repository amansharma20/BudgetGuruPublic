/* eslint-disable prettier/prettier */
import React, { useState, useContext, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/inputs/CustomInput';
import SignUpBg from '../../../assets/svgs/SignUpScreenImgBg.svg';
import { Responsive } from '../../utils/layouts/Layout';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import CommonLoading from '../../components/loading/CommonLoading';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../persistence/actions/AuthActions';
import { AuthContext } from '../../navigation/ApplicationNavigator';
import MyAsyncStorage from '../../persistence/storage/MyAsyncStorage';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { singUp } = useContext(AuthContext);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);

  const submitData = values => {
    CommonLoading.show();
    const signUpData = {
      Email: values.email,
      Password: values.password,
    };
    dispatch(AuthActions.signUp('Account/SignUp', signUpData)).then(
      (response) => {
        CommonLoading.hide();
        if (response && response.success === false) {
        } else {
          let token = 'Bearer ' + response.data;
          singUp(token);
          setNewSignUp(response.data);
        }
      },
    );
  };

  async function setNewSignUp(token) {
    await MyAsyncStorage.storeData('isSignedUp', true);
    await MyAsyncStorage.storeData('token', token);
  }

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(7, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


  return (
    <>
      <StatusBar
        backgroundColor="#ffffff"
        animated={true}
        barStyle={'dark-content'}
      />
      <ScrollView style={styles.container}>
        <SignUpBg />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Sign up</Text>
        </View>
        <View style={styles.body}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => submitData(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text
                    style={{ fontSize: SIZES.h4, color: COLORS.textInputTitle }}>
                    Email Address
                  </Text>
                  <View style={styles.checkMarkContainer}>
                    <View
                      style={styles.emailInputField}>
                      <TextInput
                        component={CustomInput}
                        name="email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        keyboardType="email-address"
                        style={styles.textInput}
                        value={values.email}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => {
                          passwordRef.current.focus();
                        }}
                      />
                    </View>
                    {!errors.email && touched.email && (
                      <Image source={icons.tick} style={styles.checkMarkIcon} />
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={{ fontSize: SIZES.h4, color: COLORS.textInputTitle }}>
                    Password
                  </Text>
                  <View style={styles.checkMarkContainer}>
                    <View style={styles.checkMarkContainerField}>
                      <TextInput
                        component={CustomInput}
                        name="password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        style={styles.textInput}
                        secureTextEntry={secureTextEntry}
                        value={values.password}
                        returnKeyType="next"
                        ref={passwordRef}
                        onSubmitEditing={() => {
                          confirmPasswordRef.current.focus();
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                      style={styles.eyeContainer}>
                      <Image source={secureTextEntry ? icons.eye : icons.eyeUncheck} style={styles.eyeDimensions} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={{ fontSize: SIZES.h4, color: COLORS.textInputTitle }}>
                    Confirm Password
                  </Text>
                  <View style={styles.checkMarkContainer}>
                    <View style={styles.confirmPasswordField}>
                      <TextInput
                        component={CustomInput}
                        name="confirmPassword"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        style={styles.textInput}
                        secureTextEntry={secureTextEntryConfirmPassword}
                        value={values.confirmPassword}
                        returnKeyType="go"
                        ref={confirmPasswordRef}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setSecureTextEntryConfirmPassword(
                          !secureTextEntryConfirmPassword,
                        )
                      }
                      style={styles.eyeContainer}>
                      <Image source={secureTextEntryConfirmPassword ? icons.eye : icons.eyeUncheck} style={styles.eyeDimensions} />
                    </TouchableOpacity>
                  </View>
                </View>

                <KeyboardAvoidingView style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                  // onPress={() => navigation.navigate('DetailsInput')}
                  //  disabled={!isValid}
                  >
                    <ImageBackground
                      resizeMode="cover"
                      source={images.buttonBg}
                      style={styles.buttonImgBg}
                      imageStyle={styles.buttonImgBgRadius}>
                      <Text style={styles.loginBtnText}>Sign Up</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </>
            )}
          </Formik>
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={styles.loginText}> Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  headerTextContainer: {
    paddingHorizontal: SIZES.padding2,
    paddingBottom: SIZES.padding3,
  },
  headerText: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.montserrat700,
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  inputContainer: {
    width: '100%',
    paddingVertical: 2,
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
  buttonContainer: {
    marginTop: '5%',
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
  checkMarkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: -28,
    tintColor: '#CB3EF9',
    marginBottom: Responsive.height(8),
  },
  checkMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  eyeContainer: {
    marginLeft: Responsive.width(-28),
    marginBottom: Responsive.height(12),
  },
  eyeDimensions: {
    width: Responsive.width(20),
    height: Responsive.height(20),
  },
  emailInputField: {
    width: '100%',
  },
  checkMarkContainerField: { width: '100%' },
  loginText: {
    marginLeft: 2,
    color: COLORS.textBlue,

  },
  footerTextContainer: { flexDirection: 'row', paddingTop: SIZES.padding3 },
  footerText: {},
  confirmPasswordField: { width: '100%' },
});
