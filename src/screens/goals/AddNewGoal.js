/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import { Responsive } from '../../utils/layouts/Layout';
import { FONTS, icons, SIZES } from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';
import { format } from 'date-fns';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import { GQLQuery } from '../../persistence/query/Query';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-native-date-picker';
import { Modal } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import CustomInput from '../../components/inputs/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonLoading from '../../components/loading/CommonLoading';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function AddNewGoal() {

  const navigation = useNavigation();

  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date) => {
    return format(date, 'MMMM do, yyyy');
  };



  const [openHowToSaveList, setOpenHowToSaveList] = useState(false);
  const [selectedHowToSave, setSelectedHowToSave] = useState(null);
  const [howToSaveOptions, setHowToSaveOptions] = useState([
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
  ]);

  const [howToSaveMinHeight, setHowToSaveMinHeight] = useState(null);

  const [submitNewGoal, { error, data }] = useMutation(GQLMutation.ADD_GOAL, {
    refetchQueries: [{ query: GQLQuery.GET_GOALS }],
    onCompleted: (data) => {
      CommonLoading.hide()
      navigation.goBack()
      Toast.show({
        type: 'success',
        text1: 'Goal Added',
        text2: 'Happy Savings!',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  });
  const submitGoalsData = (values) => {
    CommonLoading.show();
    submitNewGoal({
      variables: {
        GoalName: values.name,
        TargetAmount: values.targetAmount,
        StartDate: startDate,
        EndDate: endDate,
        HowDoYouWantToSave: howToSaveOptions,
        Description: values.description,
        InflationRate: values.inflationRate,
      },
    });
  };



  const addGoalValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required'),
    targetAmount: yup
      .number()
      .required('Target Amount is required'),
    inflationRate: yup
      .number()
      .required('Inflation Rate is required'),
    description: yup
      .string()
      .required('Description is required'),
  });
  const nameRef = useRef();
  const targetAmountRef = useRef();
  const lastNameRef = useRef();
  const inflationRateRef = useRef();
  const descriptionRef = useRef();


  return (
    <ScrollView style={styles.container}>
      <CommonHeader Children="New Goal" style={{
        marginTop: Platform.select({
          ios: 0,
          android: 0,
        }), paddingTop: 30
      }} />
      <View style={{
        backgroundColor: '#364ffb',
        flex: 1,
      }}>

        <Formik
          validationSchema={addGoalValidationSchema}
          initialValues={{
            name: '',
            targetAmount: '',
            inflationRate: '0',
            description: '',
            selectedHowToSave: '',
          }}
          onSubmit={values => submitGoalsData(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ marginVertical: 12, width: 168 }}>
                    <Text style={styles.inputTextTitle}>Name</Text>
                    <View>
                      <TextInput
                        component={CustomInput}
                        name="name"
                        // onSubmitText={(val) => setGoalName(val)}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        keyboardType="default"
                        style={styles.input}
                        value={values.name}
                        placeholder="Name your Goal"
                        onSubmitEditing={() => {
                          targetAmountRef.current.focus();
                        }}
                      />
                    </View>
                    {errors.name && touched.name && (
                      <Text style={styles.error}>{errors.name}</Text>
                    )}

                  </View>
                  <Image source={icons.pfp} style={{ width: 100, height: 100 }} />
                </View>
                <View style={{ marginVertical: 12 }}>
                  <Text style={styles.inputTextTitle}>Target Amount</Text>
                  <View>
                    <TextInput
                      component={CustomInput}
                      name="targetAmount"
                      // onChangeText={(val) => setTargetAmount(val)}
                      onChangeText={handleChange('targetAmount')}
                      onBlur={handleBlur('targetAmount')}
                      keyboardType="numeric"
                      style={styles.input}
                      value={values.targetAmount}
                      placeholder="Set your Target Amount"
                      ref={targetAmountRef}
                      onSubmitEditing={() => {
                        inflationRateRef.current.focus();
                      }}
                    />
                  </View>
                  {errors.targetAmount && touched.targetAmount && (
                    <Text style={styles.error}>{errors.targetAmount}</Text>
                  )}

                </View>

                <View style={{ width: '100%' }}>
                  <View style={{ marginVertical: 0 }}>
                    <Text style={styles.inputTextTitle}>Start Date</Text>
                    <TouchableOpacity onPress={() => setShowStartDateModal(true)}>
                      <View style={styles.dobContainer}>
                        <Text style={styles.dobText}>{formatDate(startDate)}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: '100%', paddingTop: 12 }}>
                  <View style={{ marginVertical: 0 }}>
                    <Text style={styles.inputTextTitle}>End Date</Text>
                    <TouchableOpacity onPress={() => setShowEndDateModal(true)}>
                      <View style={styles.dobContainer}>
                        <Text style={styles.dobText}>{formatDate(endDate)}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginVertical: 12 }}>
                  <Text style={styles.inputTextTitle}>Inflation Rate</Text>
                  <>
                    <TextInput
                      component={CustomInput}
                      name="inflationRate"
                      onChangeText={handleChange('inflationRate')}
                      onBlur={handleBlur('inflationRate')}
                      keyboardType="numeric"
                      style={styles.input}
                      value={values.inflationRate}
                      placeholder="Set Inflation Rate"
                      ref={inflationRateRef}
                      onSubmitEditing={() => {
                        descriptionRef.current.focus();
                      }}
                    />
                  </>
                </View>
                {errors.inflationRate && touched.inflationRate && (
                  <Text style={styles.error}>{errors.inflationRate}</Text>
                )}

                <View style={{ marginVertical: 12, minHeight: howToSaveMinHeight }}>
                  <Text style={styles.inputTextTitle}>How do you want to save ?</Text>
                  <Text style={[styles.inputTextTitle, { fontSize: 12 }]}>(Daily by default)</Text>
                  <DropDownPicker
                    open={openHowToSaveList}
                    value={selectedHowToSave}
                    items={howToSaveOptions}
                    setOpen={setOpenHowToSaveList}
                    setValue={setSelectedHowToSave}
                    onChangeValue={(val) => {
                      setSelectedHowToSave(val);
                    }}
                    setItems={setHowToSaveOptions}
                    placeholder="Choose How would you like to save"
                    style={styles.howToSavePickerContainer}
                    placeholderStyle={styles.placeholderText}
                    listMode="FLATLIST"
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    closeAfterSelecting={true}
                    dropDownDirection="BOTTOM"
                    onPress={() => setHowToSaveMinHeight(270)}
                    onClose={() => setHowToSaveMinHeight(0)}
                  />
                </View>

                <View style={{ marginVertical: 12 }}>
                  <Text style={styles.inputTextTitle}>Description</Text>
                  <View>
                    <TextInput
                      component={CustomInput}
                      name="description"
                      // onChangeText={(val) => setDescription(val)}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      keyboardType="default"
                      style={styles.input}
                      value={values.description}
                      placeholder="Add a Note"
                      ref={descriptionRef}
                    />
                  </View>
                  {errors.description && touched.description && (
                    <Text style={styles.error}>{errors.description}</Text>
                  )}
                </View>
                <CommonButton children={'Save'} onPress={handleSubmit} />
              </KeyboardAvoidingView>
            </>
          )
          }
        </Formik>

      </View>
      {showStartDateModal && (
        <Modal
          animationType="fade"
          transparent={true}
          showModal={showStartDateModal}
          backgroundColor="black"
          onRequestClose={() => setShowStartDateModal(false)}>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            mode="date"
            style={styles.datePicker}
          />
          <View style={styles.dateSubmitContainer}>
            <CommonButton
              children="Submit Date"
              onPress={() => {
                setShowStartDateModal(false)
              }}
            />
          </View>
        </Modal>
      )}
      {showEndDateModal && (
        <Modal
          animationType="fade"
          transparent={true}
          showModal={showEndDateModal}
          backgroundColor="black"
          onRequestClose={() => setShowEndDateModal(false)}>
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            mode="date"
            style={styles.datePicker}
          />
          <View style={styles.dateSubmitContainer}>
            <CommonButton
              children="Submit Date"
              onPress={() => {
                setShowEndDateModal(false)
              }}
            />
          </View>
        </Modal>
      )}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
  inputTextTitle: {
    fontSize: 16,
    color: '#282828',
    fontFamily: FONTS.montserrat500
  },
  input: {
    height: Responsive.height(50),
    borderBottomWidth: 1,
    borderColor: '#282828',
    color: '#282828',
    width: '100%',
  },
  error: {
    fontSize: 10,
    color: 'red',
    marginTop: 4,
  },
  checkMarkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: -28,
    tintColor: '#CB3EF9',
    marginTop: 10,
  },
  checkMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  dobContainer: {
    height: 50,
    borderRadius: 0,
    marginTop: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#282828',
  },
  dateSubmitContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dobText: {
    marginLeft: 10,
    color: '#000000',
    fontSize: SIZES.h3,
  },
  datePicker: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: screenWidth,
    height: screenHeight - 100,
  },
  howToSavePickerContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginTop: 10,
    borderRadius: 0,
  },
  placeholderText: {
    fontSize: SIZES.h3,
    color: '#B4B4B4',
  },
  dropDownContainerStyle: {
    backgroundColor: '#f4f5f7',
    borderWidth: 0,
  },
});
