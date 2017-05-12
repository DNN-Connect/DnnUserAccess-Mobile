import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {TabNavigator, StackNavigator} from 'react-navigation';
import Root from '../navigators/Root';

import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NetInfo
} from 'react-native';

class AppContainer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    NetInfo.fetch().done((reach) => {
      this.props.setNetwork(reach);
    });
    NetInfo.addEventListener(
      'change',
      (v) => this.networkChanged(v)
    );
    this.props.loadSites();
  }

  networkChanged(newValue) {
    this.props.setNetwork(newValue);
  }

  onAddSite() {
    this.props.addSite({});
  }

  render() {
   // console.log(this.props);
   return (
     <Root />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
