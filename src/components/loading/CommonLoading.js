/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';

class CommonLoading extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  _setState(reducer) {
    return new Promise(resolve => this.setState(reducer, () => resolve()));
  }
  show() {
    this._setState({show: true});
  }

  hide() {
    this._setState({show: false});
  }
  static show() {
    this._ref.show();
  }
  static hide() {
    this._ref.hide();
  }
  render() {
    const {show} = this.state;
    if (show) {
      return (
        <View style={styles.container}>
          <LottieView
            source={require('../../../assets/lotties/budgetGuruLoading.json')}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      );
    }
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,
    backgroundColor: 'rgba(241,242,247,0.8)',
  },
  loading: {
    zIndex: 9999,
    width: 125,
    height: 125,
  },
});
export default CommonLoading;
